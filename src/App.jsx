import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* ---- Eager-load only the most-visited pages ---- */
import Home  from "./pages/Home";
import Login from "./pages/Login";

/* ---- Lazy-load all other pages (code-split per route) ---- */
const About                       = lazy(() => import("./pages/About"));
const Admin                       = lazy(() => import("./pages/Admin"));
const Contact                     = lazy(() => import("./pages/Contact"));
const EqualOpportunityPolicy      = lazy(() => import("./pages/EqualOpportunityPolicy"));
const Faq                         = lazy(() => import("./pages/Faq"));
const HomeCleaning                = lazy(() => import("./pages/HomeCleaning"));
const LaundryServices             = lazy(() => import("./pages/LaundryServices"));
const Partner                     = lazy(() => import("./pages/Partner"));
const Pricing                     = lazy(() => import("./pages/Pricing"));
const PrivacyPolicy               = lazy(() => import("./pages/PrivacyPolicy"));
const Profile                     = lazy(() => import("./pages/Profile"));
const RefundAndCancellationPolicy = lazy(() => import("./pages/RefundAndCancellationPolicy"));
const ScrapBooking                = lazy(() => import("./pages/ScrapBooking"));
const ScrapRecycling              = lazy(() => import("./pages/ScrapRecycling"));
const ServiceDetails              = lazy(() => import("./pages/ServiceDetails"));
const Services                    = lazy(() => import("./pages/Services"));
const TermsAndConditions          = lazy(() => import("./pages/TermsAndConditions"));
const VehicleCleaning             = lazy(() => import("./pages/VehicleCleaning"));
const VulnerabilityDisclosurePolicy = lazy(() => import("./pages/VulnerabilityDisclosurePolicy"));

/* ---- Minimal inline fallback — avoids layout shift ---- */
const PageFallback = () => (
  <div style={{
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "14px",
    background: "#f4fbff"
  }}>
    <div style={{
      width: "40px",
      height: "40px",
      border: "4px solid #bae6fd",
      borderTopColor: "#009EE3",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite"
    }} />
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
  </div>
);

const App = () => (
  <Router>
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Eagerly loaded */}
        <Route path="/"      element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Lazily loaded */}
        <Route path="/about"                         element={<About />} />
        <Route path="/admin"                         element={<Admin />} />
        <Route path="/contact"                       element={<Contact />} />
        <Route path="/equal-opportunity-policy"      element={<EqualOpportunityPolicy />} />
        <Route path="/faq"                           element={<Faq />} />
        <Route path="/home-cleaning"                 element={<HomeCleaning />} />
        <Route path="/laundry-services"              element={<LaundryServices />} />
        <Route path="/partner"                       element={<Partner />} />
        <Route path="/pricing"                       element={<Pricing />} />
        <Route path="/privacy-policy"                element={<PrivacyPolicy />} />
        <Route path="/profile"                       element={<Profile />} />
        <Route path="/refund-and-cancellation-policy" element={<RefundAndCancellationPolicy />} />
        <Route path="/scrap-booking"                 element={<ScrapBooking />} />
        <Route path="/scrap-recycling"               element={<ScrapRecycling />} />
        <Route path="/service-details"               element={<ServiceDetails />} />
        <Route path="/services"                      element={<Services />} />
        <Route path="/terms-and-conditions"          element={<TermsAndConditions />} />
        <Route path="/vehicle-cleaning"              element={<VehicleCleaning />} />
        <Route path="/vulnerability-disclosure-policy" element={<VulnerabilityDisclosurePolicy />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;
