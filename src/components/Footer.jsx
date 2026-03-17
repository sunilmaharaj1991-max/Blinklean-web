import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="footer-premium">
      <div className="container footer-grid-premium">
        {/* Column 1: Company */}
        <div className="footer-col">
          <div className="footer-logo">
            <Logo type="footer" />
          </div>
          <p className="footer-desc">
            Blinklean provides professional doorstep clean-tech services including home cleaning, waterless vehicle detailing, laundry, and scrap recycling.
          </p>
          <div className="footer-social">
            <a href="https://www.instagram.com/p/DU7uAgDE5U5/" target="_blank" rel="noopener noreferrer">
              <i data-lucide="instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/malnad-manju-cafe/posts/" target="_blank" rel="noopener noreferrer">
              <i data-lucide="linkedin"></i>
            </a>
            <a href="https://x.com/blinklean" target="_blank" rel="noopener noreferrer">
               <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
            </a>
            <a href="https://wa.me/917022803582" target="_blank" rel="noopener noreferrer">
              <i data-lucide="message-circle"></i>
            </a>
          </div>
        </div>

        {/* Column 2: Services */}
        <div className="footer-col">
          <h4>Our Services</h4>
          <ul className="footer-links-list">
            <li><Link to="/services#home-cleaning">Home Cleaning</Link></li>
            <li><Link to="/services#vehicle-cleaning">Vehicle Care</Link></li>
            <li><Link to="/services#laundry">Laundry Services</Link></li>
            <li><Link to="/scrap-recycling">Scrap Recycling</Link></li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links-list">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/partner">Join as Partner</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer-col">
          <h4>Contact Us</h4>
          <div className="footer-contact-info">
            <div className="contact-item">
              <i data-lucide="map-pin"></i>
              <span>Vijayanagar, Bangalore</span>
            </div>
            <div className="contact-item">
              <i data-lucide="mail"></i>
              <a href="mailto:support@blinklean.com">support@blinklean.com</a>
            </div>
            <div className="contact-item">
              <i data-lucide="phone"></i>
              <span>+91 70228 03582</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div className="footer-policy-links" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.85rem' }}>
            <Link to="/privacy-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms-and-conditions" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms & Conditions</Link>
            <Link to="/refund-and-cancellation-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Refund Policy</Link>
            <Link to="/equal-opportunity-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Equal Opportunity</Link>
          </div>
          <p>&copy; 2026 Blinklean. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
