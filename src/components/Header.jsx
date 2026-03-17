import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo-wrapper">
          <Logo type="navbar" />
        </Link>
        
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
          <Link to="/services#home-cleaning">Home Cleaning</Link>
          <Link to="/services#vehicle-cleaning">Vehicle Care</Link>
          <Link to="/services#laundry">Laundry</Link>
          <Link to="/scrap-booking">Scrap & Recycling</Link>
          <Link to="/partner">Partner With Us</Link>
          
          {user ? (
            <Link to="/profile" className="nav-login-btn">Profile</Link>
          ) : (
            <Link to="/login" className="nav-login-btn">Login</Link>
          )}
        </div>

        <button 
          className="mobile-menu-btn" 
          id="menuBtn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i data-lucide={isMenuOpen ? "x" : "menu"}></i>
        </button>
      </div>
    </nav>
  );
};

export default Header;
