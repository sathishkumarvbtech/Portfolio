import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Buttonlink } from './Buttonlink';
import './css/navbar.css';

export const Navbar = () => {
    const [mobileMenu, setMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenu(!mobileMenu);
    }

    return (
        <div>
            <nav className='nav'>
                <div className='nav-container'>

                    <ul className='nav-bar'>
                        <li><NavLink to='/' className='nav-link'>Home</NavLink></li>
                        <li><NavLink to='/about' className='nav-link' activeClassName="active">About</NavLink></li>
                        <li><NavLink to='/projects' className='nav-link' activeClassName="active">Projects</NavLink></li>
                        <li><NavLink to='/experience' className='nav-link' activeClassName="active">Experince</NavLink></li>
                        <li><NavLink to='/contact' className='nav-link' activeClassName="active">Contact</NavLink></li>
                        <li> <Buttonlink url={'/'} text={'View Resume →'} cssClass={'nav-btn'} /></li>

                    </ul>

                    <div className="toggle-button">
                        <button onClick={toggleMobileMenu}>
                            {mobileMenu ? '✕' : '☰'}
                        </button>
                    </div>

                    <div className={`mobile-view ${mobileMenu ? 'visible' : 'hidden'}`}>

                        <ul className='mobile_nav-bar'>
                            <li><Link to='/' className='nav-link' onClick={toggleMobileMenu}>Home</Link></li>
                            <li><Link to='/about' className='nav-link' onClick={toggleMobileMenu}>About</Link></li>
                            <li><Link to='/projects' className='nav-link' onClick={toggleMobileMenu}>Projects</Link></li>
                            <li><Link to='/experience' className='nav-link' onClick={toggleMobileMenu}>Experince</Link></li>
                            <li><Link to='/contact' className='nav-link' onClick={toggleMobileMenu}>Contact</Link></li>
                            <li> <Buttonlink url={'/'} text={'My Resume'} cssClass={'nav-btn'} /></li>
                        </ul>

                    </div>
                </div>

            </nav >
            <Outlet />
        </div >
    )
}

export default Navbar;
