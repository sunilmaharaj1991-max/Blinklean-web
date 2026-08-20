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
  Sparkles,
  Layers,
  Leaf,
  Zap,
  Building,
  HeartPulse,
  Globe,
  TrendingUp
} from "lucide-react";
import "../assets/css/weekly-news.css";

export const CATEGORIES = [
  { id: "all", label: "All News", icon: <Layers size={15} />, colorClass: "all" },
  { id: "environment", label: "Environment & Ecology", icon: <Leaf size={15} />, colorClass: "environment" },
  { id: "tech", label: "Clean-Tech & Innovation", icon: <Zap size={15} />, colorClass: "tech" },
  { id: "society", label: "Society & Civic Welfare", icon: <Building size={15} />, colorClass: "society" },
  { id: "health", label: "Health & Sanitation", icon: <HeartPulse size={15} />, colorClass: "health" },
  { id: "urban", label: "Urban Living & Sustainability", icon: <Globe size={15} />, colorClass: "urban" },
  { id: "economy", label: "Policy & Green Economy", icon: <TrendingUp size={15} />, colorClass: "economy" }
];

export const DEFAULT_WEEKLY_NEWS = [
  {
    id: "news-urban-forestry-2026",
    title: "Karnataka Launches Urban Micro-Forestry & Lake Rejuvenation Mission",
    category: "environment",
    categoryLabel: "Environment & Ecology",
    edition: "Week 3, August 2026",
    date: "August 18, 2026",
    author: "Blinklean Environmental Desk",
    read_time: "4 min read",
    summary: "State authorities and green volunteer networks collaborate to transform 40+ peri-urban degraded lake catchments into self-sustaining biodiversity hubs.",
    content: `In a landmark public-private civic initiative, urban municipal bodies and community environmental groups have inaugurated the 2026 Urban Micro-Forestry Mission across key metropolitan catchments.\n\nThe project incorporates Japanese Miyawaki dense-planting techniques with indigenous flora like Neem, Jamun, Peepal, and Honge. Automated water monitoring sensors and decentralized wastewater filtration systems are being installed along lake peripheries to intercept raw surface runoffs before they enter waterbodies.\n\nOver 25,000 citizens and environmental youth clubs registered during the opening weekend to adopt local green corridors. The initiative aims to reduce ambient summer heat by up to 2.5°C in high-density urban clusters over the next three years while restoring groundwater recharge aquifers.`,
    cover_image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
    ],
    key_takeaways: [
      "40+ peri-urban lake beds undergoing scientific bio-remediation.",
      "25,000+ registered weekend volunteers participating in micro-forestry.",
      "Deployment of real-time water quality sensors and native flora plantations."
    ],
    tags: ["MicroForestry", "LakeRejuvenation", "Ecology", "CommunityDrives"],
    is_featured: true
  },
  {
    id: "news-cleantech-recycling-2026",
    title: "AI-Powered Material Recovery & Doorstep Scrap Recycling Sweeps Neighborhoods",
    category: "tech",
    categoryLabel: "Clean-Tech & Innovation",
    edition: "Week 3, August 2026",
    date: "August 16, 2026",
    author: "CleanTech Intelligence Group",
    read_time: "5 min read",
    summary: "How smart digital scheduling, instant electronic spot payments, and optical scrap sorting are transforming household recycling rates by 300%.",
    content: `Household scrap collection is undergoing a massive digital transformation. Modern on-demand platforms are equipping scrap collection vehicles with calibrated digital load-cells and computer-vision sorting assistance.\n\nBy providing doorstep pickups for paper, electronics, metals, and polymers with transparent per-kilogram rates, households no longer discard valuable recyclable materials into mixed garbage. Verified circular economy recyclers receive pre-sorted raw batches with unbroken traceability chains.\n\nPreliminary quarterly audits demonstrate a 300% surge in e-waste and paper recovery from apartment complexes, preventing hundreds of metric tons of toxic plastics and battery compounds from ending up in landfills.`,
    cover_image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=800&q=80"
    ],
    key_takeaways: [
      "Digital load-cell scales and automated sorting increase circular scrap recovery.",
      "Direct instant spot payouts encourage widespread residential participation.",
      "Zero landfill diversion rate achieved for clean secondary recyclables."
    ],
    tags: ["CleanTech", "RecyclingLoops", "SmartSorting", "CircularEconomy"],
    is_featured: false
  },
  {
    id: "news-resident-welfare-2026",
    title: "Resident Welfare Associations Spearhead Zero-Waste Gated Communities",
    category: "society",
    categoryLabel: "Society & Civic Welfare",
    edition: "Week 2, August 2026",
    date: "August 12, 2026",
    author: "Civic Action Chronicle",
    read_time: "3 min read",
    summary: "Over 120 residential societies implement decentralized composting and source segregation mandates, achieving self-reliant waste processing.",
    content: `Resident Welfare Associations (RWAs) across urban centers are taking direct ownership of their environmental footprint. By establishing on-premise organic waste aerobic composters and partnering with clean-tech recyclers, neighborhoods are processing up to 90% of their daily waste on-site.\n\nOrganic compost generated from household vegetable scraps is redistributed to maintain community gardens, terrace farms, and public parks. RWAs also organize monthly green flea markets where residents exchange pre-loved books, toys, and apparel, promoting a sustainable reuse mindset.`,
    cover_image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
    ],
    key_takeaways: [
      "120+ residential complexes achieve 90% localized waste processing.",
      "Decentralized composting generates organic fertilizer for green spaces.",
      "Community barter circles encourage mindful circular consumption."
    ],
    tags: ["CivicAction", "RWA", "ZeroWaste", "CommunityLiving"],
    is_featured: false
  },
  {
    id: "news-doorstep-sanitation-2026",
    title: "Eco-Friendly Doorstep Sanitation & Waterless Detailing Gains Widespread Adoption",
    category: "health",
    categoryLabel: "Health & Sanitation",
    edition: "Week 2, August 2026",
    date: "August 09, 2026",
    author: "Public Health & Sanitation Review",
    read_time: "4 min read",
    summary: "Plant-derived surfactants and plant-based steam cleaners replace hazardous household chemicals, improving indoor air quality and worker safety.",
    content: `Modern household cleaning is witnessing a rapid shift toward non-toxic, bio-enzymatic cleaning agents. Traditional chlorine, ammonia, and synthetic fragrances often leave behind volatile organic compounds (VOCs) that irritate respiratory tracts and degrade indoor air quality.\n\nProfessional doorstep cleaning platforms are pioneering 100% biodegradable formulations combined with high-temperature steam extraction. Furthermore, waterless vehicle detailing solutions save up to 150 liters of clean potable water per car wash, preventing soapy runoff from entering urban stormwater drains.`,
    cover_image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80"
    ],
    key_takeaways: [
      "Bio-enzymatic cleaners eliminate toxic indoor VOC pollution.",
      "Waterless detailing preserves over 150 liters of drinking water per vehicle.",
      "Trained cleaning professionals operate with protective eco-grade protocols."
    ],
    tags: ["EcoSanitation", "WaterConservation", "IndoorHealth", "BioClean"],
    is_featured: false
  },
  {
    id: "news-circular-economy-policy-2026",
    title: "New Green Credits Policy Incentivizes Residential Recycling and Solar Transition",
    category: "economy",
    categoryLabel: "Policy & Green Economy",
    edition: "Week 1, August 2026",
    date: "August 04, 2026",
    author: "National Policy & Sustainability Bureau",
    read_time: "4 min read",
    summary: "Government rollout of digital green credit certificates provides tax rebates and utility discounts for verified household carbon reductions.",
    content: `The Ministry of Environment has expanded its Digital Green Credits framework, allowing individual households and residential societies to earn measurable green credits through verified recycling, rainwater harvesting, and rooftop solar adoption.\n\nClean-tech service aggregators are integrating APIs with the national portal, allowing consumers to convert their routine scrap recycling logs into redeemable utility vouchers and property tax deductions. Financial analysts predict this policy will catalyze over ₹2,400 crore in private household green investments by the end of the fiscal year.`,
    cover_image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
    ],
    key_takeaways: [
      "Digital Green Credits integrated with municipal utility portals.",
      "Households earn redeemable points for verified scrap recycling.",
      "Projected to mobilize ₹2,400 crore in decentralized sustainability investments."
    ],
    tags: ["GreenCredits", "Policy2026", "SolarTransition", "CircularEconomy"],
    is_featured: false
  }
];

const WeeklyNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyNews = async () => {
      try {
        setLoading(true);
        const newsQuery = query(collection(db, "weekly_news"), orderBy("created_at", "desc"));
        const snap = await getDocs(newsQuery);
        const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (fetched.length > 0) {
          // Combine fetched news with default seeds if count is low
          const combined = [...fetched];
          DEFAULT_WEEKLY_NEWS.forEach(seed => {
            if (!combined.some(n => n.id === seed.id)) {
              combined.push(seed);
            }
          });
          setNewsList(combined);
        } else {
          setNewsList(DEFAULT_WEEKLY_NEWS);
        }
      } catch (err) {
        console.warn("Could not fetch weekly news from Firestore, using curated seeds:", err);
        setNewsList(DEFAULT_WEEKLY_NEWS);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyNews();
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
          <Sparkles size={16} /> Weekly Society & Clean-Tech Gazette
        </div>
        <h1>
          Weekly News & <span>Civic Dispatch</span>
        </h1>
        <p>
          Curated weekly insights covering ecological missions, clean-tech innovations, civic welfare, health & sanitation, and circular economic updates across all fields of our society.
        </p>

        {/* Search Bar */}
        <div className="wn-search-wrapper">
          <Search size={18} className="wn-search-icon" />
          <input
            type="text"
            className="wn-search-input"
            placeholder="Search news by keyword, topic, or field..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Society Field Category Tabs */}
        <div className="wn-categories-bar">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`wn-cat-btn ${selectedCategory === cat.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="container" style={{ maxWidth: "1200px" }}>

        {/* Featured Story Spotlight (Only when not filtering with specific text) */}
        {!searchTerm && selectedCategory === "all" && featuredItem && (
          <section className="animate-fade-in" style={{ marginBottom: "50px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Sparkles size={18} color="#009ee3" />
              <span style={{ fontSize: "0.85rem", fontWeight: "800", textTransform: "uppercase", color: "#009ee3", letterSpacing: "1px" }}>
                SPOTLIGHT STORY OF THE WEEK
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
                    {featuredItem.edition || "Weekly Edition"}
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
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><User size={14} /> {featuredItem.author || "Editorial"}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Clock size={14} /> {featuredItem.read_time || "4 min"}</span>
                  </div>
                  <Link to={`/weekly-news/${featuredItem.id}`} className="wn-read-more" style={{ fontSize: "0.95rem" }}>
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
              {selectedCategory === "all" ? "All Weekly Bulletins" : `${CATEGORIES.find(c => c.id === selectedCategory)?.label}`}
              <span style={{ fontSize: "0.9rem", color: "#94a3b8", fontWeight: "600" }}>({filteredNews.length})</span>
            </h2>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px", color: "var(--wn-text-muted)" }}>
              <div style={{ width: "40px", height: "40px", border: "4px solid #e0f2fe", borderTopColor: "#009ee3", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
              <p>Loading Weekly News Gazette...</p>
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
                <Link key={news.id} to={`/weekly-news/${news.id}`} className="wn-card">
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
                        {news.edition || "Weekly"}
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

export default WeeklyNews;
