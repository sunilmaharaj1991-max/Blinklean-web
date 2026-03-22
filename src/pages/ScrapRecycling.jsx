import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { User, MapPin, Recycle, Plus } from "lucide-react";
import "../assets/css/scrap-recycling.css";

const ScrapRecycling = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />

      <div className="booking-hero">
        <div className="container animate-fade-in">
          <h1>{t('scrap_recycling_page.hero_title')}</h1>
          <p>{t('scrap_recycling_page.hero_subtitle')}</p>
        </div>
      </div>

      <div className="booking-container">
        <div className="booking-card">
          <form id="scrapBookingForm">
            <div className="step-title">
              <User style={{ marginRight: "10px" }} />
              {t('scrap_recycling_page.personal_details')}
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>{t('scrap_recycling_page.name_label')}</label>
                <input
                  type="text"
                  id="user_name"
                  placeholder={t('scrap_recycling_page.name_placeholder')}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('scrap_recycling_page.phone_label')}</label>
                <input
                  type="tel"
                  id="user_phone"
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>

            <div className="step-title" style={{ marginTop: "40px" }}>
              <MapPin style={{ marginRight: "10px" }} />
              {t('scrap_recycling_page.address_title')}
            </div>
            <div className="form-group">
              <label>{t('scrap_recycling_page.address_label')}</label>
              <textarea
                id="address"
                rows="3"
                placeholder={t('scrap_recycling_page.address_placeholder')}
                required
              ></textarea>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>{t('scrap_recycling_page.pincode_label')}</label>
                <input type="text" id="pincode" placeholder="560XXX" required />
              </div>
              <div className="form-group">
                <label>{t('scrap_recycling_page.city_label')}</label>
                <input type="text" value={t('scrap_recycling_page.bangalore')} disabled />
              </div>
            </div>

            <div className="step-title" style={{ marginTop: "40px" }}>
              <Recycle style={{ marginRight: "10px" }} />
              {t('scrap_recycling_page.selling_title')}
            </div>
            <div id="itemsContainer">
              <div className="item-row">
                <div className="form-group">
                  <label>{t('scrap_recycling_page.material_label')}</label>
                  <select className="material-select" defaultValue="" required>
                    <option value="" disabled>{t('scrap_recycling_page.select_material')}</option>
                    <option value="newspapers">{t('home.scrap_promo.newspaper')}</option>
                    <option value="cardboard">{t('home.scrap_promo.cardboard')}</option>
                    <option value="plastic">{t('home.scrap_promo.plastics')}</option>
                    <option value="metal">{t('home.scrap_promo.metals')}</option>
                    <option value="aluminum">{t('home.scrap_promo.metals')}</option>
                    <option value="copper">{t('home.scrap_promo.metals')}</option>
                    <option value="e-waste">{t('home.scrap_promo.electronics')}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('scrap_recycling_page.weight_label')}</label>
                  <input
                    type="number"
                    className="weight-input"
                    placeholder="0"
                    min="0.1"
                    step="0.1"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="button" className="btn-add-item">
              <Plus /> {t('scrap_recycling_page.add_another')}
            </button>

            <div className="summary-box">
              <div className="summary-item total-row" style={{ color: "var(--primary)" }}>
                <span>{t('scrap_recycling_page.status_label')}</span>
                <span>{t('scrap_recycling_page.awaiting_collection')}</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "#6b7280", marginTop: "10px" }}>
                {t('scrap_recycling_page.final_value_note')}
              </p>
            </div>

            <Link
              to="/scrap-booking"
              className="btn btn-primary btn-full"
              style={{ marginTop: "30px", padding: "18px", textDecoration: "none", textAlign: "center", display: "block" }}
            >
              {t('scrap_recycling_page.start_booking')}
            </Link>
          </form>
        </div>
      </div>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </>
  );
};

export default ScrapRecycling;
