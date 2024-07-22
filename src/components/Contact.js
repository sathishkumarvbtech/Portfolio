import emailjs from "@emailjs/browser";
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EMAIL_PUBLIC_KEY, EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID } from "../constant";
import './css/contact.css';
import { Footer } from './Footer';

export const Contact = () => {
    const formRef = useRef();
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // cleaning the form data
        const username = form.name.trim();
        const user_email = form.email.trim();
        const user_message = form.message.trim();

        if (username === '' || user_email === '' || user_message === '') {
            setLoading(false);
            toast.error("Please fill all the fields.", {
                position: 'bottom-right',
            });
            return;
        }
        console.log(username, user_email, user_message)

        emailjs
            .send(
                EMAIL_SERVICE_ID,
                EMAIL_TEMPLATE_ID,
                {
                    from_name: username,
                    from_email: user_email,
                    to_name: "Sathishkumar V",
                    reply_to: user_email,
                    to_email: "sathishkumarvbtech@gmail.com",
                    message: user_message,
                },
                EMAIL_PUBLIC_KEY
            )
            .then(
                () => {
                    setLoading(false);
                    toast.success("Message sent successfully!", {
                        position: 'bottom-right',
                    });
                    setForm({
                        name: "",
                        email: "",
                        message: "",
                    });
                },
                (error) => {
                    setLoading(false);
                    console.error(error);
                    toast.error("Uh, oh! Something went wrong. Please try again later.", {
                        position: 'bottom-right',
                    });
                }
            );
    };

    return (
        <section>
            <div className='contact'>
                <div className='contact-section' id='contact'>
                    <div>
                        <h2>REACH OUT TO ME</h2>
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                        >

                            <div className="name">
                                <input
                                    type='text'
                                    name='name'
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className='input-field'
                                />
                            </div>

                            <div className="email">
                                <input
                                    type='email'
                                    name='email'
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Ex:abc@gmail.com"
                                    className='input-field'

                                />
                            </div>

                            <div className="message">
                                <textarea
                                    rows={7}
                                    name='message'
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder='Do you have anything to say?'
                                    className='input-field'
                                />
                            </div>
                            <button
                                type='submit'
                                className='btn'
                            >
                                {loading ? "Sending..." : "Send"}
                            </button>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            </div>
            <Footer />
        </section>
    );

}


export default Contact;