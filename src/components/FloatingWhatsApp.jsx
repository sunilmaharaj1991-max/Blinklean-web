import React from 'react';

const FloatingWhatsApp = () => {
  return (
    <div className="whatsapp-float-container">
      <span className="whatsapp-tooltip">Chat with us on WhatsApp</span>
      <a
        href="https://wa.me/917022803582?text=Hello%20Blinklean%2C%20I%20am%20interested%20in%20your%20cleaning%20or%20scrap%20recycling%20services."
        className="whatsapp-float-btn"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <i data-lucide="message-circle"></i>
      </a>
    </div>
  );
};

export default FloatingWhatsApp;
