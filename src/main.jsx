import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./assets/css/app-promo.css";
import "./assets/css/booking.css";
import "./assets/css/bookings.css";
import "./assets/css/bottom-nav.css";
import "./assets/css/faq.css";
import "./assets/css/final-cta.css";
import "./assets/css/footer-premium.css";
import "./assets/css/hero-premium.css";
import "./assets/css/how-it-works-premium.css";
import "./assets/css/how-it-works-v2.css";
import "./assets/css/how-it-works.css";
import "./assets/css/our-services.css";
import "./assets/css/popular-services.css";
import "./assets/css/pricing.css";
import "./assets/css/profile.css";
import "./assets/css/service-areas.css";
import "./assets/css/service-details.css";
import "./assets/css/stats.css";
import "./assets/css/style.css";
import "./assets/css/style_test.css";
import "./assets/css/subscriptions.css";
import "./assets/css/testimonials-premium.css";
import "./assets/css/trending-services.css";
import "./assets/css/trust-section.css";
import "./assets/css/whatsapp-float.css";
import "./assets/css/why-choose-us.css";
import "./assets/css/mobile-responsive.css"; /* ← Global mobile fixes — must be last */
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
