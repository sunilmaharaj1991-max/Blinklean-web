import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

const BottomNav = () => {
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
        <span>Home</span>
      </Link>
      <Link to="/services" className={`bottom-nav-item ${isActive('/services') ? 'active' : ''}`}>
        <i data-lucide="layout-grid"></i>
        <span>Services</span>
      </Link>
      {user ? (
        <Link to="/profile" className={`bottom-nav-item ${isActive('/profile') ? 'active' : ''}`}>
          <i data-lucide="user"></i>
          <span>Profile</span>
        </Link>
      ) : (
        <Link to="/login" className={`bottom-nav-item ${isActive('/login') ? 'active' : ''}`}>
          <i data-lucide="log-in"></i>
          <span>Login</span>
        </Link>
      )}
    </div>
  );
};

export default BottomNav;
