import React from 'react';


export const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <section className='footer'>
            <div className='footer-contents'>
                <p>&copy; {year} Sathish. All rights reserved.</p>
            </div>
            <div className=' footer-icons'>
                <a href="mailto:#">
                </a>

                <a href="#" target='_blank'>

                </a>
                <a href="#" target='_blank' >

                </a>
            </div>
        </section>
    )
}
