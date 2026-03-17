import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import "../assets/css/services-premium.css";

const Services = () => {
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
        img: "/assets/images/car_exterior_wash.png",
      },
      {
        title: "Waterless Full Care",
        price: "₹499",
        desc: "Comprehensive waterless treatment including exterior wax wash, interior vacuuming, and dashboard conditioning.",
        img: "/assets/images/car_interior_cleaning.png",
      },
      {
        title: "Two-Wheeler Detail",
        price: "₹149",
        desc: "Expert detailing for motorcycles and scooters. Includes chain lubrication and high-gloss paint protection.",
        img: "/assets/images/bike_detailing.png",
      },
    ],
    laundry: [
      {
        title: "Wash & Fold",
        price: "₹49",
        unit: "/kg",
        desc: "Daily wear laundry cleaned with premium detergents, neatly folded and packed. Minimum 3kg.",
        img: "/assets/images/wash_and_fold.png",
      },
      {
        title: "Wash & Steam Iron",
        price: "₹79",
        unit: "/kg",
        desc: "Complete garment care including washing and professional steam ironing for a crisp look.",
        img: "/assets/images/wash_and_iron.png",
      },
      {
        title: "Premium Dry Cleaning",
        price: "₹199",
        unit: "/item",
        desc: "Gentle chemical cleaning for silks, woolens, and designer wear. Preserves fabric life and color.",
        img: "/assets/images/dry_cleaning.png",
      },
    ],
  };

  return (
    <>
      <Header />

      <header className="services-hero">
        <div className="container">
          <h1 className="reveal">Professional Services at Your Doorstep</h1>
          <p className="reveal">
            Choose from our range of tech-enabled services designed for the
            modern urban lifestyle.
          </p>
        </div>
      </header>

      {/*  Residential Cleaning Section  */}
      <section id="home-cleaning" className="service-category reveal">
        <div className="container">
          <div className="category-header">
            <div className="cat-icon">
              <i data-lucide="home"></i>
            </div>
            <h2>Full House Deep Cleaning</h2>
            <p>Complete restoration of your living spaces by experts.</p>
          </div>
          <div className="services-grid-premium">
            {serviceData.residential.map((s, i) => (
              <div key={i} className="service-card-premium">
                <div className="service-img">
                  <img src={s.img} alt={s.title} />
                  <div className="price-tag">{s.price}</div>
                </div>
                <div className="service-details">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to="/contact" className="btn btn-primary">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  Deep Cleaning Focus Section  */}
      <section className="service-category bg-light reveal">
        <div className="container">
          <div className="category-header">
            <div className="cat-icon">
              <i data-lucide="sparkles"></i>
            </div>
            <h2>Kitchen & Bathroom Deep Cleaning</h2>
            <p>Targeted cleaning for high-utility hygiene areas.</p>
          </div>
          <div className="services-grid-premium">
            {serviceData.deepCleaning.map((s, i) => (
              <div key={i} className="service-card-premium">
                <div className="service-img">
                  <img src={s.img} alt={s.title} />
                  <div className="price-tag">
                    {s.price}
                    {s.unit && <small>{s.unit}</small>}
                  </div>
                </div>
                <div className="service-details">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to="/contact" className="btn btn-primary">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  Vehicle Care Section  */}
      <section id="vehicle-cleaning" className="service-category reveal">
        <div className="container">
          <div className="category-header">
            <div className="cat-icon">
              <i data-lucide="car"></i>
            </div>
            <h2>Waterless Vehicle Care</h2>
            <p>Eco-friendly detailing that saves water and adds shine.</p>
          </div>
          <div className="services-grid-premium">
            {serviceData.vehicle.map((s, i) => (
              <div key={i} className="service-card-premium">
                <div className="service-img">
                  <img src={s.img} alt={s.title} />
                  <div className="price-tag">{s.price}</div>
                </div>
                <div className="service-details">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to="/contact" className="btn btn-primary">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  Laundry Section  */}
      <section id="laundry" className="service-category bg-light reveal">
        <div className="container">
          <div className="category-header">
            <div className="cat-icon">
              <i data-lucide="shirt"></i>
            </div>
            <h2>Fabric Care & Laundry</h2>
            <p>Professional garment care delivered to your door.</p>
          </div>
          <div className="services-grid-premium">
            {serviceData.laundry.map((s, i) => (
              <div key={i} className="service-card-premium">
                <div className="service-img">
                  <img src={s.img} alt={s.title} />
                  <div className="price-tag">
                    {s.price}
                    {s.unit && <small>{s.unit}</small>}
                  </div>
                </div>
                <div className="service-details">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to="/contact" className="btn btn-primary">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  Recycling CTA  */}
      <section id="recycling" className="recycling-banner reveal">
        <div className="container">
          <div className="banner-content">
            <div className="banner-text">
              <h2>Turn Your Scrap into Cash!</h2>
              <p>Book a doorstep pickup for your recyclable materials today.</p>
            </div>
            <Link to="/scrap-recycling" className="btn btn-secondary btn-lg">
              <i data-lucide="recycle"></i> Sell Scrap Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </>
  );
};

export default Services;
