import React from 'react';
import { socialmedias } from '../constant';
import './css/contact.css';


const FooterIcons = ({ socialmedia }) => (
    <a href={socialmedia.url} target={socialmedia.target}>
        <img src={socialmedia.icon} alt={socialmedia.alt} />
    </a>

)

export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <div className='footer'>
            <div className="footer-container">
                <div className='footer-contents'>
                    <p>&copy; {year} Sathish. All rights reserved.</p>
                </div>
                <div className='social-medias'>
                    {socialmedias.map((socialmedia) => (
                        <FooterIcons socialmedia={socialmedia} />

                    ))}
                </div>
            </div>
        </div>
    )
}
