import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = ({ 
  phoneNumber = "917022803582", 
  message = "Hello Blinklean! I'd like to know more about your services.",
  bottom = '85px',
  right = '25px',
  left = 'auto',
  backgroundColor = '#25d366',
  badgeText = null
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl}
      target="_blank" 
      rel="noopener noreferrer"
      className="floating-whatsapp-btn"
      aria-label="Contact us on WhatsApp"
      style={{
        position: 'fixed',
        bottom,
        right,
        left,
        width: '56px', // Slightly smaller for a cleaner look
        height: '56px',
        backgroundColor,
        color: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        zIndex: 2000,
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <MessageCircle size={28} fill="white" />
      {badgeText && (
        <span style={{
          position: 'absolute',
          top: '-10px',
          right: '-5px',
          background: '#ef4444',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold',
          padding: '2px 6px',
          borderRadius: '10px',
          border: '2px solid white'
        }}>{badgeText}</span>
      )}
    </a>
  );
};

export default FloatingWhatsApp;
