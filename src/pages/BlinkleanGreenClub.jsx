import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { db, storage } from "../firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Calendar,
  MapPin,
  User,
  Mail,
  Phone,
  TrendingUp,
  Award,
  Heart,
  BookOpen,
  ArrowRight,
  X,
  ShieldCheck,
  Zap,
  Globe,
  Upload,
  CheckCircle2,
  Lock
} from "lucide-react";
import "../assets/css/green-club.css";

const getApiBase = () => {
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:5000/api/v1";
  }
  return import.meta.env.VITE_API_BASE_URL || "https://blinklean-api.onrender.com/api/v1";
};
const API_BASE = getApiBase();

// Curved premium placeholder images to display if none are provided
const PLACEHOLDERS = {
  lake: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  tree: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
  recycle: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
  blog1: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
  blog2: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
  blog3: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
};

const DEFAULT_EVENTS = [
  {
    id: "default-event-1",
    title: "Lake Sanitation & Eco-Cleanup",
    description: "Help us remove plastic waste and debris from the shoreline. All safety gears, trash grabbers, bags, and refreshments will be provided by Blinklean.",
    date: "Saturday, June 27, 2026",
    location: "TBA",
    image_url: PLACEHOLDERS.lake,
    tag: "Lake Clean-Up"
  },
  {
    id: "default-event-2",
    title: "Reforestation & Tree Plantation Drive",
    description: "Planting native trees to rebuild green canopies, lower local temperatures, and offset carbon emissions. Join our eco-warriors this Sunday!",
    date: "Sunday, June 28, 2026",
    location: "TBA",
    image_url: PLACEHOLDERS.tree,
    tag: "Aforestation"
  },
  {
    id: "default-event-3",
    title: "Doorstep Recycling Hub Initiative",
    description: "Setting up active community collection points to help citizens segregate dry waste, hazardous electronics, and old appliances effectively.",
    date: "Saturday, July 4, 2026",
    location: "TBA",
    image_url: PLACEHOLDERS.recycle,
    tag: "Zero-Waste"
  }
];

const DEFAULT_BLOGS = [
  {
    id: "default-blog-1",
    title: "How Blinklean Green Club Diverted 850+ KG of Waste",
    summary: "A detailed breakdown of our combined clean-tech weekend operations and how we turn community recycling drives into measurable circular loops.",
    content: "During our latest weekend drive, our volunteers gathered across metropolitan zones. With real-time weighing systems and smart sorting hubs, we cataloged, collected, and processed plastic, paper, and metal scrap, ensuring zero leakage to municipal landfills. By redirecting these materials to verified recyclers, we are helping build clean, circular economies directly in our neighborhoods.",
    date: "June 15, 2026",
    author: "Sunil Maharaj, Founder and CEO",
    image_url: PLACEHOLDERS.blog1
  },
  {
    id: "default-blog-2",
    title: "Sustainable Living: 5 Micro-Habits for a Zero-Waste Home",
    summary: "Eco-friendly guidelines you can implement at home to dramatically reduce plastic waste and streamline household recycling workflows.",
    content: "Transitioning to a circular lifestyle doesn't require drastic shifts. Simple choices like micro-segregation, composting biological kitchen scraps, opting for reusable containers, and calling Blinklean on-demand scrap pick-ups can cut down single-use plastic waste by up to 80%. Every small step counts towards building a clean and healthy neighborhood.",
    date: "June 10, 2026",
    author: "Jeevith Gowda S R, Co-Founder & CTO",
    image_url: PLACEHOLDERS.blog2
  },
  {
    id: "default-blog-3",
    title: "Why Circular Economy is the Future of Clean-Tech Platforms",
    summary: "An exclusive CEO insights piece detailing how modern on-demand cleaning tech matches green initiatives to generate long-term investor value.",
    content: "Traditional waste disposal systems operate on linear models: take, make, waste. Clean-tech integrations transform this flow. By embedding green rewards and community clubs within our app ecosystem, we reduce Customer Acquisition Cost (CAC) while building strong ESG alignment. We believe that professional doorstep services and carbon-neutral goals can grow hand-in-hand.",
    date: "June 05, 2026",
    author: "sushmitha,Managing Director ",
    image_url: PLACEHOLDERS.blog3
  }
];

