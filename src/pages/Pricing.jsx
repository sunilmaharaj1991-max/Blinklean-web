import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { Link } from "react-router-dom";

const Pricing = () => {
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
      <Header />

      <header className="pricing-hero">
        <div className="container">
          <h1>Simple, Transparent Pricing</h1>
          <p>No hidden charges. No surprises. Just sparkling clean spaces.</p>
        </div>
      </header>

      {/*  Subscription Plans  */}
      <section className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            {/*  Bike Wash Plan  */}
            <div className="pricing-card">
              <div className="plan-header">
                <h3>Bike Wash Monthly</h3>
                <div className="plan-price">
                  ₹499<span>/mo</span>
                </div>
              </div>
              <ul className="plan-features">
                <li>
                  <i data-lucide="check-circle"></i> 4 Professional washes
                </li>
                <li>
                  <i data-lucide="check-circle"></i> Chain cleaning & lubing
                </li>
                <li>
                  <i data-lucide="check-circle"></i> Doorstep service
                </li>
              </ul>
              <Link to="/services#vehicle-cleaning" className="btn btn-secondary">
                Explore More
              </Link>
            </div>

            {/*  Car Wash Plan (Featured)  */}
            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <div className="plan-header">
                <h3>Car Care Monthly</h3>
                <div className="plan-price">
                  ₹1,299<span>/mo</span>
                </div>
              </div>
              <ul className="plan-features">
                <li>
                  <i data-lucide="check-circle"></i> 4 Interior & Exterior
                  washes
                </li>
                <li>
                  <i data-lucide="check-circle"></i> Dashboard polishing
                </li>
                <li>
                  <i data-lucide="check-circle"></i> Tire dressing
                </li>
              </ul>
              <Link to="/services#vehicle-cleaning" className="btn btn-primary">
                Explore More
              </Link>
            </div>

            {/*  Premium Home Care  */}
            <div className="pricing-card">
              <div className="plan-header">
                <h3>Premium Home Care</h3>
                <div className="plan-price">
                  ₹3,499<span>/mo</span>
                </div>
              </div>
              <ul className="plan-features">
                <li>
                  <i data-lucide="check-circle"></i> 1 Full Deep Cleaning
                </li>
                <li>
                  <i data-lucide="check-circle"></i> 2 Maintenance cleanings
                </li>
                <li>
                  <i data-lucide="check-circle"></i> Pest control voucher
                </li>
              </ul>
              <Link to="/services#home-cleaning" className="btn btn-secondary">
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/*  Individual Service Price List  */}
      <section className="price-list-section">
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "40px" }}>
            Individual Service Rates
          </h2>
          <table className="price-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Bathroom Deep Cleaning</td>
                <td>₹499</td>
              </tr>
              <tr>
                <td>Kitchen Deep Cleaning</td>
                <td>₹1,299</td>
              </tr>
              <tr>
                <td>Sofa Deep Cleaning (per seat)</td>
                <td>₹199</td>
              </tr>
              <tr>
                <td>Full Home Deep Cleaning (1BHK)</td>
                <td>₹2,499</td>
              </tr>
              <tr>
                <td>Full Home Deep Cleaning (2BHK)</td>
                <td>₹3,499</td>
              </tr>
              <tr>
                <td>Car Interior Detailing</td>
                <td>₹899</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </>
  );
};

export default Pricing;
