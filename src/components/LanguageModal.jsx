import React from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/css/language-modal.css';

const LanguageModal = ({ isOpen, onClose }) => {
  const { i18n } = useTranslation();

  if (!isOpen) return null;

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' }
  ];

  const handleLanguageSelect = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem('blinklean_lang_set', 'true');
    onClose();
  };

  return (
    <div className="lang-modal-overlay">
      <div className="lang-modal-content">
        <div className="lang-modal-header">
          <h2>Select Your Language</h2>
          <p>Please choose a language to continue</p>
        </div>
        <div className="lang-options-grid">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option-btn ${i18n.language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <span className="lang-native">{lang.native}</span>
              <span className="lang-name">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