const BlinkleanGreenClub = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Registration Form States
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regPhoto, setRegPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  // Terms & Conditions States
  const [termsChecked, setTermsChecked] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [tempTermsChecked, setTempTermsChecked] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        // Fetch events
        const eventQuery = query(collection(db, "green_club_events"), orderBy("created_at", "desc"));
        const eventSnap = await getDocs(eventQuery);
        const eventList = eventSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fetch blogs
        const blogQuery = query(collection(db, "green_club_blogs"), orderBy("created_at", "desc"));
        const blogSnap = await getDocs(blogQuery);
        const blogList = blogSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Override events location if fetched dynamically
        const sanitizedEventList = eventList.map(ev => ({
          ...ev,
          location: "TBA" // Ensure no place/area names are displayed
        }));

        setEvents(sanitizedEventList.length > 0 ? sanitizedEventList : DEFAULT_EVENTS);
        setBlogs(blogList.length > 0 ? blogList : DEFAULT_BLOGS);
      } catch (err) {
        console.warn("Failed to retrieve Firestore collections for Green Club. Loading local fallback seeds.", err);
        setEvents(DEFAULT_EVENTS);
        setBlogs(DEFAULT_BLOGS);
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, []);

  const uploadImage = async (file, folder) => {
    if (!file) return "";
    try {
      const uploadPromise = async () => {
        const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        return await getDownloadURL(snapshot.ref);
      };
      
      // Limit Firebase upload hang to 4 seconds, fallback to default avatar if slow
      return await Promise.race([
        uploadPromise(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 4000))
      ]);
    } catch (err) {
      console.warn("Firebase Storage upload failed or timed out. Falling back to placeholder.", err);
      return "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;
    if (!termsChecked) {
      alert("Please review and accept the Terms & Conditions before proceeding to payment.");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Upload photo
      let finalPhotoUrl = "";
      if (regPhoto) {
        finalPhotoUrl = await uploadImage(regPhoto, "green_club_members");
      }

      // 2. Save registration details in Firestore
      const payload = {
        event_id: selectedEvent.id,
        event_title: selectedEvent.title,
        user_name: regName,
        email: regEmail,
        phone: regPhone,
        address: regAddress,
        photo_url: finalPhotoUrl,
        terms_accepted: true,
        created_at: serverTimestamp()
      };

      await addDoc(collection(db, "green_club_registrations"), payload);

      // 3. Trigger Confirmation Email via Backend API (Asynchronously to avoid blocking)
      fetch(`${API_BASE}/green-club/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          phone: regPhone,
          address: regAddress,
          eventTitle: selectedEvent.title
        })
      }).catch((err) => {
        console.warn("API call for confirmation email failed:", err);
      });

      // Reset form states
      setRegName("");
      setRegEmail("");
      setRegPhone("");
      setRegAddress("");
      setRegPhoto(null);
      setPhotoPreview("");
      setTermsChecked(false);
      setTempTermsChecked(false);
      setSelectedEvent(null);

      alert(`🎉 Registration Saved Successfully!\n\nWe are now redirecting you to our secure Razorpay payment page to complete your ₹500 Lifetime Registration. A confirmation email has been sent with direct links to our WhatsApp community channel!`);

      // 4. Redirect to Razorpay checkout page
      window.location.href = "https://rzp.io/rzp/asaLrHv";
    } catch (err) {
      console.error("Error registering for green club:", err);
      alert("Registration failed due to connection timeout. Please check network settings.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="green-club-wrapper">
      <Header />

      {/* Hero Banner Section */}
      <header className="gc-hero container animate-fade-in">
        <span className="hero-badge">🌱 Join the Green Revolution</span>
        <h1>Blinklean <span>Green Club</span></h1>
        <p>
          We are redefining clean-tech by combining premium household services with active environmental action.
          Join our weekend drives, reduce your ecological footprint, and track community impact.
        </p>
        <button
          onClick={() => setSelectedEvent({ id: "membership-hero", title: "Green Club Lifetime Membership" })}
          className="event-action-btn"
          style={{ maxWidth: "260px", margin: "20px auto 0", display: "block" }}
        >
          Join Green Club Today
        </button>
      </header>

      <div className="container" style={{ maxWidth: "1200px" }}>

        {/* Investor & ESG ROI Panel */}
        <section className="investor-pitch-section animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="investor-pitch-header">
            <h2>Investor & ESG Alignment Dashboard</h2>
            <p>Our circular economic model transforms corporate responsibility into tangible environmental assets.</p>
          </div>
          <div className="investor-metrics-grid">
            <div className="metric-card">
              <div className="metric-value">950</div>
              <div className="metric-label">Waste Diverted (kg)</div>
              <div className="metric-desc">Prevented from entering local landfills</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">680</div>
              <div className="metric-label">Carbon Offset (kg)</div>
              <div className="metric-desc">CO2 equivalent reduced through recycling</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">450+</div>
              <div className="metric-label">Active Members</div>
              <div className="metric-desc">Verified weekend volunteer network</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">98.4%</div>
              <div className="metric-label">Resource Traceability</div>
              <div className="metric-desc">End-to-end audit loops for partners</div>
            </div>
          </div>
        </section>

        {/* Member Advantages Section */}
        <section className="investor-pitch-section animate-fade-in" style={{ marginTop: "60px", animationDelay: "0.3s", background: "rgba(255, 255, 255, 0.75)" }}>
          <div className="investor-pitch-header" style={{ marginBottom: "25px" }}>
            <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--gc-primary-dark)", fontWeight: "800", display: "block", marginBottom: "8px" }}>EXCLUSIVE BENEFITS</span>
            <h2 style={{ fontSize: "2rem" }}>BlinKlean Green Club – Member Advantages</h2>
            <p style={{ maxWidth: "900px", margin: "10px auto 0", lineHeight: "1.6" }}>
              Joining BlinKlean Green Club gives members opportunities to contribute to sustainability, learn environmental practices, participate in community projects, and develop leadership skills. Environmental clubs are widely recognized for increasing environmental awareness, community engagement, and hands-on participation in sustainability initiatives.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px", marginTop: "30px" }}>
            {/* Lifetime Benefits */}
            <div style={{ background: "white", padding: "30px", borderRadius: "20px", border: "1px solid rgba(16, 185, 129, 0.1)", boxShadow: "0 10px 25px rgba(0,0,0,0.01)" }}>
              <h3 style={{ fontSize: "1.25rem", color: "var(--gc-primary-dark)", fontWeight: "800", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                ✅ Lifetime Member Benefits
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.95rem" }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>🌳 <span>Participate in tree plantation drives</span></li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>♻️ <span>Join recycling and waste management programs</span></li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>🧹 <span>Community clean-up activities</span></li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>🎓 <span>Free environmental awareness workshops</span></li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>📜 <span>Digital Green Volunteer Certificate</span></li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>🤝 <span>Networking with eco-conscious members</span></li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>🏅 <span>Recognition for outstanding contributions</span></li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>🌍 <span>Opportunity to lead local green initiatives</span></li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>📱 <span>Priority access to BlinKlean sustainability campaigns</span></li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>🎁 <span>Exclusive Green Club member events and rewards</span></li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>🌱 <span>Learn sustainable living practices</span></li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>💼 <span>Build volunteering experience for resumes and LinkedIn profiles</span></li>
              </ul>
            </div>

            {/* Special Privileges */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ background: "white", padding: "30px", borderRadius: "20px", border: "1px solid rgba(0, 158, 227, 0.1)", boxShadow: "0 10px 25px rgba(0,0,0,0.01)", flex: 1 }}>
                <h3 style={{ fontSize: "1.25rem", color: "var(--gc-secondary)", fontWeight: "800", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                  🌟 Special Member Privileges
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.95rem" }}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>● <span>Green Club ID Card</span></li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>● <span>Access to member-only WhatsApp community</span></li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>● <span>Discounts on selected BlinKlean services</span></li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>● <span>Early access to environmental projects</span></li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>● <span>Leadership opportunities as Area/City Green Champions</span></li>
                </ul>
              </div>

              {/* Tagline Callout */}
              <div style={{ background: "linear-gradient(135deg, #10b981 0%, #009ee3 100%)", padding: "25px", borderRadius: "20px", color: "white", textAlign: "center" }}>
                <p style={{ fontSize: "1.2rem", fontWeight: "800", margin: "0 0 10px 0", fontStyle: "italic" }}>
                  "Join Green Club Today – Be the Change for a Cleaner Tomorrow."
                </p>
                <div style={{ fontSize: "1.1rem", fontWeight: "700", background: "rgba(255, 255, 255, 0.2)", display: "inline-block", padding: "6px 16px", borderRadius: "10px" }}>
                  Lifetime Registration Fee: ₹500 Only
                </div>
                <button
                  onClick={() => setSelectedEvent({ id: "membership-advantages", title: "Green Club Lifetime Membership" })}
                  style={{ background: "white", color: "var(--gc-primary-dark)", border: "none", padding: "10px 24px", borderRadius: "10px", fontWeight: "800", display: "block", width: "100%", marginTop: "15px", cursor: "pointer", transition: "transform 0.2s" }}
                  onMouseOver={(e) => e.target.style.transform = "scale(1.02)"}
                  onMouseOut={(e) => e.target.style.transform = "none"}
                >
                  Join & Pay Registration Fee
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Weekend Tasks / Upcoming Events */}
        <section style={{ marginTop: "80px" }}>
          <h2 className="gc-section-title">Upcoming Weekend Tasks</h2>
          <p className="gc-section-subtitle">
            Take part in hands-on tasks and meet other community members to restore our ecosystems. Register to claim your free eco-kit.
          </p>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--gc-text-muted)" }}>Loading events...</div>
          ) : (
            <div className="events-grid">
              {events.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-image-wrapper">
                    <img
                      src={event.image_url || PLACEHOLDERS.lake}
                      className="event-image"
                      alt={event.title}
                      onError={(e) => { e.target.src = PLACEHOLDERS.lake; }}
                    />
                    <span className="event-badge">{event.tag || "Eco-Task"}</span>
                  </div>
                  <div className="event-content">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-desc">{event.description}</p>
                    <div className="event-meta">
                      <div className="event-meta-item">
                        <Calendar size={16} />
                        <span>{event.date}</span>
                      </div>
                      <div className="event-meta-item">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="event-action-btn"
                    >
                      Register for Task
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Blogs & Activities Gallery */}
        <section style={{ marginTop: "50px" }}>
          <h2 className="gc-section-title">Green Club Blogs & Activities</h2>
          <p className="gc-section-subtitle">
            Read stories from the field, updates on our recycling loops, and expert guides on zero-waste living.
          </p>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "var(--gc-text-muted)" }}>Loading blogs...</div>
          ) : (
            <div className="blogs-grid">
              {blogs.map((blog) => (
                <div key={blog.id} className="blog-card">
                  <div className="blog-image-wrapper">
                    <img
                      src={blog.image_url || PLACEHOLDERS.blog1}
                      className="blog-image"
                      alt={blog.title}
                      onError={(e) => { e.target.src = PLACEHOLDERS.blog1; }}
                    />
                  </div>
                  <div className="blog-content">
                    <span className="blog-date">{blog.date}</span>
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-summary">{blog.summary}</p>
                    <div className="blog-footer">
                      <span className="blog-author">By {blog.author || "Admin"}</span>
                      <span className="blog-read-more" style={{ cursor: "pointer" }} onClick={() => navigate(`/blog/${blog.id}`)}>
                        Read Story <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Registration Modal Overlay */}
      {selectedEvent && (
        <div className="modal-overlay">
          <div className="modal-card" style={{ maxHeight: "90vh", overflowY: "auto" }}>
            <button className="modal-close-btn" onClick={() => setSelectedEvent(null)}>
              <X size={18} />
            </button>
            <h2>Volunteer Registration</h2>
            <p>Register to reserve your eco-kit and receive meeting coordinates for <strong>"{selectedEvent.title}"</strong>.</p>

            <form onSubmit={handleRegisterSubmit}>
              {/* Full Name */}
              <div className="form-group-gc">
                <label>Full Name</label>
                <div style={{ position: "relative" }}>
                  <User size={18} style={{ position: "absolute", left: "14px", top: "18px", color: "var(--gc-text-muted)" }} />
                  <input
                    type="text"
                    placeholder="e.g. Rohith Lakshman"
                    required
                    style={{ paddingLeft: "42px" }}
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="form-group-gc">
                <label>Email Address</label>
                <div style={{ position: "relative" }}>
                  <Mail size={18} style={{ position: "absolute", left: "14px", top: "18px", color: "var(--gc-text-muted)" }} />
                  <input
                    type="email"
                    placeholder="e.g. user@domain.com"
                    required
                    style={{ paddingLeft: "42px" }}
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="form-group-gc">
                <label>Mobile Number (WhatsApp Updates)</label>
                <div style={{ position: "relative" }}>
                  <Phone size={18} style={{ position: "absolute", left: "14px", top: "18px", color: "var(--gc-text-muted)" }} />
                  <input
                    type="tel"
                    placeholder="10-digit mobile number"
                    required
                    pattern="[0-9]{10}"
                    style={{ paddingLeft: "42px" }}
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                  />
                </div>
              </div>

              {/* Address Field */}
              <div className="form-group-gc">
                <label>Complete Address</label>
                <div style={{ position: "relative" }}>
                  <MapPin size={18} style={{ position: "absolute", left: "14px", top: "15px", color: "var(--gc-text-muted)" }} />
                  <textarea
                    placeholder="Provide your complete residential address"
                    required
                    style={{
                      paddingLeft: "42px",
                      width: "100%",
                      height: "80px",
                      borderRadius: "12px",
                      border: "2px solid #e2e8f0",
                      background: "#f8fafc",
                      padding: "12px 12px 12px 42px",
                      outline: "none",
                      fontSize: "0.95rem",
                      fontWeight: "600",
                      fontFamily: "inherit"
                    }}
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                  />
                </div>
              </div>

              {/* Photo Upload field */}
              <div className="form-group-gc">
                <label>Upload Photo</label>
                <div style={{ border: "2px dashed #cbd5e1", padding: "18px", borderRadius: "12px", textAlign: "center", background: "#f8fafc", position: "relative", cursor: "pointer" }}>
                  <Upload size={20} style={{ color: "#94a3b8", marginBottom: "6px", margin: "0 auto" }} />
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b", fontWeight: "600" }}>
                    {regPhoto ? regPhoto.name : "Select your profile photo"}
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setRegPhoto(file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => setPhotoPreview(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0, cursor: "pointer" }}
                  />
                </div>
                {photoPreview && (
                  <div style={{ marginTop: "12px", textAlign: "center" }}>
                    <img src={photoPreview} alt="Preview" style={{ width: "65px", height: "65px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gc-primary)" }} />
                  </div>
                )}
              </div>

              {/* T&C Accept Checkbox (Read Only) */}
              <div className="form-group-gc" style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginTop: "20px" }}>
                <input
                  type="checkbox"
                  id="tc-checkbox"
                  checked={termsChecked}
                  readOnly
                  style={{ width: "18px", height: "18px", marginTop: "2px", accentColor: "var(--gc-primary)" }}
                />
                <label htmlFor="tc-checkbox" style={{ textTransform: "none", fontSize: "0.85rem", color: "#475569", fontWeight: "700", cursor: "pointer" }}>
                  I agree to the <span style={{ color: "var(--gc-primary-dark)", textDecoration: "underline" }} onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }}>Green Club Terms & Conditions</span>
                </label>
              </div>

              <button
                type="submit"
                className="submit-btn-gc"
                disabled={submitting || !termsChecked}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                <Lock size={16} />
                {submitting ? "Saving & Redirecting..." : "Confirm & Proceed to Payment (₹500)"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal Overlay */}
      {showTermsModal && (
        <div className="modal-overlay" style={{ zIndex: 1100 }}>
          <div className="modal-card" style={{ maxWidth: "600px", maxHeight: "85vh", overflowY: "auto", padding: "30px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "15px" }}>BlinKlean Green Club – Terms & Conditions</h2>
            <div style={{ fontSize: "0.85rem", lineHeight: "1.6", color: "#334155", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "25px" }}>
              <p>1. Lifetime Membership Fee: ₹500 is a one-time, non-refundable registration fee.</p>
              <p>2. Membership is voluntary and open to individuals who support environmental and sustainability initiatives.</p>
              <p>3. Members are expected to maintain respectful behavior during all Green Club activities and events.</p>
              <p>4. Participation in club activities is voluntary and subject to availability and event schedules.</p>
              <p>5. BlinKlean Green Club does not guarantee employment, income, or financial benefits through membership.</p>
              <p>6. Certificates, badges, and recognition awards are issued based on participation and contribution criteria set by the club.</p>
              <p>7. Members must follow safety guidelines and instructions during clean-up drives, plantation activities, and other events.</p>
              <p>8. BlinKlean Green Club reserves the right to suspend or terminate membership for misconduct, illegal activities, or actions that harm the club's reputation.</p>
              <p>9. Photographs and videos taken during club events may be used by BlinKlean for promotional, educational, and social media purposes.</p>
              <p>10. Membership benefits, events, and programs may be updated, modified, or discontinued at the discretion of BlinKlean Green Club.</p>
              <p>11. Members are responsible for their own travel, food, accommodation, and personal expenses unless otherwise specified by the club.</p>
              <p>12. Personal information shared during registration will be used only for club communication and program management.</p>
              <p>13. The club is not responsible for any personal injury, loss, or damage occurring during voluntary participation in activities.</p>
              <p>14. Membership is non-transferable and cannot be assigned to another person.</p>
              <p>15. By registering, members agree to abide by all Green Club policies, guidelines, and future updates.</p>

              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "12px", borderRadius: "10px", marginTop: "10px" }}>
                <p style={{ margin: 0, fontWeight: "800", color: "#166534", fontSize: "0.9rem" }}>Declaration:</p>
                <p style={{ margin: "5px 0 0", color: "#166534", fontStyle: "italic" }}>
                  "I voluntarily join BlinKlean Green Club and agree to follow all club rules, environmental values, and terms & conditions."
                </p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <input
                type="checkbox"
                id="declaration-checkbox"
                checked={tempTermsChecked}
                onChange={(e) => setTempTermsChecked(e.target.checked)}
                style={{ width: "20px", height: "20px", accentColor: "var(--gc-primary)", cursor: "pointer" }}
              />
              <label htmlFor="declaration-checkbox" style={{ margin: 0, textTransform: "none", fontSize: "0.9rem", fontWeight: "700", color: "#0f172a", cursor: "pointer" }}>
                I voluntarily declare and agree to the Terms & Conditions
              </label>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                type="button"
                onClick={() => {
                  setTermsChecked(tempTermsChecked);
                  setShowTermsModal(false);
                }}
                disabled={!tempTermsChecked}
                className="submit-btn-gc"
                style={{ flex: 1, padding: "12px" }}
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => {
                  setTempTermsChecked(false);
                  setTermsChecked(false);
                  setShowTermsModal(false);
                }}
                style={{ flex: 1, background: "#f1f5f9", color: "#64748b", border: "none", padding: "12px", borderRadius: "12px", fontWeight: "700", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </div>
  );
};

export default BlinkleanGreenClub;
