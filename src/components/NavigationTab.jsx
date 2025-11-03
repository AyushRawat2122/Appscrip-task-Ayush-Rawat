import React, { useState, Fragment } from 'react';
import './navigationTab.css';
import { CiSearch, CiHeart, CiBag1, CiUser } from "react-icons/ci";
import { useMediaQuery } from 'react-responsive';
import { RxHamburgerMenu } from "react-icons/rx";

const NavigationTab = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <div className='navbar'>
            <div className='top-header'>
                <div className="logo-icon">
                    {isMobile && <RxHamburgerMenu size={25} onClick={toggleMenu} />}
                    <img src="/images/Logo.png" alt="logo" />
                </div>
                <div className="logo inter-text">
                    <h1 style={{ fontFamily: `"Inter", sans-serif` }}>Logo</h1>
                </div>
                <div className="options-box">
                    <ul>
                        <li className='icon'><CiSearch stroke='3px' /></li>
                        <li className='icon'><CiHeart stroke='3px' /></li>
                        <li className='icon'><CiBag1 stroke='3px' /></li>
                        {!isMobile && (
                            <Fragment>
                                <li className='icon'><CiUser stroke='3px' /></li>
                                <li className='language-option'>
                                    <select name="language" id="language">
                                        <option value="en">ENG</option>
                                        <option value="fr">FR</option>
                                        <option value="es">ESP</option>
                                    </select>
                                </li>
                            </Fragment>
                        )}
                    </ul>
                </div>
            </div>

            <div className="navigation-bar">
                <nav>
                    <ul className="nav-links">
                        <li><a href="#home">Shop</a></li>
                        <li><a href="#about">Skills</a></li>
                        <li><a href="#services">Stories</a></li>
                        <li><a href="#contact">About</a></li>
                        <li><a href="#portfolio">Contact us</a></li>
                    </ul>
                </nav>
            </div>

            {/* Mobile Sliding Menu */}
            <aside className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
                <nav>
                    <ul>
                        <li><a href="#home" onClick={closeMenu}>Shop</a></li>
                        <li><a href="#about" onClick={closeMenu}>Skills</a></li>
                        <li><a href="#services" onClick={closeMenu}>Stories</a></li>
                        <li><a href="#contact" onClick={closeMenu}>About</a></li>
                        <li><a href="#portfolio" onClick={closeMenu}>Contact us</a></li>
                    </ul>
                </nav>
            </aside>

            {/* Overlay */}
            {menuOpen && <div className="menu-overlay" onClick={closeMenu} />}
        </div>
    );
};

export default NavigationTab;
