import React from 'react';
import './css/preloader.css';

const Preloader = () => {
    return (
        <div className='preloader'>
            <div className='preloader-container'>
                <span className='preloader-item'></span>
                <span className='preloader-item'></span>
                <span className='preloader-item'></span>
                <span className='preloader-item'></span>
            </div>
        </div>
    )
}

export default Preloader