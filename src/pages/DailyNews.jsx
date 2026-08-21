import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { 
  Newspaper, 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Images, 
  Sparkles
} from "lucide-react";
import { CATEGORIES, DEFAULT_DAILY_NEWS } from "../data/newsData";
import "../assets/css/weekly-news.css";

const DailyNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDailyNews = async () => {
      try {
        setLoading(true);
        // Query weekly_news (or daily_news)
        const newsQuery = query(collection(db, "weekly_news"), orderBy("created_at", "desc"));
        const snap = await getDocs(newsQuery);
        const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (fetched.length > 0) {
          const combined = [...fetched];
          DEFAULT_DAILY_NEWS.forEach(seed => {
            if (!combined.some(n => n.id === seed.id)) {
              combined.push(seed);
            }
          });
          setNewsList(combined);
        } else {
          setNewsList(DEFAULT_DAILY_NEWS);
        }
      } catch (err) {
        console.warn("Could not fetch daily news from Firestore, using curated seeds:", err);
        setNewsList(DEFAULT_DAILY_NEWS);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyNews();
    window.scrollTo(0, 0);
  }, []);

  // Filter news
  const filteredNews = newsList.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const q = searchTerm.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.summary && item.summary.toLowerCase().includes(q)) ||
      (item.author && item.author.toLowerCase().includes(q)) ||
      (item.categoryLabel && item.categoryLabel.toLowerCase().includes(q)) ||
      (item.tags && Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(q)));

    return matchesCategory && matchesSearch;
  });

  const featuredItem = newsList.find(n => n.is_featured) || newsList[0];

  return (
    <div className="weekly-news-wrapper">
      <Header />

      {/* Hero Section */}
      <header className="wn-hero container animate-fade-in">
        <div className="wn-edition-badge">
          <Sparkles size={16} /> Daily Society & Clean-Tech Gazette
        </div>
        <h1>
          Daily News & <span>Civic Dispatch</span>
        </h1>
        <p>
          Fresh daily insights covering ecological missions, clean-tech innovations, civic welfare, health & sanitation, and circular economic updates across our society.
        </p>

        {/* Search Bar */}
        <div className="wn-search-wrapper">
          <Search size={18} className="wn-search-icon" />
          <input
            type="text"
            className="wn-search-input"
            placeholder="Search daily news by keyword, topic, or field..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Society Field Category Tabs */}
        <div className="wn-categories-bar">
          {CATEGORIES.map(cat => {
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                className={`wn-cat-btn ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {IconComp && <IconComp size={15} />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      <main className="container" style={{ maxWidth: "1200px" }}>

        {/* Featured Story Spotlight (Only when not filtering with specific text) */}
        {!searchTerm && selectedCategory === "all" && featuredItem && (
          <section className="animate-fade-in" style={{ marginBottom: "50px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Sparkles size={18} color="#009ee3" />
              <span style={{ fontSize: "0.85rem", fontWeight: "800", textTransform: "uppercase", color: "#009ee3", letterSpacing: "1px" }}>
                TODAY'S SPOTLIGHT STORY
              </span>
            </div>

            <div className="wn-featured-card">
              <div className="wn-featured-img-wrap">
                <img 
                  src={featuredItem.cover_image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80"} 
                  alt={featuredItem.title} 
                />
                {featuredItem.gallery_images && featuredItem.gallery_images.length > 0 && (
                  <div className="wn-gallery-indicator">
                    <Images size={13} /> {featuredItem.gallery_images.length + 1} Photos
                  </div>
                )}
              </div>
              <div className="wn-featured-content">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <span className={`wn-category-tag ${featuredItem.category || "environment"}`}>
                    {featuredItem.categoryLabel || "Environment"}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--wn-text-muted)", fontWeight: "600" }}>
                    {featuredItem.edition || "Daily Edition"}
                  </span>
                </div>
                <h2 style={{ fontSize: "1.65rem", fontWeight: "900", color: "#0f172a", lineHeight: "1.3", marginBottom: "14px" }}>
                  {featuredItem.title}
                </h2>
                <p style={{ color: "#64748b", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "22px" }}>
                  {featuredItem.summary}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "0.82rem", color: "#64748b" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><User size={14} /> {featuredItem.author || "Editorial Desk"}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Clock size={14} /> {featuredItem.read_time || "4 min"}</span>
                  </div>
                  <Link to={`/daily-news/${featuredItem.id}`} className="wn-read-more" style={{ fontSize: "0.95rem" }}>
                    Read Full Story <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* News Grid */}
        <section>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: "800", color: "#0f172a", display: "flex", alignItems: "center", gap: "10px" }}>
              <Newspaper size={20} color="#009ee3" />
              {selectedCategory === "all" ? "All Daily Bulletins & Reports" : `${CATEGORIES.find(c => c.id === selectedCategory)?.label}`}
              <span style={{ fontSize: "0.9rem", color: "#94a3b8", fontWeight: "600" }}>({filteredNews.length})</span>
            </h2>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "var(--wn-text-muted)" }}>
              <div style={{ width: "40px", height: "40px", border: "4px solid #e0f2fe", borderTopColor: "#009ee3", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
              <p>Loading Daily News Gazette...</p>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          ) : filteredNews.length === 0 ? (
            <div style={{ background: "white", padding: "60px 20px", borderRadius: "24px", textAlign: "center", border: "1px solid var(--wn-border)" }}>
              <Newspaper size={48} color="#94a3b8" style={{ margin: "0 auto 16px" }} />
              <h3 style={{ fontSize: "1.2rem", color: "#334155", marginBottom: "8px" }}>No Articles Found</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", maxWidth: "450px", margin: "0 auto 20px" }}>
                No news articles match your current search or category filter. Try clearing filters.
              </p>
              <button 
                onClick={() => { setSelectedCategory("all"); setSearchTerm(""); }}
                style={{ background: "#009ee3", color: "white", border: "none", padding: "10px 20px", borderRadius: "12px", fontWeight: "700", cursor: "pointer" }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="wn-news-grid">
              {filteredNews.map((news) => (
                <Link key={news.id} to={`/daily-news/${news.id}`} className="wn-card">
                  <div className="wn-card-img-wrap">
                    <img 
                      src={news.cover_image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"} 
                      alt={news.title} 
                      loading="lazy"
                    />
                    {news.gallery_images && news.gallery_images.length > 0 && (
                      <div className="wn-gallery-indicator">
                        <Images size={12} /> {news.gallery_images.length + 1}
                      </div>
                    )}
                  </div>
                  <div className="wn-card-body">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span className={`wn-category-tag ${news.category || "environment"}`}>
                        {news.categoryLabel || news.category || "General"}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "700" }}>
                        {news.edition || "Daily Edition"}
                      </span>
                    </div>

                    <h3 className="wn-card-title">{news.title}</h3>
                    <p className="wn-card-summary">{news.summary}</p>

                    <div className="wn-card-footer">
                      <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#64748b" }}>
                        <Calendar size={13} />
                        <span>{news.date}</span>
                      </div>
                      <span className="wn-read-more">
                        Read Story <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </main>

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </div>
  );
};

export default DailyNews;
