import React from 'react';
import './css/home.css';

export const Buttonlink = ({ text, url, cssClass }) => {
    return (
        <a href={url}><button className={cssClass}>{text}</button></a>
    )
}
