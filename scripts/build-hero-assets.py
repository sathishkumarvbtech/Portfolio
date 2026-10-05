#!/usr/bin/env python3
import os
import subprocess
import imageio_ffmpeg
import cv2
import numpy as np
from scipy.io import wavfile
from PIL import Image

def build_assets():
    print("=== Building Hero Video and Image Assets ===")
    
    ffmpeg_bin = imageio_ffmpeg.get_ffmpeg_exe()
    os.makedirs("/var/www/html/portfolio/public/hero", exist_ok=True)
    os.makedirs("/var/www/html/portfolio/public", exist_ok=True)

    input_video = "/var/www/html/portfolio/intro.mp4"
    if not os.path.exists(input_video):
        if os.path.exists("/var/www/html/portfolio/intro.mov"):
            input_video = "/var/www/html/portfolio/intro.mov"
        else:
            raise FileNotFoundError("Could not find intro.mp4 or intro.mov")

    # 1. Analyze video properties & framing
    cap = cv2.VideoCapture(input_video)
    fps = cap.get(cv2.CAP_PROP_FPS)
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    duration = count / fps
    print(f"Source video: {w}x{h}, {fps} fps, {duration:.2f}s")

    # Read frame 30 to extract high quality head-to-shirt crop and OG image
    cap.set(cv2.CAP_PROP_POS_FRAMES, 30)
    ret, best_frame = cap.read()
    cap.release()

    if ret:
        # Convert BGR to RGB
        frame_rgb = cv2.cvtColor(best_frame, cv2.COLOR_BGR2RGB)
        
        # Save portrait-bust.webp (480x600 head-to-shirt crop)
        # Person center is ~620, head top is ~50.
        # Crop head-to-shirt region: x: 410..810 (width 400), y: 40..540 (height 500)
        portrait_crop = frame_rgb[40:540, 410:810]
        img_portrait = Image.fromarray(portrait_crop).resize((480, 600), Image.Resampling.LANCZOS)
        img_portrait.save("/var/www/html/portfolio/public/portrait-bust.webp", "WEBP", quality=92)
        print("Created public/portrait-bust.webp (480x600)")

        # Save og.jpg (1200x630 OpenGraph banner with minimalist styling)
        # Create a 1200x630 white canvas with portrait on right side
        og_canvas = Image.new("RGB", (1200, 630), "#f4f2ee")
        portrait_og = Image.fromarray(portrait_crop).resize((450, 562), Image.Resampling.LANCZOS)
        og_canvas.paste(portrait_og, (680, 34))
        
        og_canvas.save("/var/www/html/portfolio/public/og.jpg", "JPEG", quality=90)
        print("Created public/og.jpg (1200x630)")

    # 2. Extract and seamless cross-fade audio in numpy
    print("Extracting audio to WAV...")
    temp_wav_in = "/var/www/html/portfolio/temp_input_audio.wav"
    temp_wav_loop = "/var/www/html/portfolio/temp_looped_audio.wav"

    subprocess.run([
        ffmpeg_bin, "-y", "-i", input_video,
        "-vn", "-acodec", "pcm_s16le", "-ar", "44100", "-ac", "2", temp_wav_in
    ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    sr, audio_data = wavfile.read(temp_wav_in)
    fade_duration = 0.5 # 0.5s fade
    fade_samples = int(fade_duration * sr)
    total_samples = len(audio_data)
    
    # Cross-fade last 0.5s into first 0.5s
    loop_samples = total_samples - fade_samples
    
    head_part = audio_data[:fade_samples].astype(np.float64)
    tail_part = audio_data[total_samples - fade_samples:].astype(np.float64)
    middle_part = audio_data[fade_samples:total_samples - fade_samples]
    
    # Linear fade weights
    fade_in = np.linspace(0.0, 1.0, fade_samples)[:, np.newaxis]
    fade_out = np.linspace(1.0, 0.0, fade_samples)[:, np.newaxis]
    
    crossfaded_head = (tail_part * fade_out + head_part * fade_in).astype(np.int16)
    
    looped_audio = np.vstack([crossfaded_head, middle_part])
    wavfile.write(temp_wav_loop, sr, looped_audio)
    print(f"Seamless audio created: {len(looped_audio)/sr:.2f}s")

    # 3. Process video frames in Python with numpy crossfade for 100% precision
    print("Processing video frames and applying cross-fade...")
    cap = cv2.VideoCapture(input_video)
    frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        # Crop 576x720 around center X=620 (x: 332..908)
        cropped = frame[0:720, 332:908]
        # Scale to 768x960
        scaled = cv2.resize(cropped, (768, 960), interpolation=cv2.INTER_LANCZOS4)
        # Smooth anti-aliased alpha mask without pixel shimmering/flicker
        # Background pixels in intro.mp4 have RGB ~220+
        min_val = np.min(scaled, axis=2).astype(np.float32)
        bgra = np.zeros((960, 768, 4), dtype=np.uint8)
        bgra[:, :, :3] = scaled  # BGR
        
        # Smooth alpha gradient: min_val <= 190 is 255 (opaque), min_val >= 218 is 0 (transparent)
        alpha = np.zeros((960, 768), dtype=np.float32)
        opaque_mask = min_val <= 190
        feather_mask = (min_val > 190) & (min_val < 218)
        
        alpha[opaque_mask] = 255.0
        alpha[feather_mask] = (218.0 - min_val[feather_mask]) / (218.0 - 190.0) * 255.0
        
        # Apply 3x3 Gaussian blur to alpha mask for silky smooth anti-aliased edge (no flickering)
        alpha_smooth = cv2.GaussianBlur(alpha, (3, 3), 0)
        
        bgra[:, :, 3] = np.clip(alpha_smooth, 0, 255).astype(np.uint8)
        frames.append(bgra)
    cap.release()

    total_frames = len(frames) # 240 frames
    fade_frames = int(0.5 * fps) # 12 frames
    loop_frames_count = total_frames - fade_frames # 228 frames

    # Create crossfaded head frames: last fade_frames blended into first fade_frames
    output_frames = []
    for i in range(fade_frames):
        alpha_val = i / float(fade_frames)
        head_f = frames[i].astype(np.float32)
        tail_f = frames[total_frames - fade_frames + i].astype(np.float32)
        blended = (tail_f * (1.0 - alpha_val) + head_f * alpha_val).astype(np.uint8)
        output_frames.append(blended)

    # Add middle frames
    for i in range(fade_frames, loop_frames_count):
        output_frames.append(frames[i])

    print(f"Total processed transparent frames for loop: {len(output_frames)} ({len(output_frames)/fps:.2f}s)")

    # Save frames as PNG files in temp dir for ffmpeg alpha encoding
    temp_png_dir = "/var/www/html/portfolio/temp_alpha_frames"
    os.makedirs(temp_png_dir, exist_ok=True)
    for idx, f in enumerate(output_frames):
        cv2.imwrite(f"{temp_png_dir}/frame_{idx:04d}.png", f)

    # 4. Export hero.mp4 and hero.webm with audio and alpha transparency
    mp4_out = "/var/www/html/portfolio/public/hero/hero.mp4"
    webm_out = "/var/www/html/portfolio/public/hero/hero.webm"

    print("Rendering public/hero/hero.webm (VP9 with yuva420p transparent alpha channel)...")
    subprocess.run([
        ffmpeg_bin, "-y",
        "-framerate", str(fps),
        "-i", f"{temp_png_dir}/frame_%04d.png",
        "-i", temp_wav_loop,
        "-c:v", "libvpx-vp9", "-pix_fmt", "yuva420p", "-crf", "30", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        webm_out
    ], check=True)
    print("Created public/hero/hero.webm (Transparent VP9)")

    print("Rendering public/hero/hero.mp4 (H.264 high quality)...")
    subprocess.run([
        ffmpeg_bin, "-y",
        "-framerate", str(fps),
        "-i", f"{temp_png_dir}/frame_%04d.png",
        "-i", temp_wav_loop,
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "22", "-preset", "slow",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        mp4_out
    ], check=True)
    print("Created public/hero/hero.mp4")

    # Clean up temp files & folder
    import shutil
    shutil.rmtree(temp_png_dir, ignore_errors=True)
    for t in [temp_wav_in, temp_wav_loop]:
        if os.path.exists(t):
            os.remove(t)
    print("=== Hero transparent assets successfully generated! ===")

if __name__ == "__main__":
    build_assets()
