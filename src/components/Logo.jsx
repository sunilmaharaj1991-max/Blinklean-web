import React from 'react';

const Logo = ({ type = "navbar", style = {} }) => {
  const isNavbar = type === "navbar";
  
  return (
    <div style={{ 
      display: "flex", 
      alignItems: "center", 
      gap: "12px",
      ...style 
    }}>
      <img 
        src="/assets/images/logo_symbol.png" 
        alt="BlinKlean Symbol" 
        style={{ 
          height: isNavbar ? "55px" : "65px", 
          width: "auto",
          objectFit: "contain"
        }} 
      />
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center"
      }}>
        <div style={{ 
          fontSize: isNavbar ? "1.8rem" : "2.2rem", 
          fontWeight: "800",
          fontFamily: "'Outfit', sans-serif",
          lineHeight: "1",
          color: "#009ee3"
        }}>
          Blin<span style={{ color: "#1b9b3a" }}>Klean</span>
        </div>
        <div style={{ 
          fontSize: isNavbar ? "0.85rem" : "1rem", 
          color: "#009ee3", 
          fontWeight: "600",
          marginTop: "2px",
          letterSpacing: "0.5px"
        }}>
          Clean in a Blink
        </div>
      </div>
    </div>
  );
};

export default Logo;
