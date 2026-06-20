import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { db } from "../firebase";
import { collection, getDocs, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
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
  Globe
} from "lucide-react";
import "../assets/css/green-club.css";

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
    location: "Ulsoor Lake Main Gate, Bengaluru",
    image_url: PLACEHOLDERS.lake,
    tag: "Lake Clean-Up"
  },
  {
    id: "default-event-2",
    title: "Reforestation & Tree Plantation Drive",
    description: "Planting native trees to rebuild green canopies, lower local temperatures, and offset carbon emissions. Join our eco-warriors this Sunday!",
    date: "Sunday, June 28, 2026",
    location: "Hebbal Green Belt Reserve, Bengaluru",
    image_url: PLACEHOLDERS.tree,
    tag: "Aforestation"
  },
  {
    id: "default-event-3",
    title: "Doorstep Recycling Hub Initiative",
    description: "Setting up active community collection points to help citizens segregate dry waste, hazardous electronics, and old appliances effectively.",
    date: "Saturday, July 4, 2026",
    location: "Indiranagar Recycling Station, Bengaluru",
    image_url: PLACEHOLDERS.recycle,
    tag: "Zero-Waste"
  }
];

const DEFAULT_BLOGS = [
  {
    id: "default-blog-1",
    title: "How Blinklean Green Club Diverted 12,000+ KG of Waste",
    summary: "A detailed breakdown of our combined clean-tech weekend operations and how we turn community recycling drives into measurable circular loops.",
    content: "During our latest weekend drive, over 150 volunteers gathered across three metropolitan zones. With real-time weighing systems and smart sorting hubs, we cataloged, collected, and processed plastic, paper, and metal scrap, ensuring zero leakage to municipal landfills.",
    date: "June 15, 2026",
    author: "Arun Kumar, ESG Director",
    image_url: PLACEHOLDERS.blog1
  },
  {
    id: "default-blog-2",
    title: "Sustainable Living: 5 Micro-Habits for a Zero-Waste Home",
    summary: "Eco-friendly guidelines you can implement at home to dramatically reduce plastic waste and streamline household recycling workflows.",
    content: "Transitioning to a circular lifestyle doesn't require drastic shifts. Simple choices like micro-segregation, composting biological kitchen scraps, opting for reusable containers, and calling Blinklean on-demand scrap pick-ups can cut down single-use plastic waste by up to 80%.",
    date: "June 10, 2026",
    author: "Meera Roy, Sustainability Lead",
    image_url: PLACEHOLDERS.blog2
  },
  {
    id: "default-blog-3",
    title: "Why Circular Economy is the Future of Clean-Tech Platforms",
    summary: "An exclusive CEO insights piece detailing how modern on-demand cleaning tech matches green initiatives to generate long-term investor value.",
    content: "Traditional waste disposal systems operate on linear models: take, make, waste. Clean-tech integrations transform this flow. By embedding green rewards and community clubs within our app ecosystem, we reduce Customer Acquisition Cost (CAC) while building strong ESG alignment.",
    date: "June 05, 2026",
    author: "Sunil Maharaj, Co-Founder & CEO",
    image_url: PLACEHOLDERS.blog3
  }
];

const BlinkleanGreenClub = () => {
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Registration Form States
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
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

        // Use custom Firestore data if exists, otherwise load default seeds
        setEvents(eventList.length > 0 ? eventList : DEFAULT_EVENTS);
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

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setSubmitting(true);
    try {
      const payload = {
        event_id: selectedEvent.id,
        event_title: selectedEvent.title,
        user_name: regName,
        email: regEmail,
        phone: regPhone,
        created_at: serverTimestamp()
      };

      await addDoc(collection(db, "green_club_registrations"), payload);
      alert(`🎉 Registration Successful!\n\nYou have successfully registered for "${selectedEvent.title}". We will send details to ${regEmail} and coordinates over WhatsApp.`);
      
      // Reset form and close modal
      setRegName("");
      setRegEmail("");
      setRegPhone("");
      setSelectedEvent(null);
    } catch (err) {
      console.error("Error registering for green club event:", err);
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
              <div className="metric-value">12.4k</div>
              <div className="metric-label">Waste Diverted (kg)</div>
              <div className="metric-desc">Prevented from entering local landfills</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">8.6k</div>
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
                        <span>{event.location.split(",")[0]}</span>
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

        {/* Blogs & Activites Gallery */}
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
                      <span className="blog-read-more" style={{ cursor: "pointer" }} onClick={() => alert(`📖 ${blog.title}\n\n${blog.content}`)}>
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
          <div className="modal-card">
            <button className="modal-close-btn" onClick={() => setSelectedEvent(null)}>
              <X size={18} />
            </button>
            <h2>Volunteer Registration</h2>
            <p>Register to reserve your eco-kit and receive meeting coordinates for <strong>"{selectedEvent.title}"</strong>.</p>
            
            <form onSubmit={handleRegisterSubmit}>
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

              <button 
                type="submit" 
                className="submit-btn-gc" 
                disabled={submitting}
              >
                {submitting ? "Submitting Registration..." : "Confirm & Send WhatsApp Invite"}
              </button>
            </form>
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
