import React from 'react';

const Logo = ({ type = "navbar", style = {} }) => {
  const isNavbar = type === "navbar";
  
  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "10px",
      ...style 
    }}>
      <img 
        src="/assets/images/logo_symbol.png" 
        alt="BlinKlean Symbol" 
        style={{ 
          height: isNavbar ? "50px" : "60px", 
          width: "auto",
          mixBlendMode: "multiply" 
        }} 
      />
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        lineHeight: "1.1" 
      }}>
        <div style={{ 
          fontSize: isNavbar ? "1.6rem" : "1.8rem", 
          fontWeight: "800",
          fontFamily: "'Outfit', sans-serif"
        }}>
          <span style={{ color: "#009ee3" }}>Blin</span>
          <span style={{ color: "#1b9b3a" }}>Klean</span>
        </div>
        <div style={{ 
          fontSize: isNavbar ? "0.85rem" : "0.95rem", 
          color: "#009ee3", 
          fontWeight: "500" 
        }}>
          Clean in a Blink
        </div>
      </div>
    </div>
  );
};

export default Logo;
