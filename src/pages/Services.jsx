import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import "../assets/css/services-premium.css";

const Services = () => {
  const { t } = useTranslation();

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
        title: t('services_page.bhk1_title'),
        price: "₹1,499",
        desc: t('services_page.bhk1_desc'),
        img: "/assets/images/1bhk_cleaning.png",
      },
      {
        title: t('services_page.bhk2_title'),
        price: "₹2,199",
        desc: t('services_page.bhk2_desc'),
        img: "/assets/images/2bhk_cleaning.png",
      },
      {
        title: t('services_page.bhk3_title'),
        price: "₹2,999",
        desc: t('services_page.bhk3_desc'),
        img: "/assets/images/3bhk_cleaning.png",
      },
    ],
    deepCleaning: [
      {
        title: t('services_page.kitchen_title'),
        price: "₹1,299",
        desc: t('services_page.kitchen_desc'),
        img: "/assets/images/kitchen_deep_cleaning.png",
      },
      {
        title: t('services_page.bathroom_title'),
        price: "₹599",
        unit: "/bath",
        desc: t('services_page.bathroom_desc'),
        img: "/assets/images/bathroom_cleaning.png",
      },
      {
        title: t('services_page.sofa_title'),
        price: "₹399",
        unit: "/seat",
        desc: t('services_page.sofa_desc'),
        img: "/assets/images/sofa_cleaning.png",
      },
    ],
    vehicle: [
      {
        title: t('services_page.car_wash_title'),
        price: "₹299",
        desc: t('services_page.car_wash_desc'),
        img: "/assets/images/car_exterior_wash.png",
      },
      {
        title: t('services_page.car_care_title'),
        price: "₹499",
        desc: t('services_page.car_care_desc'),
        img: "/assets/images/car_interior_cleaning.png",
      },
      {
        title: t('services_page.bike_detail_title'),
        price: "₹149",
        desc: t('services_page.bike_detail_desc'),
        img: "/assets/images/bike_detailing.png",
      },
    ],
    laundry: [
      {
        title: t('services_page.wash_fold_title'),
        price: "₹49",
        unit: t('home.services.per_kg'),
        desc: t('services_page.wash_fold_desc'),
        img: "/assets/images/wash_and_fold.png",
      },
      {
        title: t('services_page.wash_iron_title'),
        price: "₹79",
        unit: t('home.services.per_kg'),
        desc: t('services_page.wash_iron_desc'),
        img: "/assets/images/wash_and_iron.png",
      },
      {
        title: t('services_page.dry_clean_title'),
        price: "₹199",
        unit: "/item",
        desc: t('services_page.dry_clean_desc'),
        img: "/assets/images/dry_cleaning.png",
      },
    ],
  };

  return (
    <>
      <Header />

      <header className="services-hero">
        <div className="container">
          <h1 className="reveal">{t('services_page.hero_title')}</h1>
          <p className="reveal">
            {t('services_page.hero_subtitle')}
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
            <h2>{t('services_page.residential_title')}</h2>
            <p>{t('services_page.residential_desc')}</p>
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
            <h2>{t('services_page.deep_cleaning_title')}</h2>
            <p>{t('services_page.deep_cleaning_desc')}</p>
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
            <h2>{t('services_page.vehicle_care_title')}</h2>
            <p>{t('services_page.vehicle_care_desc')}</p>
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
            <h2>{t('services_page.laundry_title')}</h2>
            <p>{t('services_page.laundry_desc')}</p>
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
              <h2>{t('services_page.scrap_cash_title')}</h2>
              <p>{t('services_page.scrap_cash_desc')}</p>
            </div>
            <Link to="/scrap-booking" className="btn btn-secondary btn-lg">
              <i data-lucide="recycle"></i> {t('home.services.sell_scrap')}
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
