import React, { useEffect, useRef, useState } from 'react';
import videoBg from '../asset/Background.mp4';
import { name } from '../constant';
import { Buttonlink } from './Buttonlink';
import './css/home.css';
import { Footer } from './Footer';


export const Home = () => {

    const ref = useRef(0);
    const [text, setText] = useState('');

    useEffect(() => {
        const Interval = setInterval(() => {
            if (ref.current < name.length) {
                ref.current++;
                setText(() => text + name[ref.current - 1]);
            }
        }, 500);
        return () => clearInterval(Interval)
    }, [text]);


    const heronSection = () => {

    }

    return (
        <section className='Home'>
            <div className='Home_section'>
                <div className='Overlay'></div>
                <video autoPlay loop muted>
                    <source src={videoBg} type='video/mp4' />
                    <source src={videoBg} type="video/ogg" />
                </video>
                <div className='Home_section--intro'>
                    <div>
                        <div className='content'>
                            <h5>Hi I'm <br /><span style={{ color: "var(--color1)" }}>{text}</span></h5>
                            <h1>Full-Stack Developer</h1>
                            <p></p>
                        </div>

                        <div className='Home-buttons'>
                            <Buttonlink url={'/'} text={'Hire Me'} cssClass={'btn btn1'} />
                            <Buttonlink url={'/'} text={'My Projects'} cssClass={'btn btn1'} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )
}


export default Home;
