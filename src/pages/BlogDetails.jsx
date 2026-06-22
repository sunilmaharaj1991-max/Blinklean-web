import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { ArrowLeft, Calendar, User, BookOpen } from "lucide-react";
import "../assets/css/green-club.css";

const PLACEHOLDERS = {
  blog1: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
  blog2: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
  blog3: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
};

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

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        // Check Firestore first
        const docRef = doc(db, "green_club_blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
          // Fall back to default seed blogs
          const found = DEFAULT_BLOGS.find(b => b.id === id);
          if (found) {
            setBlog(found);
          } else {
            setBlog(null);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch blog from Firestore, falling back to local seeds.", err);
        const found = DEFAULT_BLOGS.find(b => b.id === id);
        setBlog(found || null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="green-club-wrapper">
        <Header />
        <div className="container" style={{ padding: "100px 20px", textAlign: "center" }}>
          <div style={{
            width: "40px",
            height: "40px",
            border: "4px solid #bae6fd",
            borderTopColor: "#10b981",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 20px"
          }} />
          <p style={{ color: "var(--gc-text-muted)" }}>Loading Blog Story...</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="green-club-wrapper">
        <Header />
        <div className="container animate-fade-in" style={{ padding: "120px 20px", textAlign: "center" }}>
          <BookOpen size={48} style={{ color: "var(--gc-text-muted)", marginBottom: "20px" }} />
          <h2>Blog Story Not Found</h2>
          <p style={{ color: "var(--gc-text-muted)", marginBottom: "30px" }}>The requested green club article does not exist or has been removed.</p>
          <Link to="/green-club" className="event-action-btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px", width: "auto", padding: "12px 24px" }}>
            <ArrowLeft size={16} /> Back to Green Club
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="green-club-wrapper">
      <Header />

      <main className="container animate-fade-in" style={{ maxWidth: "800px", padding: "120px 20px 60px" }}>
        {/* Back Link */}
        <Link to="/green-club" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--gc-primary-dark)", textDecoration: "none", fontWeight: "700", marginBottom: "30px", transition: "transform 0.2s" }} className="back-link">
          <ArrowLeft size={18} /> Back to Green Club
        </Link>

        {/* Article Header */}
        <article className="blog-article-details" style={{ background: "white", borderRadius: "28px", padding: "40px", boxShadow: "var(--gc-shadow-premium)", border: "1px solid rgba(0,0,0,0.03)" }}>
          <header className="article-header" style={{ marginBottom: "30px" }}>
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: "900", lineHeight: "1.2", marginBottom: "20px", color: "#0f172a" }}>
              {blog.title}
            </h1>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "0.9rem", color: "var(--gc-text-muted)", paddingBottom: "20px", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <User size={16} style={{ color: "var(--gc-primary)" }} />
                <span>By <strong>{blog.author || "Blinklean Green Club"}</strong></span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={16} style={{ color: "var(--gc-primary)" }} />
                <span>{blog.date}</span>
              </div>
            </div>
          </header>

          {/* Article Cover Image */}
          {blog.image_url && (
            <div style={{ borderRadius: "20px", overflow: "hidden", marginBottom: "35px", height: "auto", maxHeight: "400px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <img src={blog.image_url} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}

          {/* Summary Quote */}
          {blog.summary && (
            <blockquote style={{ background: "#f0fdf4", borderLeft: "4px solid var(--gc-primary)", padding: "20px", borderRadius: "12px", margin: "0 0 30px", fontSize: "1.1rem", fontStyle: "italic", color: "#166534", lineHeight: "1.6" }}>
              {blog.summary}
            </blockquote>
          )}

          {/* Main Content */}
          <div style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#334155" }} className="article-body">
            {blog.content.split("\n\n").map((para, i) => (
              <p key={i} style={{ marginBottom: "20px" }}>{para}</p>
            ))}
          </div>
        </article>
      </main>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </div>
  );
};

export default BlogDetails;
