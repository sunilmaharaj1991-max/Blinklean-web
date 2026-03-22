import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';
import Logo from './Logo';

const Header = () => {
  const { t } = useTranslation();
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
          <Link to="/services#home-cleaning">{t('nav.home_cleaning')}</Link>
          <Link to="/services#vehicle-cleaning">{t('nav.vehicle_care')}</Link>
          <Link to="/services#laundry">{t('nav.laundry')}</Link>
          <Link to="/scrap-booking">{t('nav.scrap_recycling')}</Link>
          <Link to="/partner">{t('nav.partner')}</Link>
          
          {user ? (
            <Link to="/profile" className="nav-login-btn">{t('nav.profile')}</Link>
          ) : (
            <Link to="/login" className="nav-login-btn">{t('nav.login')}</Link>
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
