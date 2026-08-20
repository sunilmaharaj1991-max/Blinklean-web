import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs, limit, query, orderBy } from "firebase/firestore";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import { DEFAULT_WEEKLY_NEWS } from "./WeeklyNews";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  CheckCircle2, 
  Images, 
  X, 
  ExternalLink,
  MessageCircle,
  Copy,
  BookOpen,
  ArrowRight
} from "lucide-react";
import "../assets/css/weekly-news.css";

const NewsArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(null);
  const [copied, setCopied] = useState(false);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        // 1. Try Firestore
        const docRef = doc(db, "weekly_news", id);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setArticle({ id: snap.id, ...snap.data() });
        } else {
          // 2. Fall back to default seeds
          const found = DEFAULT_WEEKLY_NEWS.find(n => n.id === id);
          setArticle(found || null);
        }

        // Fetch related articles
        try {
          const relQuery = query(collection(db, "weekly_news"), orderBy("created_at", "desc"), limit(3));
          const relSnap = await getDocs(relQuery);
          const list = relSnap.docs.map(d => ({ id: d.id, ...d.data() })).filter(d => d.id !== id);
          if (list.length > 0) {
            setRelatedNews(list);
          } else {
            setRelatedNews(DEFAULT_WEEKLY_NEWS.filter(n => n.id !== id).slice(0, 3));
          }
        } catch {
          setRelatedNews(DEFAULT_WEEKLY_NEWS.filter(n => n.id !== id).slice(0, 3));
        }

      } catch (err) {
        console.warn("Failed to fetch article from Firestore, falling back to local dataset.", err);
        const found = DEFAULT_WEEKLY_NEWS.find(n => n.id === id);
        setArticle(found || null);
        setRelatedNews(DEFAULT_WEEKLY_NEWS.filter(n => n.id !== id).slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleShareWhatsApp = () => {
    const text = `📰 *${article?.title}*\n\nRead this weekly news bulletin on Blinklean:\n${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="weekly-news-wrapper">
        <Header />
        <div className="container" style={{ padding: "140px 20px 80px", textAlign: "center" }}>
          <div style={{ width: "45px", height: "45px", border: "4px solid #e0f2fe", borderTopColor: "#009ee3", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 20px" }} />
          <p style={{ color: "var(--wn-text-muted)", fontWeight: "600" }}>Loading News Story...</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="weekly-news-wrapper">
        <Header />
        <div className="container animate-fade-in" style={{ padding: "140px 20px 80px", textAlign: "center" }}>
          <BookOpen size={52} style={{ color: "var(--wn-text-muted)", marginBottom: "20px" }} />
          <h2 style={{ fontSize: "1.8rem", color: "#0f172a", marginBottom: "10px" }}>News Article Not Found</h2>
          <p style={{ color: "#64748b", maxWidth: "500px", margin: "0 auto 30px" }}>
            The weekly news article you requested might have been archived or removed.
          </p>
          <Link to="/weekly-news" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#009ee3", color: "white", textDecoration: "none", padding: "12px 24px", borderRadius: "14px", fontWeight: "700" }}>
            <ArrowLeft size={16} /> Back to Weekly News Hub
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = [
    ...(article.cover_image ? [{ url: article.cover_image, caption: "Main Feature Cover" }] : []),
    ...(article.gallery_images && Array.isArray(article.gallery_images) 
        ? article.gallery_images.map((img, idx) => ({ url: typeof img === "string" ? img : img.url, caption: `Field Image #${idx + 1}` })) 
        : [])
  ];

  return (
    <div className="weekly-news-wrapper">
      <Header />

      <main className="wn-article-container animate-fade-in">
        
        {/* Back Link */}
        <div style={{ marginBottom: "25px" }}>
          <Link 
            to="/weekly-news" 
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "8px", 
              color: "#009ee3", 
              textDecoration: "none", 
              fontWeight: "700",
              fontSize: "0.95rem",
              background: "white",
              padding: "8px 16px",
              borderRadius: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)"
            }}
          >
            <ArrowLeft size={16} /> Back to Weekly News Gazette
          </Link>
        </div>

        {/* Main Article Card */}
        <article className="wn-article-card">
          
          <header className="wn-article-header">
            {/* Category & Edition Badges */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
              <span className={`wn-category-tag ${article.category || "environment"}`}>
                {article.categoryLabel || article.category || "Society Bulletin"}
              </span>
              <span style={{ background: "#f1f5f9", color: "#475569", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "800" }}>
                {article.edition || "Weekly Edition"}
              </span>
            </div>

            {/* Article Headline */}
            <h1>{article.title}</h1>

            {/* Meta Information Bar */}
            <div className="wn-meta-bar">
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <User size={15} color="#009ee3" />
                <span>By <strong>{article.author || "Blinklean News Bureau"}</strong></span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Calendar size={15} color="#009ee3" />
                <span>{article.date || "August 2026"}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock size={15} color="#009ee3" />
                <span>{article.read_time || "4 min read"}</span>
              </div>
            </div>
          </header>

          {/* Lead Summary */}
          {article.summary && (
            <p style={{ fontSize: "1.18rem", color: "#334155", lineHeight: "1.65", fontWeight: "500", fontStyle: "italic", marginBottom: "30px" }}>
              "{article.summary}"
            </p>
          )}

          {/* Cover Image */}
          {article.cover_image && (
            <div className="wn-cover-box" onClick={() => setActiveImage(article.cover_image)} style={{ cursor: "zoom-in" }}>
              <img src={article.cover_image} alt={article.title} />
            </div>
          )}

          {/* Key Highlights / Takeaways Card */}
          {article.key_takeaways && Array.isArray(article.key_takeaways) && article.key_takeaways.length > 0 && (
            <div className="wn-highlights-box">
              <h3>
                <CheckCircle2 size={18} /> Key Takeaways & Society Highlights
              </h3>
              <ul className="wn-highlights-list">
                {article.key_takeaways.map((item, idx) => (
                  <li key={idx}>
                    <span>●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Body Content */}
          <div className="wn-body-content">
            {article.content ? (
              article.content.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>Full article details are being updated by the editorial desk.</p>
            )}
          </div>

          {/* Relevant Images Gallery Section */}
          {article.gallery_images && Array.isArray(article.gallery_images) && article.gallery_images.length > 0 && (
            <section className="wn-gallery-section">
              <h3 className="wn-gallery-title">
                <Images size={20} color="#009ee3" /> Relevant Field Images & Visual Coverage ({article.gallery_images.length})
              </h3>
              <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "-10px 0 20px" }}>
                Click any photo to view in high resolution.
              </p>

              <div className="wn-gallery-grid">
                {article.gallery_images.map((imgUrl, i) => (
                  <div key={i} className="wn-gallery-item" onClick={() => setActiveImage(imgUrl)}>
                    <img src={typeof imgUrl === "string" ? imgUrl : imgUrl.url} alt={`Relevant News Visual ${i + 1}`} />
                    <div className="wn-gallery-overlay">
                      <span>Click to Enlarge</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tags & Social Sharing Bar */}
          <div className="wn-share-bar">
            <div className="wn-tags-wrap">
              {article.tags && Array.isArray(article.tags) && article.tags.map((tag, idx) => (
                <span key={idx} className="wn-tag">#{tag}</span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <button onClick={handleShareWhatsApp} className="wn-share-btn" style={{ color: "#16a34a", borderColor: "#bbf7d0", background: "#f0fdf4" }}>
                <MessageCircle size={15} /> Share on WhatsApp
              </button>
              <button onClick={handleCopyLink} className="wn-share-btn">
                <Copy size={15} /> {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

        </article>

        {/* Related Weekly Stories */}
        {relatedNews.length > 0 && (
          <section style={{ marginTop: "60px" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", marginBottom: "20px" }}>
              More from This Week's Society Gazette
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {relatedNews.map((rel) => (
                <Link 
                  key={rel.id} 
                  to={`/weekly-news/${rel.id}`} 
                  style={{ 
                    background: "white", 
                    borderRadius: "16px", 
                    padding: "18px", 
                    border: "1px solid #e2e8f0", 
                    textDecoration: "none", 
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                    transition: "transform 0.2s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "none"}
                >
                  <div>
                    <span className={`wn-category-tag ${rel.category || "environment"}`} style={{ fontSize: "0.68rem" }}>
                      {rel.categoryLabel || rel.category || "Society"}
                    </span>
                    <h4 style={{ margin: "10px 0 8px", fontSize: "0.95rem", fontWeight: "800", color: "#0f172a", lineHeight: "1.4" }}>
                      {rel.title}
                    </h4>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.78rem", color: "#64748b", marginTop: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "10px" }}>
                    <span>{rel.date}</span>
                    <span style={{ color: "#009ee3", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}>Read <ArrowRight size={12} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* High-Resolution Lightbox Modal */}
      {activeImage && (
        <div className="wn-lightbox" onClick={() => setActiveImage(null)}>
          <div className="wn-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="wn-lightbox-close" onClick={() => setActiveImage(null)}>
              <X size={20} />
            </button>
            <img src={typeof activeImage === "string" ? activeImage : activeImage.url} alt="Enlarged Visual" />
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
      <FloatingWhatsApp />
    </div>
  );
};

export default NewsArticleDetails;
