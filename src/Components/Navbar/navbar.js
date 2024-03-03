import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

export const Navbar = () => {
    return(
        <>
            <div className='navbar'>
                <div className='navbarcontent'>
                    <Link to="/" className='logo'>
                        <img className='image' src={"/images/logo.png"} alt={"logo"}/>
                    </Link>
                    <input className="burger-check" type="checkbox" id="burger-check" /><label className="burger-icon" htmlFor="burger-check"><span className="burger-sticks"></span></label>
                    <div className='menu'>
                        <Link to="/" className='hamburger-bar'>
                            <span>DxD Lab</span>
                        </Link>                           
                        <Link to="/people" className='hamburger-bar'>
                            <span>PEOPLE</span>
                        </Link>                           
                        <Link to="/project" className='hamburger-bar'>
                            <span>PROJECT</span>
                        </Link>
                        <Link to="/publication" className='hamburger-bar'>
                            <span>PUBLICATION</span>
                        </Link>
                    </div>
                    <div className='links'>
                        <Link to="/" className='navBtn'>
                            <span>DxD Lab</span>
                        </Link>                           
                        <Link to="/people" className='navBtn'>
                            <span>PEOPLE</span>
                        </Link>                           
                        <Link to="/project" className='navBtn'>
                            <span>PROJECT</span>
                        </Link>
                        <Link to="/publication" className='navBtn'>
                            <span>PUBLICATION</span>
                        </Link>                      
                    </div>                    
                </div>
            </div>
        </>
    )
}