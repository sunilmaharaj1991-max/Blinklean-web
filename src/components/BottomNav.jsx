import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { auth } from '../firebase';

const BottomNav = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bottom-nav">
      <Link to="/" className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}>
        <i data-lucide="home"></i>
        <span>{t('nav.home')}</span>
      </Link>
      <Link to="/services" className={`bottom-nav-item ${isActive('/services') ? 'active' : ''}`}>
        <i data-lucide="layout-grid"></i>
        <span>{t('nav.services')}</span>
      </Link>
      {user ? (
        <Link to="/profile" className={`bottom-nav-item ${isActive('/profile') ? 'active' : ''}`}>
          <i data-lucide="user"></i>
          <span>{t('nav.profile')}</span>
        </Link>
      ) : (
        <Link to="/login" className={`bottom-nav-item ${isActive('/login') ? 'active' : ''}`}>
          <i data-lucide="log-in"></i>
          <span>{t('nav.login')}</span>
        </Link>
      )}
    </div>
  );
};

export default BottomNav;
