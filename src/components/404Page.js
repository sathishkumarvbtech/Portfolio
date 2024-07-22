import React from 'react';
import { GifLink } from '../constant';
import './css/contact.css';
import { Footer } from './Footer';

export const Nopage = () => {
    return (
        <section >
            <div className='error'>
                <div className='error-page'><h1>Opps!</h1>
                    <p>We can't seem to find the page you're looking for.</p>
                    <p style={{ fontSize: "12px" }}><b>Error code: 404</b></p>
                    <p>Here are some helpful links instead:</p>
                    <ul className='error-links'>
                        <li><a href='/'>Home</a></li>
                        <li><a href='/about'>About</a></li>
                        <li><a href='/projects'>Projects</a></li>
                        <li><a href='/experience'>Experience</a></li>
                        <li><a href='/contact'>Contact</a></li>
                    </ul>
                </div>
                <div className='error-img'>
                    <img src={GifLink} alt='404' />
                </div>

            </div>
            <Footer />
        </section >
    )
}


export default Nopage;