import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer-premium">
      <div className="container footer-grid-premium">
        {/* Column 1: Company */}
        <div className="footer-col">
          <div className="footer-logo">
            <Logo type="footer" />
          </div>
          <p className="footer-desc">
            {t('footer.desc')}
          </p>

        </div>

        {/* Column 2: Services */}
        <div className="footer-col">
          <h4>{t('footer.our_services')}</h4>
          <ul className="footer-links-list">
            <li><Link to="/services#home-cleaning">{t('nav.home_cleaning')}</Link></li>
            <li><Link to="/services#vehicle-cleaning">{t('nav.vehicle_care')}</Link></li>
            <li><Link to="/services#laundry">{t('nav.laundry')}</Link></li>
            <li><Link to="/scrap-recycling">{t('nav.scrap_recycling')}</Link></li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="footer-col">
          <h4>{t('footer.quick_links')}</h4>
          <ul className="footer-links-list">
            <li><Link to="/about">{t('footer.about_us')}</Link></li>
            <li><Link to="/contact">{t('footer.contact_us')}</Link></li>
            <li><Link to="/faq">{t('footer.faq')}</Link></li>
            <li><Link to="/partner">{t('footer.join_partner')}</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer-col">
          <h4>{t('footer.contact_us')}</h4>
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
            <Link to="/privacy-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{t('footer.privacy_policy')}</Link>
            <Link to="/terms-and-conditions" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms & Conditions</Link>
            <Link to="/refund-and-cancellation-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Refund Policy</Link>
            <Link to="/equal-opportunity-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Equal Opportunity</Link>
          </div>
          <p>&copy; 2026 Blinklean. {t('footer.all_rights_reserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
