import React from 'react';

const COLORS = {
  BLUE: "#009ee3",
  GREEN: "#1b9b3a"
};

const Logo = ({ type = "navbar", style = {} }) => {
  const isNavbar = type === "navbar";
  
  const mainTextStyle = { 
    fontSize: isNavbar ? "1.8rem" : "2.2rem", 
    fontWeight: "800",
    fontFamily: "'Outfit', sans-serif",
    lineHeight: "1",
    color: COLORS.BLUE
  };

  const taglineStyle = { 
    fontSize: isNavbar ? "0.85rem" : "1rem", 
    color: COLORS.BLUE, 
    fontWeight: "600",
    marginTop: "2px",
    letterSpacing: "0.5px"
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", ...style }}>
      <img 
        src="/assets/images/logo_symbol.png" 
        alt="BlinKlean" 
        style={{ 
          height: isNavbar ? "55px" : "65px", 
          width: "auto",
          objectFit: "contain"
        }} 
      />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={mainTextStyle}>
          Blin<span style={{ color: COLORS.GREEN }}>Klean</span>
        </div>
        <div style={taglineStyle}>
          Clean in a Blink
        </div>
      </div>
    </div>
  );
};

export default Logo;
