import React from 'react';
import { Link } from 'react-router-dom';
import chefHatImage from '../../assets/chefhat.png';
import './Navbar.css'; 

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                {/* the image and logo on left side */}
                <Link to="/" className="navbar-logo">
                    <img src={chefHatImage}  alt="Chef Hat" className="logo-image" />
                    <span className="logo-text">CleverCook</span>
                </Link>
            </div>
            
            <div className="navbar-right">
                {/* the page links on the right */}
                <ul className="navbar-links">
                    <li><Link to="/" className="navbar-link">Home</Link></li>
                    <li><Link to="/post" className="navbar-link">Post</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
