import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import "../assets/css/services-premium.css";

const Services = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, []);
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Handle hash scrolling
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const serviceData = {
    residential: [
      {
        title: "1BHK Cleaning",
        price: "₹1,499",
        desc: "Detailed floor-to-ceiling cleaning for compact living spaces. Includes dust removal and sanitization.",
        img: "/assets/images/1bhk_cleaning.png",
      },
      {
        title: "2BHK Cleaning",
        price: "₹2,199",
        desc: "Thorough deep clean for small families. Covers kitchen greasing, bathroom scaling, and floor polishing.",
        img: "/assets/images/2bhk_cleaning.png",
      },
      {
        title: "3BHK Cleaning",
        price: "₹2,999",
        desc: "Full-spectrum home detailing for large apartments. Every corner meticulously scrubbed and polished.",
        img: "/assets/images/3bhk_cleaning.png",
      },
    ],
    deepCleaning: [
      {
        title: "Kitchen Cleaning",
        price: "₹1,299",
        desc: "High-intensity degreasing for chimneys, cabinets, and tiles. Restores your kitchen to showroom shine.",
        img: "/assets/images/kitchen_deep_cleaning.png",
      },
      {
        title: "Bathroom Cleaning",
        price: "₹599",
        unit: "/bath",
        desc: "Descaling of fittings and anti-bacterial scrub for tiles and floors. Hygiene focused deep clean.",
        img: "/assets/images/bathroom_cleaning.png",
      },
      {
        title: "Sofa Cleaning",
        price: "₹399",
        unit: "/seat",
        desc: "Premium foam-based extraction for fabric and leather. Removes deep-seated allergens and stains.",
        img: "/assets/images/sofa_cleaning.png",
      },
    ],
    vehicle: [
      {
        title: "Waterless Polish Wash",
        price: "₹299",
        desc: "Premium waterless exterior detailing using eco-safe polymer sprays. Saves 200L of water while leaving a high-gloss protective wax coating.",
        img: "/assets/images/service_vehicle_branded.png",
      },
      {
        title: "Waterless Full Care",
        price: "₹499",
        desc: "Comprehensive eco-detailing including waterless body wash, deep interior vacuuming, dashboard sanitization, and tire nourishment.",
        img: "/assets/images/car_interior_cleaning.png",
      },
      {
        title: "Ceramic Waterless Shine",
        price: "₹699",
        desc: "Advanced clay-bar treatment followed by a ceramic-infused waterless polish for long-lasting mirror shine and paint protection.",
        img: "/assets/images/premium_polish.png",
      },
      {
        title: "Bike Care Plan",
        price: "₹299",
        unit: "/month",
        desc: "Comprehensive monthly waterless detailing for motorbikes. Includes eco-wash, chain lubrication, and paint protection.",
        img: "/assets/images/motorbike_wash.png",
      },
      {
        title: "Two-Wheeler Detail",
        price: "₹149",
        desc: "Professional waterless exterior clean and polish for scooters and motorcycles. Restores showroom shine.",
        img: "/assets/images/bike_detailing_kit.png",
      },
      {
        title: "Auto Waterless Care",
        price: "₹199",
        desc: "Specialized deep cleaning for auto-rickshaws using waterless technology. Includes seat sanitization and exterior shine.",
        img: "/assets/images/waterless_auto.png",
      },
      {
        title: "Bicycle Eco-Shine",
        price: "₹99",
        desc: "Precision waterless cleaning for bicycles. Chain degreasing and frame protection without any water wastage.",
        img: "/assets/images/waterless_bicycle.png",
      },
    ],
    laundry: [
      {
        title: "Wash & Fold",
        price: "₹79",
        unit: "/kg",
        desc: "Hygienic washing with premium detergents, neatly folded and ready to wear.",
        img: "/assets/images/service_laundry_branded.png",
      },
      {
        title: "Wash & Iron",
        price: "₹99",
        unit: "/kg",
        desc: "Full laundry cycle with crisp electrical ironing. Perfect for office and daily wear.",
        img: "/assets/images/wash_and_iron.png",
      },
      {
        title: "Steam Iron",
        price: "₹10",
        unit: "/cloth",
        desc: "Wrinkle-free vertical steam pressing for delicate fabrics and formals.",
        img: "/assets/images/steam_iron.png",
      },
      {
        title: "Dry Cleaning",
        price: "Starts ₹149",
        desc: "Specialized solvent-based cleaning for woolens, silks, and wedding wear.",
        img: "/assets/images/dry_cleaning.png",
      },
    ],
    recycling: [
      {
        title: "Residential Pickup",
        desc: "Convenient scrap collection for independent houses and villas with instant digital payment.",
        img: "/assets/images/service_scrap_branded.png",
      },
      {
        title: "Apartment Bulk",
        desc: "Optimized bulk recycling drives for gated communities and housing societies.",
        img: "/assets/images/apartment_scrap.png",
      },
      {
        title: "Office Disposal",
        desc: "Certified e-waste and paper shredding services for IT parks and commercial offices.",
        img: "/assets/images/office_scrap.png",
      },
    ],
  };

  return (
    <div className="services-page">
      <nav className="navbar">
        <div className="container nav-container">
          <Link to="/" className="logo-wrapper">
            <div style={{ display: "flex", alignItems: "center" }}>
              <img 
                src="/assets/images/official_logo.png" 
                alt="BlinKlean Logo" 
                style={{ height: "45px", width: "auto" }} 
              />
            </div>
          </Link>
          <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
            <Link to="/services#home-cleaning">Home Cleaning</Link>
            <Link to="/services#vehicle-cleaning">Vehicle Cleaning</Link>
            <Link to="/services#laundry">Laundry</Link>
            <Link to="/services#recycling">Scrap & Recycling</Link>
            {user ? (
              <Link to="/profile" className="nav-login-btn">Profile</Link>
            ) : (
              <Link to="/login" className="nav-login-btn">Login</Link>
            )}
          </div>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <i data-lucide={isMenuOpen ? "x" : "menu"}></i>
          </button>
        </div>
      </nav>

      <header className="services-hero">
        <div className="container">
          <h1 style={{ textTransform: "uppercase", letterSpacing: "2px" }}>
            Professional Clean-Tech Catalog
          </h1>
          <p style={{ fontSize: "1.4rem", fontWeight: "500" }}>
            Precision care for your home, vehicles, and lifestyle.
          </p>
        </div>
      </header>

      <section id="home-cleaning" className="category-section">
        <div className="container">
          <div className="category-header">
            <h2>1. House Cleaning</h2>
            <p>Smart residential solutions for modern urban living.</p>
          </div>

          <h3 className="sub-category-title">
            <i data-lucide="home"></i> Residential Cleaning
          </h3>
          <div className="services-grid-premium">
            {serviceData.residential.map((s, i) => (
              <div key={i} className="service-card-premium">
                <div className="service-img-premium">
                  <img src={s.img} alt={s.title} />
                </div>
                <div className="service-body-premium">
                  <h3>{s.title}</h3>
                  <p className="service-desc-premium">{s.desc}</p>
                  <div
                    className="price-tag-premium"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <span className="price-label">Starting at</span>
                    <span
                      className="price-value"
                      style={{ color: "#1b9b3a", display: "block" }}
                    >
                      {s.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="sub-category-title" style={{ marginTop: "60px" }}>
            <i data-lucide="sparkles"></i> Deep Cleaning Specialists
          </h3>
          <div className="services-grid-premium">
            {serviceData.deepCleaning.map((s, i) => (
              <div key={i} className="service-card-premium">
                <div className="service-img-premium">
                  <img src={s.img} alt={s.title} />
                </div>
                <div className="service-body-premium">
                  <h3>{s.title}</h3>
                  <p className="service-desc-premium">{s.desc}</p>
                  <div
                    className="price-tag-premium"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <span className="price-label">Starting at</span>
                    <span
                      className="price-value"
                      style={{ color: "#1b9b3a", display: "block" }}
                    >
                      {s.price}
                      <small
                        style={{
                          fontSize: "0.9rem",
                          color: "#64748b",
                          marginLeft: "2px",
                        }}
                      >
                        {s.unit}
                      </small>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="vehicle-cleaning"
        className="category-section"
        style={{ background: "#f8fafc" }}
      >
        <div className="container">
          <div className="category-header">
            <h2>2. Vehicle Detailing</h2>
            <p>Eco-friendly waterless care delivered at your doorstep.</p>
          </div>

          <h3 className="sub-category-title">
            <i data-lucide="car"></i> Car Detailing
          </h3>
          <div className="services-grid-premium">
            {serviceData.vehicle.map((s, i) => (
              <div key={i} className="service-card-premium">
                <div className="service-img-premium">
                  <img src={s.img} alt={s.title} />
                </div>
                <div className="service-body-premium">
                  <h3>{s.title}</h3>
                  <p className="service-desc-premium">{s.desc}</p>
                  <div
                    className="price-tag-premium"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <span className="price-label">Starting at</span>
                    <span
                      className="price-value"
                      style={{ color: "#1b9b3a", display: "block" }}
                    >
                      {s.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="laundry" className="category-section">
        <div className="container">
          <div className="category-header">
            <h2>3. Laundry & Fabric Care</h2>
            <div className="badge-pickup-premium">
              <i data-lucide="truck"></i> Doorstep Pickup & Return
            </div>
          </div>
          <div className="services-grid-premium">
            {serviceData.laundry.map((s, i) => (
              <div key={i} className="service-card-premium">
                <div className="service-img-premium">
                  <img src={s.img} alt={s.title} />
                </div>
                <div className="service-body-premium">
                  <h3>{s.title}</h3>
                  <p className="service-desc-premium">{s.desc}</p>
                  <div
                    className="price-tag-premium"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <span className="price-label">Starting at</span>
                    <span
                      className="price-value"
                      style={{ color: "#1b9b3a", display: "block" }}
                    >
                      {s.price}{" "}
                      <small
                        style={{
                          fontSize: "0.9rem",
                          color: "#64748b",
                          marginLeft: "2px",
                        }}
                      >
                        {s.unit}
                      </small>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="recycling"
        className="category-section"
        style={{ background: "#f0fdf4" }}
      >
        <div className="container">
          <div className="category-header">
            <h2>4. Scrap & Recycling</h2>
            <p>Turn your waste into wealth with AI-powered doorstep pickups.</p>
          </div>
          <div className="services-grid-premium">
            {serviceData.recycling.map((s, i) => (
              <div key={i} className="service-card-premium">
                <div className="service-img-premium">
                  <img src={s.img} alt={s.title} />
                </div>
                <div className="service-body-premium">
                  <h3>{s.title}</h3>
                  <p className="service-desc-premium">{s.desc}</p>
                  <Link
                    to="/scrap-booking"
                    className="whatsapp-action-link"
                    style={{ background: "var(--primary)", color: "white", padding: "10px 20px", borderRadius: "8px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}
                  >
                    <i data-lucide="calendar"></i> Book Pickup On-Site
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer className="footer-premium">
        <div className="container footer-grid-premium">
          {/*  Column 1: Company  */}
          <div className="footer-col">
            <div className="footer-logo">
              <img 
                src="/assets/images/official_logo.png" 
                alt="BlinKlean Logo" 
                style={{ height: "45px", width: "auto", marginBottom: "15px" }} 
              />
            </div>
            <p className="footer-desc">
              Blinklean provides professional doorstep clean-tech services
              including home cleaning, waterless vehicle detailing, laundry, and
              scrap recycling.
            </p>
            <div className="footer-social">
              <a
                href="https://www.instagram.com/p/DU7uAgDE5U5/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ=="
                target="_blank"
                rel="noopener noreferrer"
              >
                <i data-lucide="instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/malnad-manju-cafe/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i data-lucide="linkedin"></i>
              </a>
              <a
                href="https://x.com/blinklean"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a
                href="https://wa.me/917022803582"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i data-lucide="message-circle"></i>
              </a>
            </div>
          </div>

          {/*  Column 2: Services  */}
          <div className="footer-col">
            <h4>Our Services</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/services#home-cleaning">Home Cleaning</Link>
              </li>
              <li>
                <Link to="/services#vehicle-cleaning">Vehicle Care</Link>
              </li>
              <li>
                <Link to="/services#laundry">Laundry Services</Link>
              </li>
              <li>
                <Link to="/scrap-recycling">Scrap Recycling</Link>
              </li>
            </ul>
          </div>

          {/*  Column Quick Links  */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links-list">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/services">Join as Partner</Link>
              </li>
            </ul>
          </div>

          {/*  Column 4: Contact Information  */}
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
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              className="footer-policy-links"
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                justifyContent: "center",
                fontSize: "0.85rem",
                marginBottom: "5px",
              }}
            >
              <Link
                to="/privacy-policy"
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-and-conditions"
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                Terms & Conditions
              </Link>
              <Link
                to="/refund-and-cancellation-policy"
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                Refund Policy
              </Link>
              <Link
                to="/equal-opportunity-policy"
                style={{ color: "var(--text-muted)", textDecoration: "none" }}
              >
                Equal Opportunity
              </Link>
            </div>
            <p>&copy; 2026 Blinklean. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/*  Mobile Bottom Navigation  */}
      <div className="bottom-nav">
        <Link to="/" className="bottom-nav-item">
          <i data-lucide="home"></i>
          <span>Home</span>
        </Link>
        <Link to="/services" className="bottom-nav-item active">
          <i data-lucide="layout-grid"></i>
          <span>Services</span>
        </Link>
        {user ? (
          <Link to="/profile" className="bottom-nav-item">
            <i data-lucide="user"></i>
            <span>Profile</span>
          </Link>
        ) : (
          <Link to="/login" className="bottom-nav-item">
            <i data-lucide="log-in"></i>
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Services;
