import React, { useState, useEffect, useCallback } from "react";
import { auth, db, storage } from "../firebase";
import { collection, getDocs, getDoc, doc, query, orderBy, updateDoc, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";
import { 
  Users, 
  Package, 
  Handshake, 
  Clock, 
  RefreshCw, 
  LogOut, 
  AlertCircle, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  BookOpen,
  PlusCircle,
  UploadCloud,
  Trash2,
  Eye,
  Download,
  ExternalLink,
  MessageCircle,
  Search,
  Image as ImageIcon,
  X,
  Newspaper,
  Sparkles,
  Images,
  CheckCircle2,
  FileText,
  Tag,
  Share2,
  Globe,
  Leaf,
  Zap,
  Building,
  HeartPulse,
  TrendingUp,
  Layers,
  Plus,
  ShieldCheck,
  Activity,
  ArrowUpRight,
  Filter,
  Check,
  SlidersHorizontal,
  ChevronRight,
  LogIn
} from "lucide-react";
import "../assets/css/admin-premium.css";

const STATUS_COLORS = {
  PENDING_APPROVAL: { bg: "#fef3c7", color: "#d97706", border: "#fde68a", label: "Pending Approval" },
  CONFIRMED:        { bg: "#dcfce7", color: "#16a34a", border: "#bbf7d0", label: "Confirmed" },
  PICKUP_SCHEDULED: { bg: "#e0f2fe", color: "#0284c7", border: "#bae6fd", label: "Pickup Scheduled" },
  COLLECTED:        { bg: "#ede9fe", color: "#7c3aed", border: "#ddd6fe", label: "Collected" },
  COMPLETED:        { bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0", label: "Completed" },
  CANCELLED:        { bg: "#fee2e2", color: "#dc2626", border: "#fecaca", label: "Cancelled" },
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://blinklean-api.onrender.com/api/v1";

const Admin = () => {
  const [users,        setUsers]        = useState([]);
  const [bookings,     setBookings]     = useState([]);
  const [partners,     setPartners]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [confirming,   setConfirming]   = useState(null);
  const [pickupInput,  setPickupInput]  = useState({});
  
  // Active Navigation Tab: 'overview' | 'bookings' | 'green_club' | 'weekly_news' | 'partners' | 'content_studio' | 'users'
  const [activeTab, setActiveTab] = useState("overview");

  // Search & Filter States
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("ALL");
  const [partnerSearch, setPartnerSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // Green Club State
  const [clubRegistrations,       setClubRegistrations]       = useState([]);
  const [clubEvents,              setClubEvents]              = useState([]);
  const [clubBlogs,               setClubBlogs]               = useState([]);
  const [selectedPhotoVolunteer,  setSelectedPhotoVolunteer]  = useState(null);
  const [gcSearchTerm,            setGcSearchTerm]            = useState("");
  const [gcFilterPhotoOnly,       setGcFilterPhotoOnly]       = useState(false);

  // Weekly News State
  const [weeklyNewsList,          setWeeklyNewsList]          = useState([]);
  const [newsTitle,               setNewsTitle]               = useState("");
  const [newsCategory,            setNewsCategory]            = useState("environment");
  const [newsEdition,             setNewsEdition]             = useState("Week 3, August 2026");
  const [newsDate,                setNewsDate]                = useState(new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }));
  const [newsAuthor,              setNewsAuthor]              = useState("Blinklean News Bureau");
  const [newsReadTime,            setNewsReadTime]            = useState("4 min read");
  const [newsSummary,             setNewsSummary]             = useState("");
  const [newsContent,             setNewsContent]             = useState("");
  const [newsCoverFile,           setNewsCoverFile]           = useState(null);
  const [newsCoverUrl,            setNewsCoverUrl]            = useState("");
  const [newsGalleryFiles,        setNewsGalleryFiles]        = useState([]);
  const [newsGalleryUrls,         setNewsGalleryUrls]         = useState("");
  const [newsTags,                setNewsTags]                = useState("CleanTech, Ecology, Society");
  const [newsTakeaways,           setNewsTakeaways]           = useState("");
  const [newsIsFeatured,          setNewsIsFeatured]          = useState(false);
  const [newsUploading,           setNewsUploading]           = useState(false);
  const [newsSearchTerm,          setNewsSearchTerm]          = useState("");
  const [newsCategoryFilter,      setNewsCategoryFilter]      = useState("all");
  const [selectedNewsPreview,     setSelectedNewsPreview]     = useState(null);
  const [newsStudioTab,           setNewsStudioTab]           = useState("publish"); // 'publish' | 'manage'

  // Blog Upload State
  const [blogTitle,     setBlogTitle]     = useState("");
  const [blogSummary,   setBlogSummary]   = useState("");
  const [blogContent,   setBlogContent]   = useState("");
  const [blogDate,      setBlogDate]      = useState("");
  const [blogAuthor,    setBlogAuthor]    = useState("");
  const [blogImageFile, setBlogImageFile] = useState(null);
  const [blogImageUrl,  setBlogImageUrl]  = useState("");
  const [blogUploading, setBlogUploading] = useState(false);

  // Event Upload State
  const [eventTitle,       setEventTitle]       = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate,        setEventDate]        = useState("");
  const [eventLocation,    setEventLocation]    = useState("");
  const [eventTag,         setEventTag]         = useState("");
  const [eventImageFile,   setEventImageFile]   = useState(null);
  const [eventImageUrl,    setEventImageUrl]    = useState("");
  const [eventUploading,   setEventUploading]   = useState(false);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // 1. Fetch Bookings
      try {
        const bookQuery = query(collection(db, "scrap_bookings"), orderBy("created_at", "desc"));
        const bookSnap  = await getDocs(bookQuery);
        setBookings(bookSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.warn("Error fetching bookings:", e);
      }

      // 2. Fetch Partners
      try {
        const partQuery = query(collection(db, "partner_registrations"), orderBy("created_at", "desc"));
        const partSnap  = await getDocs(partQuery);
        setPartners(partSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.warn("Error fetching partners:", e);
      }

      // 3. Fetch Users
      try {
        const userSnap = await getDocs(collection(db, "users"));
        setUsers(userSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.warn("Error fetching users:", e);
      }

      // 4. Fetch Green Club Registrations
      try {
        const gcRegQuery = query(collection(db, "green_club_registrations"), orderBy("created_at", "desc"));
        const gcRegSnap = await getDocs(gcRegQuery);
        setClubRegistrations(gcRegSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.warn("Error fetching Green Club registrations:", e);
      }

      // 5. Fetch Green Club Events
      try {
        const gcEventQuery = query(collection(db, "green_club_events"), orderBy("created_at", "desc"));
        const gcEventSnap = await getDocs(gcEventQuery);
        setClubEvents(gcEventSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.warn("Error fetching Green Club events:", e);
      }

      // 6. Fetch Green Club Blogs
      try {
        const gcBlogQuery = query(collection(db, "green_club_blogs"), orderBy("created_at", "desc"));
        const gcBlogSnap = await getDocs(gcBlogQuery);
        setClubBlogs(gcBlogSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.warn("Error fetching Green Club blogs:", e);
      }

      // 7. Fetch Weekly News
      try {
        const newsQuery = query(collection(db, "weekly_news"), orderBy("created_at", "desc"));
        const newsSnap = await getDocs(newsQuery);
        setWeeklyNewsList(newsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.warn("Error fetching Weekly News:", e);
      }

    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setLoading(false);
        setIsAuthorized(false);
        return;
      }
      try {
        const isAdminEmail = (
          user.email === "sunilmaharaj1991@gmail.com" || 
          user.email === "jeevithgowdasr@gmail.com" || 
          user.email === "rohithlakshman1@gmail.com" || 
          user.email === "sushmitha157@gmail.com"
        );
        
        let role = "";
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            role = userDoc.data().role || "";
          }
        } catch (docErr) {
          console.warn("Could not read user doc:", docErr);
        }

        if (isAdminEmail || role === "admin") {
          setIsAuthorized(true);
          fetchData();
        } else {
          setIsAuthorized(false);
          setLoading(false);
        }
      } catch (err) {
        console.error("Admin check error:", err);
        setIsAuthorized(false);
        setLoading(false);
      }
    });
    return () => unsub();
  }, [fetchData]);

  const handleConfirm = async (bookingId) => {
    const timing = pickupInput[bookingId];
    if (!timing || !timing.trim()) {
      alert("Please specify a pickup timing slot (e.g., 'Today 3:00 PM - 4:00 PM').");
      return;
    }

    setConfirming(bookingId);
    try {
      const bookingRef = doc(db, "scrap_bookings", bookingId);
      await updateDoc(bookingRef, {
        status: "CONFIRMED",
        pickup_timing: timing.trim()
      });

      fetch(`${API_BASE}/scrap/booking/${bookingId}/confirm`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickupTiming: timing })
      }).catch(err => console.warn("Backend confirmation notify sync:", err));

      alert(`✅ Booking CONFIRMED!\n\nPickup Scheduled Slot: ${timing}`);
      await fetchData();
    } catch (err) {
      alert("Failed to confirm booking.");
      console.error(err);
    } finally {
      setConfirming(null);
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const bookingRef = doc(db, "scrap_bookings", bookingId);
      await updateDoc(bookingRef, { status: newStatus });

      fetch(`${API_BASE}/scrap/booking/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      }).catch(err => console.warn("API Status Sync:", err));

      alert(`Status updated to: ${newStatus}`);
      await fetchData();
    } catch (err) {
      alert("Failed to update status.");
      console.error(err);
    }
  };

  const compressImageToBase64 = (file, maxWidth = 900, maxHeight = 900, quality = 0.8) => {
    return new Promise((resolve) => {
      if (!file) { resolve(""); return; }
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = () => resolve(event.target.result || "");
        img.src = event.target.result;
      };
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
  };

  const uploadImage = async (file, folder) => {
    if (!file) return "";
    try {
      const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (err) {
      console.error("Firebase Storage Upload Error:", err);
      throw new Error("Storage upload failed. Please verify storage permissions or use a direct URL fallback.");
    }
  };

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsSummary.trim() || !newsContent.trim()) {
      alert("Please provide the news headline, summary, and full content.");
      return;
    }

    setNewsUploading(true);
    try {
      let finalCoverUrl = newsCoverUrl.trim();
      if (newsCoverFile) {
        const b64 = await compressImageToBase64(newsCoverFile);
        try {
          finalCoverUrl = await uploadImage(newsCoverFile, "weekly_news");
        } catch {
          finalCoverUrl = b64;
        }
        if (!finalCoverUrl) finalCoverUrl = b64;
      }
      if (!finalCoverUrl) {
        finalCoverUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80";
      }

      const finalGallery = [];
      if (newsGalleryFiles && newsGalleryFiles.length > 0) {
        for (let i = 0; i < newsGalleryFiles.length; i++) {
          const file = newsGalleryFiles[i];
          const b64 = await compressImageToBase64(file);
          let gUrl = "";
          try {
            gUrl = await uploadImage(file, "weekly_news");
          } catch {
            gUrl = b64;
          }
          if (gUrl || b64) finalGallery.push(gUrl || b64);
        }
      }

      if (newsGalleryUrls.trim()) {
        const manualUrls = newsGalleryUrls
          .split(/[\n,]+/)
          .map(u => u.trim())
          .filter(u => u.startsWith("http"));
        finalGallery.push(...manualUrls);
      }

      const takeawaysList = newsTakeaways
        .split("\n")
        .map(t => t.replace(/^[•\-\*\d\.]+\s*/, "").trim())
        .filter(Boolean);

      const tagsList = newsTags
        .split(",")
        .map(t => t.trim().replace(/^#/, ""))
        .filter(Boolean);

      const categoryLabels = {
        environment: "Environment & Ecology",
        tech: "Clean-Tech & Innovation",
        society: "Society & Civic Welfare",
        health: "Health & Sanitation",
        urban: "Urban Living & Sustainability",
        economy: "Policy & Green Economy"
      };

      const payload = {
        title: newsTitle.trim(),
        category: newsCategory,
        categoryLabel: categoryLabels[newsCategory] || "Society News",
        edition: newsEdition.trim() || "Weekly Edition",
        date: newsDate.trim() || new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }),
        author: newsAuthor.trim() || "Blinklean News Bureau",
        read_time: newsReadTime.trim() || "4 min read",
        summary: newsSummary.trim(),
        content: newsContent.trim(),
        cover_image: finalCoverUrl,
        gallery_images: finalGallery,
        key_takeaways: takeawaysList,
        tags: tagsList,
        is_featured: newsIsFeatured,
        created_at: serverTimestamp()
      };

      await addDoc(collection(db, "weekly_news"), payload);
      alert("🎉 Weekly News Bulletin published successfully to live Gazette!");

      setNewsTitle("");
      setNewsSummary("");
      setNewsContent("");
      setNewsCoverFile(null);
      setNewsCoverUrl("");
      setNewsGalleryFiles([]);
      setNewsGalleryUrls("");
      setNewsTakeaways("");
      setNewsIsFeatured(false);
      setNewsStudioTab("manage");

      await fetchData();
    } catch (err) {
      console.error("Failed to publish weekly news:", err);
      alert("Error publishing article: " + err.message);
    } finally {
      setNewsUploading(false);
    }
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setBlogUploading(true);
    try {
      let finalUrl = blogImageUrl;
      if (blogImageFile) {
        try {
          finalUrl = await uploadImage(blogImageFile, "green_club_blogs");
        } catch {
          finalUrl = await compressImageToBase64(blogImageFile);
        }
      }
      
      if (!finalUrl) {
        finalUrl = "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80";
      }

      const payload = {
        title: blogTitle,
        summary: blogSummary,
        content: blogContent,
        date: blogDate || new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" }),
        author: blogAuthor || "Blinklean Green Club",
        image_url: finalUrl,
        created_at: serverTimestamp()
      };

      await addDoc(collection(db, "green_club_blogs"), payload);
      alert("✅ Blog article uploaded successfully!");
      
      setBlogTitle("");
      setBlogSummary("");
      setBlogContent("");
      setBlogDate("");
      setBlogAuthor("");
      setBlogImageFile(null);
      setBlogImageUrl("");
      
      await fetchData();
    } catch (err) {
      console.error("Failed to add blog:", err);
      alert("Error adding blog: " + err.message);
    } finally {
      setBlogUploading(false);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setEventUploading(true);
    try {
      let finalUrl = eventImageUrl;
      if (eventImageFile) {
        try {
          finalUrl = await uploadImage(eventImageFile, "green_club_events");
        } catch {
          finalUrl = await compressImageToBase64(eventImageFile);
        }
      }
      
      if (!finalUrl) {
        finalUrl = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80";
      }

      const payload = {
        title: eventTitle,
        description: eventDescription,
        date: eventDate,
        location: eventLocation,
        tag: eventTag || "Eco-Task",
        image_url: finalUrl,
        created_at: serverTimestamp()
      };

      await addDoc(collection(db, "green_club_events"), payload);
      alert("✅ Weekend task event added successfully!");

      setEventTitle("");
      setEventDescription("");
      setEventDate("");
      setEventLocation("");
      setEventTag("");
      setEventImageFile(null);
      setEventImageUrl("");

      await fetchData();
    } catch (err) {
      console.error("Failed to add event:", err);
      alert("Error adding event: " + err.message);
    } finally {
      setEventUploading(false);
    }
  };

  const handleDeleteDoc = async (collectionName, docId) => {
    if (!window.confirm("Are you sure you want to delete this record? This action cannot be undone.")) return;
    try {
      await deleteDoc(doc(db, collectionName, docId));
      alert("Record deleted successfully!");
      await fetchData();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete document: " + err.message);
    }
  };

  const handleDownloadPhoto = async (photoUrl, userName) => {
    if (!photoUrl) {
      alert("No photo available for this member.");
      return;
    }
    const cleanName = (userName || "volunteer").replace(/[^a-zA-Z0-9_-]/g, "_");
    try {
      if (photoUrl.startsWith("data:")) {
        const link = document.createElement("a");
        link.href = photoUrl;
        link.download = `${cleanName}_green_club_photo.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const res = await fetch(photoUrl);
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `${cleanName}_green_club_photo.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
      }
    } catch (err) {
      console.warn("Direct download fallback:", err);
      window.open(photoUrl, "_blank");
    }
  };

  const formatDate = (ts) => {
    if (!ts) return "N/A";
    try {
      const d = ts?.toDate ? ts.toDate() : new Date(ts);
      if (isNaN(d.getTime())) return typeof ts === "string" ? ts : "N/A";
      return d.toLocaleString("en-IN", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" });
    } catch {
      return "N/A";
    }
  };

  const getCleanPhone = (phone) => {
    if (!phone) return "";
    return String(phone).replace(/[^0-9]/g, "").slice(-10);
  };

  // Filtered dataset utilities
  const filteredBookings = bookings.filter(b => {
    if (bookingStatusFilter !== "ALL" && b.status !== bookingStatusFilter) return false;
    if (!bookingSearch.trim()) return true;
    const q = bookingSearch.toLowerCase();
    return (
      (b.user_name && String(b.user_name).toLowerCase().includes(q)) ||
      (b.phone_number && String(b.phone_number).toLowerCase().includes(q)) ||
      (b.address && String(b.address).toLowerCase().includes(q)) ||
      (b.id && String(b.id).toLowerCase().includes(q))
    );
  });

  const filteredPartners = partners.filter(p => {
    if (!partnerSearch.trim()) return true;
    const q = partnerSearch.toLowerCase();
    return (
      (p.fullName && String(p.fullName).toLowerCase().includes(q)) ||
      (p.phone && String(p.phone).toLowerCase().includes(q)) ||
      (p.serviceType && String(p.serviceType).toLowerCase().includes(q)) ||
      (p.location && String(p.location).toLowerCase().includes(q))
    );
  });

  const filteredClubRegistrations = clubRegistrations.filter(r => {
    const photo = r.photo_url || r.photo_base64 || r.photo;
    const hasPhoto = !!photo && !photo.includes("unsplash.com/photo-1535713875002");
    if (gcFilterPhotoOnly && !hasPhoto) return false;
    
    if (!gcSearchTerm.trim()) return true;
    const q = gcSearchTerm.toLowerCase();
    return (
      (r.user_name && String(r.user_name).toLowerCase().includes(q)) ||
      (r.email && String(r.email).toLowerCase().includes(q)) ||
      (r.phone && String(r.phone).toLowerCase().includes(q)) ||
      (r.event_title && String(r.event_title).toLowerCase().includes(q)) ||
      (r.address && String(r.address).toLowerCase().includes(q))
    );
  });

  const filteredWeeklyNews = weeklyNewsList.filter(n => {
    if (newsCategoryFilter !== "all" && n.category !== newsCategoryFilter) return false;
    if (!newsSearchTerm.trim()) return true;
    const q = newsSearchTerm.toLowerCase();
    return (
      (n.title && String(n.title).toLowerCase().includes(q)) ||
      (n.summary && String(n.summary).toLowerCase().includes(q)) ||
      (n.author && String(n.author).toLowerCase().includes(q)) ||
      (n.edition && String(n.edition).toLowerCase().includes(q)) ||
      (n.categoryLabel && String(n.categoryLabel).toLowerCase().includes(q))
    );
  });

  const filteredUsers = users.filter(u => {
    if (!userSearch.trim()) return true;
    const q = userSearch.toLowerCase();
    return (
      (u.name && String(u.name).toLowerCase().includes(q)) ||
      (u.email && String(u.email).toLowerCase().includes(q)) ||
      (u.phone && String(u.phone).toLowerCase().includes(q)) ||
      (u.role && String(u.role).toLowerCase().includes(q))
    );
  });

  const photoCount = clubRegistrations.filter(r => {
    const photo = r.photo_url || r.photo_base64 || r.photo;
    return !!photo && !photo.includes("unsplash.com/photo-1535713875002");
  }).length;

  const pendingCount = bookings.filter(b => b.status === "PENDING_APPROVAL").length;

  // Render Loading State
  if (loading) {
    return (
      <div style={{ display:"flex", height:"100vh", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"16px", background:"#f8fafc" }}>
        <div style={{ width: "48px", height: "48px", border: "4px solid #bae6fd", borderTopColor: "#009ee3", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color:"#0369a1", fontWeight:700, fontSize:"1.05rem" }}>Synchronizing Blinklean Command Center...</p>
        <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Render Access Denied or Login Required State
  if (!isAuthorized) {
    return (
      <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f1f5f9", padding:"20px" }}>
        <div style={{ background:"white", padding:"50px 40px", borderRadius:"28px", textAlign:"center", maxWidth:"480px", width:"100%", boxShadow:"0 20px 60px rgba(0,0,0,0.08)", border:"1px solid #e2e8f0" }}>
          <div style={{ width:"68px", height:"68px", borderRadius:"20px", background:"#fee2e2", color:"#ef4444", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
            <AlertCircle size={36} />
          </div>
          <h2 style={{ color:"#0f172a", margin:"10px 0 6px", fontSize:"1.6rem", fontWeight:"900" }}>Admin Access Required</h2>
          <p style={{ color:"#64748b", marginBottom:"28px", fontSize:"0.95rem", lineHeight:"1.5" }}>
            Please log in with an authorized Blinklean administrator account to access the control panel.
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            <button 
              style={{ width:"100%", padding:"14px", background:"#009ee3", color:"white", border:"none", borderRadius:"14px", cursor:"pointer", fontWeight:"800", fontSize:"0.95rem", boxShadow:"0 4px 14px rgba(0, 158, 227, 0.3)", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }} 
              onClick={() => navigate("/login")}
            >
              <LogIn size={18} /> Sign In as Admin
            </button>
            <button 
              style={{ width:"100%", padding:"12px", background:"#f1f5f9", color:"#475569", border:"none", borderRadius:"14px", cursor:"pointer", fontWeight:"700", fontSize:"0.9rem" }} 
              onClick={() => navigate("/")}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      
      {/* 1. TOP COMMAND HEADER */}
      <header className="adm-header">
        <div className="adm-header-inner">
          <div>
            <div className="adm-brand-tag">
              <span className="adm-pulse-dot" /> Live Firebase Production
            </div>
            <h1 className="adm-title">Blinklean Command Studio</h1>
            <p style={{ color:"rgba(255,255,255,0.85)", margin:0, fontSize:"0.85rem", fontWeight:"600", display:"flex", alignItems:"center", gap:"6px" }}>
              <ShieldCheck size={15} /> Super Admin: <strong>{auth.currentUser?.email}</strong>
            </p>
          </div>

          <div className="adm-header-actions">
            <button onClick={fetchData} className="adm-btn-light" title="Refresh Live Records">
              <RefreshCw size={16} /> Sync Database
            </button>
            <a href="/" target="_blank" rel="noopener noreferrer" className="adm-btn-ghost">
              <Globe size={16} /> Public Website ↗
            </a>
            <button onClick={() => auth.signOut().then(() => navigate("/login"))} className="adm-btn-ghost" style={{ background:"rgba(239, 68, 68, 0.25)", borderColor:"rgba(239, 68, 68, 0.4)" }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* 2. MODERN TAB NAVIGATION BAR */}
      <nav className="adm-nav-bar">
        <div className="adm-nav-inner">
          <button 
            className={`adm-tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            <Activity size={16} />
            <span>Dashboard Overview</span>
          </button>

          <button 
            className={`adm-tab-btn ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <Package size={16} />
            <span>Scrap Pickups</span>
            <span className={`adm-tab-badge ${pendingCount > 0 ? "warning" : ""}`}>
              {bookings.length} {pendingCount > 0 ? `(${pendingCount} new)` : ""}
            </span>
          </button>

          <button 
            className={`adm-tab-btn ${activeTab === "green_club" ? "active" : ""}`}
            onClick={() => setActiveTab("green_club")}
          >
            <Leaf size={16} />
            <span>Green Club Volunteers</span>
            <span className="adm-tab-badge">{clubRegistrations.length}</span>
          </button>

          <button 
            className={`adm-tab-btn ${activeTab === "weekly_news" ? "active" : ""}`}
            onClick={() => setActiveTab("weekly_news")}
          >
            <Newspaper size={16} />
            <span>Weekly News Gazette</span>
            <span className="adm-tab-badge">{weeklyNewsList.length}</span>
          </button>

          <button 
            className={`adm-tab-btn ${activeTab === "partners" ? "active" : ""}`}
            onClick={() => setActiveTab("partners")}
          >
            <Handshake size={16} />
            <span>Partners</span>
            <span className="adm-tab-badge">{partners.length}</span>
          </button>

          <button 
            className={`adm-tab-btn ${activeTab === "content_studio" ? "active" : ""}`}
            onClick={() => setActiveTab("content_studio")}
          >
            <Calendar size={16} />
            <span>Weekend Tasks & Blogs</span>
            <span className="adm-tab-badge">{clubEvents.length + clubBlogs.length}</span>
          </button>

          <button 
            className={`adm-tab-btn ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <Users size={16} />
            <span>Users Directory</span>
            <span className="adm-tab-badge">{users.length}</span>
          </button>
        </div>
      </nav>

      {/* 3. MAIN DASHBOARD CONTENT AREA */}
      <main className="adm-container animate-fade-in">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <section>
            {/* Hero Banner */}
            <div className="adm-hero-banner">
              <div>
                <span style={{ display:"inline-flex", alignItems:"center", gap:"6px", background:"rgba(56, 189, 248, 0.15)", color:"#38bdf8", padding:"4px 12px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:"800", textTransform:"uppercase" }}>
                  <Sparkles size={14} /> Operations Snapshot
                </span>
                <h2 style={{ fontSize:"1.65rem", fontWeight:"900", margin:"10px 0 6px", color:"white" }}>
                  Blinklean Unified Control Center
                </h2>
                <p style={{ color:"#94a3b8", fontSize:"0.9rem", margin:0, maxWidth:"600px" }}>
                  Real-time synchronization for doorstep scrap requests, green club registrations with direct member photo inspection, and weekly society gazette publications.
                </p>
              </div>

              <div className="adm-hero-stats">
                <div className="adm-hero-stat-item">
                  <span className="val">{bookings.length}</span>
                  <span className="lbl">Total Pickups</span>
                </div>
                <div className="adm-hero-stat-item">
                  <span className="val" style={{ color:"#4ade80" }}>{clubRegistrations.length}</span>
                  <span className="lbl">Volunteers</span>
                </div>
                <div className="adm-hero-stat-item">
                  <span className="val" style={{ color:"#a78bfa" }}>{weeklyNewsList.length}</span>
                  <span className="lbl">Gazette Stories</span>
                </div>
              </div>
            </div>

            {/* 8 Glowing Metric Tiles */}
            <div className="adm-stats-grid">
              {[
                { label:"Total Users", value:users.length, color:"#009ee3", bg:"#e0f2fe", icon:<Users size={22} />, tab:"users" },
                { label:"Scrap Bookings", value:bookings.length, color:"#10b981", bg:"#dcfce7", icon:<Package size={22} />, tab:"bookings" },
                { label:"Pending Pickups", value:pendingCount, color:"#f59e0b", bg:"#fef3c7", icon:<Clock size={22} />, tab:"bookings" },
                { label:"Green Registrations", value:clubRegistrations.length, color:"#059669", bg:"#ecfdf5", icon:<Leaf size={22} />, tab:"green_club" },
                { label:"Uploaded Photos", value:photoCount, color:"#0d9488", bg:"#ccfbf1", icon:<ImageIcon size={22} />, tab:"green_club" },
                { label:"Weekly News", value:weeklyNewsList.length, color:"#0284c7", bg:"#e0f2fe", icon:<Newspaper size={22} />, tab:"weekly_news" },
                { label:"Partner Enrollments", value:partners.length, color:"#8b5cf6", bg:"#ede9fe", icon:<Handshake size={22} />, tab:"partners" },
                { label:"Weekend Tasks", value:clubEvents.length, color:"#ec4899", bg:"#fce7f3", icon:<Calendar size={22} />, tab:"content_studio" },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="adm-stat-card" 
                  onClick={() => setActiveTab(stat.tab)}
                  style={{ cursor:"pointer" }}
                >
                  <div className="adm-stat-glow" style={{ background: stat.color }} />
                  <div className="adm-stat-header">
                    <p className="adm-stat-label">{stat.label}</p>
                    <div className="adm-stat-icon-wrap" style={{ background: stat.bg, color: stat.color }}>
                      {stat.icon}
                    </div>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                    <span className="adm-stat-number">{stat.value}</span>
                    <span style={{ fontSize:"0.75rem", color: stat.color, fontWeight:"800", display:"flex", alignItems:"center", gap:"2px" }}>
                      Manage <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Matrix */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:"24px", marginBottom:"35px" }}>
              
              {/* Quick Card 1: Pending Scrap Requests */}
              <div className="adm-card" style={{ marginBottom:0 }}>
                <div className="adm-card-header">
                  <h3 className="adm-card-title">
                    <Package size={20} color="#10b981" /> Urgent Scrap Pickups ({pendingCount})
                  </h3>
                  <button onClick={() => setActiveTab("bookings")} className="adm-action-btn view">
                    View All <ChevronRight size={14} />
                  </button>
                </div>
                {bookings.filter(b => b.status === "PENDING_APPROVAL").slice(0, 3).length === 0 ? (
                  <p style={{ color:"#94a3b8", fontSize:"0.9rem", textAlign:"center", padding:"20px 0" }}>
                    🎉 No pending requests awaiting confirmation!
                  </p>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                    {bookings.filter(b => b.status === "PENDING_APPROVAL").slice(0, 3).map(b => (
                      <div key={b.id} style={{ background:"#f8fafc", padding:"14px", borderRadius:"12px", border:"1px solid #e2e8f0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <div>
                          <h4 style={{ margin:"0 0 2px", fontSize:"0.95rem", fontWeight:"800", color:"#0f172a" }}>{b.user_name}</h4>
                          <span style={{ fontSize:"0.78rem", color:"#64748b" }}>{b.phone_number} • {b.address}</span>
                        </div>
                        <span style={{ background:"#fef3c7", color:"#d97706", padding:"4px 10px", borderRadius:"10px", fontSize:"0.72rem", fontWeight:"800" }}>
                          Needs Timing Slot
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Card 2: Recent Green Club Registrations */}
              <div className="adm-card" style={{ marginBottom:0 }}>
                <div className="adm-card-header">
                  <h3 className="adm-card-title">
                    <Leaf size={20} color="#059669" /> Recent Green Volunteers ({clubRegistrations.length})
                  </h3>
                  <button onClick={() => setActiveTab("green_club")} className="adm-action-btn green">
                    Inspect Photos <ChevronRight size={14} />
                  </button>
                </div>
                {clubRegistrations.slice(0, 3).length === 0 ? (
                  <p style={{ color:"#94a3b8", fontSize:"0.9rem", textAlign:"center", padding:"20px 0" }}>No volunteers registered yet.</p>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                    {clubRegistrations.slice(0, 3).map(r => {
                      const photo = r.photo_url || r.photo_base64 || r.photo;
                      return (
                        <div key={r.id} style={{ background:"#f8fafc", padding:"12px 14px", borderRadius:"12px", border:"1px solid #e2e8f0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                            <div className="adm-avatar-thumb" onClick={() => setSelectedPhotoVolunteer(r)}>
                              {photo ? <img src={photo} alt="" /> : <ImageIcon size={18} color="#94a3b8" />}
                            </div>
                            <div>
                              <h4 style={{ margin:"0 0 2px", fontSize:"0.92rem", fontWeight:"800", color:"#0f172a" }}>{r.user_name}</h4>
                              <span style={{ fontSize:"0.75rem", color:"#059669", fontWeight:"600" }}>{r.event_title || "Member"}</span>
                            </div>
                          </div>
                          <button onClick={() => setSelectedPhotoVolunteer(r)} className="adm-action-btn view" style={{ padding:"4px 8px", fontSize:"0.72rem" }}>
                            View Photo
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          </section>
        )}

        {/* TAB 2: SCRAP PICKUPS MANAGEMENT */}
        {activeTab === "bookings" && (
          <section className="adm-card animate-fade-in">
            <div className="adm-card-header">
              <h2 className="adm-card-title">
                <Package size={24} color="#10b981" /> Scrap Collection & Recycling Bookings ({bookings.length})
              </h2>
            </div>

            {/* Toolbar */}
            <div className="adm-toolbar">
              <div className="adm-search-box">
                <Search size={16} className="adm-search-icon" />
                <input
                  type="text"
                  className="adm-search-input"
                  placeholder="Search by customer name, phone, address, or ID..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                />
              </div>

              <div className="adm-chip-group">
                {["ALL", "PENDING_APPROVAL", "CONFIRMED", "PICKUP_SCHEDULED", "COLLECTED", "COMPLETED", "CANCELLED"].map(st => (
                  <button
                    key={st}
                    className={`adm-chip ${bookingStatusFilter === st ? "active" : ""}`}
                    onClick={() => setBookingStatusFilter(st)}
                  >
                    {st === "ALL" ? "All Bookings" : STATUS_COLORS[st]?.label || st}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Stream */}
            {filteredBookings.length === 0 ? (
              <div style={{ textAlign:"center", padding:"40px", color:"#94a3b8" }}>
                <Package size={44} style={{ margin:"0 auto 10px" }} />
                <p>No scrap collection bookings match the selected filter.</p>
              </div>
            ) : (
              <div style={{ display:"grid", gap:"18px" }}>
                {filteredBookings.map(b => {
                  const cfg = STATUS_COLORS[b.status] || { bg:"#f1f5f9", color:"#94a3b8", border:"#e2e8f0", label: b.status };
                  const isPending = b.status === "PENDING_APPROVAL";

                  return (
                    <div 
                      key={b.id} 
                      style={{ 
                        background:"#ffffff", 
                        borderRadius:"18px", 
                        padding:"24px", 
                        border:`1.5px solid ${cfg.border}`, 
                        boxShadow:"0 4px 16px rgba(0,0,0,0.03)",
                        borderLeft:`6px solid ${cfg.color}`
                      }}
                    >
                      <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"20px", alignItems:"flex-start" }}>
                        <div style={{ flex:1, minWidth:"280px" }}>
                          
                          <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"10px" }}>
                            <span style={{ background: cfg.bg, color: cfg.color, padding:"4px 12px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:"800" }}>
                              {cfg.label}
                            </span>
                            <span style={{ fontSize:"0.72rem", color:"#94a3b8", fontWeight:"700" }}>ID: {b.id}</span>
                          </div>

                          <h3 style={{ margin:"0 0 6px", fontSize:"1.25rem", fontWeight:"900", color:"#0f172a" }}>
                            {b.user_name}
                          </h3>

                          <div style={{ display:"flex", flexWrap:"wrap", gap:"16px", fontSize:"0.88rem", color:"#475569", margin:"8px 0" }}>
                            <a href={`tel:${b.phone_number}`} style={{ display:"flex", alignItems:"center", gap:"5px", color:"#0284c7", textDecoration:"none", fontWeight:"700" }}>
                              <Phone size={14} /> {b.phone_number}
                            </a>
                            <span style={{ display:"flex", alignItems:"center", gap:"5px" }}>
                              <MapPin size={14} color="#ef4444" /> {b.address}, {b.pincode}
                            </span>
                          </div>

                          {b.items && Array.isArray(b.items) && (
                            <div style={{ marginTop:12, display:"flex", flexWrap:"wrap", gap:6 }}>
                              {b.items.map((item, idx) => (
                                <span key={idx} style={{ background:"#f0fdf4", padding:"4px 10px", borderRadius:8, fontSize:"0.78rem", border:"1px solid #bbf7d0", color:"#166534", fontWeight:"600" }}>
                                  <strong>{item.material_name}</strong>: {item.estimated_weight} kg
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div style={{ textAlign:"right", minWidth:"200px" }}>
                          <p style={{ margin:0, color:"#94a3b8", fontSize:"0.75rem", textTransform:"uppercase", fontWeight:"700" }}>Booked On</p>
                          <p style={{ margin:"2px 0 8px", fontWeight:"800", color:"#0f172a", fontSize:"0.88rem" }}>{formatDate(b.created_at)}</p>

                          {b.pickup_timing && (
                            <div style={{ background:"#ecfdf5", color:"#059669", padding:"6px 12px", borderRadius:"10px", fontSize:"0.8rem", fontWeight:"800", border:"1px solid #a7f3d0" }}>
                              ⏰ Slot: {b.pickup_timing}
                            </div>
                          )}
                        </div>
                      </div>

                      {isPending ? (
                        <div style={{ marginTop:"18px", background:"#fefce8", border:"1px solid #fef08a", padding:"16px 20px", borderRadius:"14px" }}>
                          <p style={{ margin:"0 0 10px", fontSize:"0.85rem", fontWeight:"800", color:"#854d0e" }}>
                            ⏰ Action Required: Assign Pickup Timing Slot for Confirmation
                          </p>
                          <div style={{ display:"flex", gap:"10px", alignItems:"center", flexWrap:"wrap" }}>
                            <input 
                              type="text" 
                              placeholder="e.g., Today 2:30 PM - 4:00 PM" 
                              style={{ flex:1, minWidth:"200px", padding:"10px 14px", borderRadius:"10px", border:"1.5px solid #fde68a", outline:"none", fontSize:"0.9rem", background:"white" }}
                              value={pickupInput[b.id] || ""}
                              onChange={(e) => setPickupInput({...pickupInput, [b.id]: e.target.value})}
                            />
                            <button 
                              onClick={() => handleConfirm(b.id)}
                              disabled={confirming === b.id}
                              style={{ background:"#16a34a", color:"white", border:"none", padding:"10px 22px", borderRadius:"10px", fontWeight:"800", cursor:"pointer", fontSize:"0.88rem" }}
                            >
                              {confirming === b.id ? "Confirming..." : "Approve & Confirm"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ marginTop:"16px", paddingTop:"14px", borderTop:"1px solid #f1f5f9", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"10px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                            <span style={{ fontSize:"0.82rem", color:"#64748b", fontWeight:"700" }}>Update Status:</span>
                            <select 
                              style={{ padding:"6px 12px", borderRadius:"8px", border:"1px solid #cbd5e1", outline:"none", fontSize:"0.82rem", fontWeight:"600", background:"white" }}
                              value={b.status}
                              onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                            >
                              {Object.keys(STATUS_COLORS).map(statusKey => (
                                <option key={statusKey} value={statusKey}>{STATUS_COLORS[statusKey].label}</option>
                              ))}
                            </select>
                          </div>

                          <div style={{ display:"flex", gap:"8px" }}>
                            {b.phone_number && (
                              <a 
                                href={`https://wa.me/91${getCleanPhone(b.phone_number)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="adm-action-btn green"
                              >
                                <MessageCircle size={14} /> WhatsApp
                              </a>
                            )}
                            <button 
                              onClick={() => handleDeleteDoc("scrap_bookings", b.id)}
                              className="adm-action-btn delete"
                              title="Delete Booking"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* TAB 3: GREEN CLUB VOLUNTEERS */}
        {activeTab === "green_club" && (
          <section className="adm-card animate-fade-in">
            <div className="adm-card-header">
              <div>
                <h2 className="adm-card-title">
                  <Leaf size={24} color="#059669" /> Green Club Volunteers & Member Photos ({clubRegistrations.length})
                </h2>
                <p style={{ margin:"4px 0 0", fontSize:"0.85rem", color:"#64748b" }}>
                  Direct access to volunteer identification photos uploaded during registration with 1-click JPG export.
                </p>
              </div>
            </div>

            {/* Search & Photo Filter Toolbar */}
            <div className="adm-toolbar">
              <div className="adm-search-box">
                <Search size={16} className="adm-search-icon" />
                <input
                  type="text"
                  className="adm-search-input"
                  placeholder="Search volunteer by name, email, phone, event, or address..."
                  value={gcSearchTerm}
                  onChange={(e) => setGcSearchTerm(e.target.value)}
                />
              </div>

              <div className="adm-chip-group">
                <button
                  className={`adm-chip ${!gcFilterPhotoOnly ? "active" : ""}`}
                  onClick={() => setGcFilterPhotoOnly(false)}
                >
                  All Volunteers ({clubRegistrations.length})
                </button>
                <button
                  className={`adm-chip ${gcFilterPhotoOnly ? "active" : ""}`}
                  onClick={() => setGcFilterPhotoOnly(true)}
                >
                  📷 Uploaded Photos Only ({photoCount})
                </button>
              </div>
            </div>

            {/* Volunteer Table */}
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Member Photo</th>
                    <th>Volunteer Name</th>
                    <th>Contact Info</th>
                    <th>Adopted Task</th>
                    <th>Registered Date</th>
                    <th style={{ textAlign:"right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClubRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding:"40px", textAlign:"center", color:"#94a3b8" }}>
                        No volunteer registrations found matching search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredClubRegistrations.map((r) => {
                      const photo = r.photo_url || r.photo_base64 || r.photo;
                      const hasCustomPhoto = !!photo && !photo.includes("unsplash.com/photo-1535713875002");

                      return (
                        <tr key={r.id}>
                          <td>
                            <div 
                              className="adm-avatar-thumb" 
                              onClick={() => setSelectedPhotoVolunteer(r)}
                              title="Click to inspect photo in high-resolution"
                            >
                              {hasCustomPhoto ? (
                                <img src={photo} alt={r.user_name} />
                              ) : (
                                <ImageIcon size={20} color="#94a3b8" />
                              )}
                            </div>
                          </td>

                          <td>
                            <div style={{ fontWeight:"800", color:"#0f172a", fontSize:"0.95rem" }}>
                              {r.user_name}
                            </div>
                            <div style={{ fontSize:"0.78rem", color:"#64748b", marginTop:"2px", display:"flex", alignItems:"center", gap:"4px" }}>
                              <MapPin size={12} color="#ef4444" /> {r.address ? String(r.address).substring(0, 30) + "..." : "No address"}
                            </div>
                          </td>

                          <td>
                            <div style={{ fontSize:"0.85rem", color:"#0284c7", fontWeight:"700" }}>
                              <a href={`tel:${r.phone}`} style={{ color:"inherit", textDecoration:"none" }}>{r.phone}</a>
                            </div>
                            <div style={{ fontSize:"0.75rem", color:"#64748b" }}>{r.email}</div>
                          </td>

                          <td>
                            <span style={{ background:"#ecfdf5", color:"#059669", padding:"4px 10px", borderRadius:"12px", fontSize:"0.75rem", fontWeight:"800" }}>
                              {r.event_title || "Lifetime Member"}
                            </span>
                          </td>

                          <td>
                            <div style={{ fontSize:"0.82rem", color:"#475569", fontWeight:"600" }}>
                              {formatDate(r.created_at)}
                            </div>
                            <span style={{ 
                              padding:"2px 8px", 
                              borderRadius:"10px", 
                              fontSize:"0.7rem", 
                              fontWeight:"800",
                              background: r.payment_status === "completed" ? "#dcfce7" : "#fef3c7",
                              color: r.payment_status === "completed" ? "#16a34a" : "#d97706"
                            }}>
                              {r.payment_status === "completed" ? "✅ ₹500 Paid" : "⏳ Pending ₹500"}
                            </span>
                          </td>

                          <td style={{ textAlign:"right" }}>
                            <div style={{ display:"inline-flex", gap:"6px", alignItems:"center" }}>
                              <button 
                                onClick={() => setSelectedPhotoVolunteer(r)}
                                className="adm-action-btn view"
                                title="Inspect Full Photo & Profile"
                              >
                                <Eye size={13} /> View Photo
                              </button>

                              {photo && (
                                <button 
                                  onClick={() => handleDownloadPhoto(photo, r.user_name)}
                                  className="adm-action-btn green"
                                  title="Download Member Photo"
                                >
                                  <Download size={13} /> JPG
                                </button>
                              )}

                              <button 
                                onClick={() => handleDeleteDoc("green_club_registrations", r.id)}
                                className="adm-action-btn delete"
                                title="Delete Volunteer Record"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 4: WEEKLY NEWS & SOCIETY GAZETTE */}
        {activeTab === "weekly_news" && (
          <section className="adm-card animate-fade-in">
            
            <div style={{ 
              background: "linear-gradient(135deg, #009ee3 0%, #0369a1 100%)", 
              padding: "26px 30px", 
              borderRadius: "20px", 
              color: "white", 
              marginBottom: "24px", 
              boxShadow: "0 8px 24px rgba(0, 158, 227, 0.2)" 
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
                <div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.2)", padding: "4px 12px", borderRadius: "20px", fontSize:"0.75rem", fontWeight: "800", textTransform: "uppercase" }}>
                    <Sparkles size={14} /> Society Newsroom Dispatch Studio
                  </span>
                  <h2 style={{ color: "white", margin: "8px 0 4px", fontSize: "1.5rem", fontWeight: "900", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Newspaper size={24} color="white" /> Weekly News & Society Gazette Management
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.85)", margin: 0, fontSize: "0.88rem" }}>
                    Compose weekly bulletins covering all fields in society with cover photos, multi-image field galleries, and structured takeaways.
                  </p>
                </div>

                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => setNewsStudioTab("publish")}
                    style={{
                      background: newsStudioTab === "publish" ? "white" : "rgba(255,255,255,0.15)",
                      color: newsStudioTab === "publish" ? "#0369a1" : "white",
                      border: "none",
                      padding: "10px 18px",
                      borderRadius: "12px",
                      fontWeight: "800",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <Plus size={16} /> Compose Bulletin
                  </button>
                  <button
                    onClick={() => setNewsStudioTab("manage")}
                    style={{
                      background: newsStudioTab === "manage" ? "white" : "rgba(255,255,255,0.15)",
                      color: newsStudioTab === "manage" ? "#0369a1" : "white",
                      border: "none",
                      padding: "10px 18px",
                      borderRadius: "12px",
                      fontWeight: "800",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <Layers size={16} /> Gazette Archive ({weeklyNewsList.length})
                  </button>
                  <a
                    href="/weekly-news"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      color: "white",
                      textDecoration: "none",
                      padding: "10px 18px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <Globe size={16} /> Live Gazette ↗
                  </a>
                </div>
              </div>
            </div>

            {/* TAB 1: PUBLISH STUDIO FORM */}
            {newsStudioTab === "publish" && (
              <div style={{ background: "#f8fafc", padding: "28px", borderRadius: "18px", border: "1.5px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 20px", fontSize: "1.2rem", fontWeight: "900", color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                  <FileText size={18} color="#009ee3" /> News Composer & Field Visuals Builder
                </h3>

                <form onSubmit={handleNewsSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "25px" }}>
                    
                    {/* Left Column */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>
                          Article Headline / Title *
                        </label>
                        <input
                          type="text"
                          className="adm-input"
                          placeholder="e.g. Karnataka Launches Urban Micro-Forestry Mission"
                          required
                          value={newsTitle}
                          onChange={(e) => setNewsTitle(e.target.value)}
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>
                            Field in Society *
                          </label>
                          <select
                            className="adm-input"
                            value={newsCategory}
                            onChange={(e) => setNewsCategory(e.target.value)}
                          >
                            <option value="environment">🌳 Environment & Ecology</option>
                            <option value="tech">⚡ Clean-Tech & Innovation</option>
                            <option value="society">🏛️ Society & Civic Welfare</option>
                            <option value="health">🩺 Health & Sanitation</option>
                            <option value="urban">🏙️ Urban Living & Sustainability</option>
                            <option value="economy">📈 Policy & Green Economy</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>
                            Edition Week *
                          </label>
                          <input
                            type="text"
                            className="adm-input"
                            placeholder="e.g. Week 3, August 2026"
                            required
                            value={newsEdition}
                            onChange={(e) => setNewsEdition(e.target.value)}
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>Author/Source</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={newsAuthor}
                            onChange={(e) => setNewsAuthor(e.target.value)}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>Date</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={newsDate}
                            onChange={(e) => setNewsDate(e.target.value)}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>Read Time</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={newsReadTime}
                            onChange={(e) => setNewsReadTime(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>
                          Lead Summary / Executive Abstract *
                        </label>
                        <textarea
                          className="adm-input"
                          placeholder="Provide a concise 1-2 sentence lead overview..."
                          required
                          style={{ height: "80px" }}
                          value={newsSummary}
                          onChange={(e) => setNewsSummary(e.target.value)}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>
                          Full Article Body * (Separate paragraphs with double Enter)
                        </label>
                        <textarea
                          className="adm-input"
                          placeholder="Write the full comprehensive news story..."
                          required
                          style={{ height: "160px", lineHeight: "1.6" }}
                          value={newsContent}
                          onChange={(e) => setNewsContent(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Right Column: Visuals */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      
                      {/* Cover Image */}
                      <div style={{ background: "white", padding: "16px", borderRadius: "14px", border: "1px solid #cbd5e1" }}>
                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#0f172a", marginBottom: "6px", textTransform: "uppercase" }}>
                          📷 Primary Cover Image
                        </label>
                        <div className="adm-dropzone" style={{ marginBottom: "8px" }}>
                          <UploadCloud size={22} color="#009ee3" />
                          <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#475569", fontWeight: "700" }}>
                            {newsCoverFile ? newsCoverFile.name : "Select Cover JPG / PNG file"}
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewsCoverFile(e.target.files[0])}
                            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0, cursor: "pointer" }}
                          />
                        </div>
                        <input
                          type="text"
                          className="adm-input"
                          placeholder="Or Image URL Fallback (https://...)"
                          value={newsCoverUrl}
                          onChange={(e) => setNewsCoverUrl(e.target.value)}
                        />
                      </div>

                      {/* Multi-Image Relevant Gallery */}
                      <div style={{ background: "white", padding: "16px", borderRadius: "14px", border: "1px solid #cbd5e1" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                          <label style={{ fontSize: "0.75rem", fontWeight: "800", color: "#0f172a", textTransform: "uppercase" }}>
                            🖼️ Relevant Field Images Gallery ({newsGalleryFiles.length} Selected)
                          </label>
                          {newsGalleryFiles.length > 0 && (
                            <button
                              type="button"
                              onClick={() => setNewsGalleryFiles([])}
                              style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.75rem", fontWeight: "700", cursor: "pointer" }}
                            >
                              Clear
                            </button>
                          )}
                        </div>

                        <div className="adm-dropzone" style={{ marginBottom: "8px" }}>
                          <Images size={22} color="#0284c7" />
                          <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#0284c7", fontWeight: "700" }}>
                            Upload Multiple Field Photos (Select 1 to 5 images)
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              setNewsGalleryFiles(prev => [...prev, ...files]);
                            }}
                            style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0, cursor: "pointer" }}
                          />
                        </div>

                        {newsGalleryFiles.length > 0 && (
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "8px" }}>
                            {newsGalleryFiles.map((f, idx) => (
                              <span key={idx} style={{ background: "#f1f5f9", padding: "3px 8px", borderRadius: "6px", fontSize: "0.72rem", border: "1px solid #cbd5e1" }}>
                                {f.name.substring(0, 12)}...
                              </span>
                            ))}
                          </div>
                        )}

                        <textarea
                          className="adm-input"
                          placeholder="Or enter additional Image URLs (separated by comma or new lines)..."
                          style={{ height: "55px" }}
                          value={newsGalleryUrls}
                          onChange={(e) => setNewsGalleryUrls(e.target.value)}
                        />
                      </div>

                      {/* Takeaways & Tags */}
                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>
                          📌 Key Highlights & Takeaways (One per line)
                        </label>
                        <textarea
                          className="adm-input"
                          placeholder="• Key development point 1&#10;• Key development point 2"
                          style={{ height: "70px" }}
                          value={newsTakeaways}
                          onChange={(e) => setNewsTakeaways(e.target.value)}
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "10px", alignItems: "center" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "800", color: "#475569", marginBottom: "4px", textTransform: "uppercase" }}>
                            Topic Tags
                          </label>
                          <input
                            type="text"
                            className="adm-input"
                            placeholder="Ecology, MicroForest, GreenPolicy"
                            value={newsTags}
                            onChange={(e) => setNewsTags(e.target.value)}
                          />
                        </div>

                        <div style={{ background: "white", padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", marginTop: "16px" }}>
                          <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                            <input
                              type="checkbox"
                              checked={newsIsFeatured}
                              onChange={(e) => setNewsIsFeatured(e.target.checked)}
                              style={{ width: "16px", height: "16px", accentColor: "#009ee3" }}
                            />
                            ⭐ Spotlight
                          </label>
                        </div>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={newsUploading}
                        style={{
                          width: "100%",
                          background: "linear-gradient(135deg, #009ee3 0%, #0284c7 100%)",
                          color: "white",
                          border: "none",
                          padding: "14px 20px",
                          borderRadius: "12px",
                          fontWeight: "800",
                          fontSize: "0.95rem",
                          cursor: "pointer",
                          boxShadow: "0 6px 20px rgba(0, 158, 227, 0.3)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          marginTop: "6px"
                        }}
                      >
                        <Newspaper size={18} />
                        {newsUploading ? "Publishing Bulletin..." : "Publish Weekly News Bulletin"}
                      </button>

                    </div>

                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: GAZETTE ARCHIVE GRID */}
            {newsStudioTab === "manage" && (
              <div>
                <div className="adm-toolbar">
                  <div className="adm-search-box">
                    <Search size={16} className="adm-search-icon" />
                    <input
                      type="text"
                      className="adm-search-input"
                      placeholder="Search news archive by headline, author, tag..."
                      value={newsSearchTerm}
                      onChange={(e) => setNewsSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="adm-chip-group">
                    {["all", "environment", "tech", "society", "health", "urban", "economy"].map(catKey => (
                      <button
                        key={catKey}
                        className={`adm-chip ${newsCategoryFilter === catKey ? "active" : ""}`}
                        onClick={() => setNewsCategoryFilter(catKey)}
                      >
                        {catKey.charAt(0).toUpperCase() + catKey.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredWeeklyNews.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                    <Newspaper size={40} style={{ margin: "0 auto 10px" }} />
                    <p>No published news bulletins match your criteria.</p>
                  </div>
                ) : (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
                    {filteredWeeklyNews.map(item => (
                      <div
                        key={item.id}
                        style={{
                          background: "#ffffff",
                          borderRadius: "16px",
                          border: "1.5px solid #e2e8f0",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          boxShadow: "0 4px 14px rgba(0,0,0,0.03)"
                        }}
                      >
                        <div>
                          <div style={{ height: "160px", position: "relative", overflow: "hidden", background: "#e2e8f0" }}>
                            <img
                              src={item.cover_image || "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"}
                              alt={item.title}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                            <span style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(15, 23, 42, 0.8)", color: "white", padding: "3px 10px", borderRadius: "10px", fontSize: "0.68rem", fontWeight: "800", textTransform: "uppercase" }}>
                              {item.categoryLabel || item.category}
                            </span>
                            {item.gallery_images && item.gallery_images.length > 0 && (
                              <span style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(0, 158, 227, 0.9)", color: "white", padding: "3px 8px", borderRadius: "8px", fontSize: "0.68rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "4px" }}>
                                <Images size={11} /> +{item.gallery_images.length}
                              </span>
                            )}
                          </div>

                          <div style={{ padding: "16px" }}>
                            <div style={{ fontSize: "0.72rem", color: "#94a3b8", fontWeight: "700", marginBottom: "4px" }}>
                              {item.edition || "Weekly"} • {item.date}
                            </div>
                            <h4 style={{ margin: "0 0 8px", fontSize: "1rem", fontWeight: "800", color: "#0f172a", lineHeight: "1.35", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {item.title}
                            </h4>
                            <p style={{ margin: 0, fontSize: "0.82rem", color: "#64748b", lineHeight: "1.5", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {item.summary}
                            </p>
                          </div>
                        </div>

                        <div style={{ padding: "12px 16px", background: "#f8fafc", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <button
                            onClick={() => setSelectedNewsPreview(item)}
                            className="adm-action-btn view"
                          >
                            <Eye size={13} /> Preview
                          </button>

                          <div style={{ display: "flex", gap: "6px" }}>
                            <a
                              href={`/weekly-news/${item.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="adm-action-btn green"
                              title="Open Live Gazette Article"
                            >
                              <ExternalLink size={13} />
                            </a>

                            <button
                              onClick={() => handleDeleteDoc("weekly_news", item.id)}
                              className="adm-action-btn delete"
                              title="Delete Bulletin"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* TAB 5: PARTNER ENROLLMENTS */}
        {activeTab === "partners" && (
          <section className="adm-card animate-fade-in">
            <div className="adm-card-header">
              <h2 className="adm-card-title">
                <Handshake size={24} color="#8b5cf6" /> Professional Partner Applications ({partners.length})
              </h2>
            </div>

            <div className="adm-toolbar">
              <div className="adm-search-box">
                <Search size={16} className="adm-search-icon" />
                <input
                  type="text"
                  className="adm-search-input"
                  placeholder="Search partners by name, service, location, or phone..."
                  value={partnerSearch}
                  onChange={(e) => setPartnerSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Partner Name</th>
                    <th>Service Domain</th>
                    <th>Experience</th>
                    <th>Operating Location</th>
                    <th style={{ textAlign:"right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartners.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding:"40px", textAlign:"center", color:"#94a3b8" }}>
                        No partner enrollments found matching search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredPartners.map(p => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ fontWeight:"800", color:"#0f172a" }}>{p.fullName}</div>
                          <div style={{ fontSize:"0.78rem", color:"#0284c7", fontWeight:"700" }}>{p.phone}</div>
                          <div style={{ fontSize:"0.7rem", color:"#94a3b8" }}>{formatDate(p.created_at)}</div>
                        </td>
                        <td>
                          <span style={{ background:"#f5f3ff", color:"#7c3aed", padding:"4px 10px", borderRadius:"12px", fontSize:"0.75rem", fontWeight:"800" }}>
                            {p.serviceType || "Service Professional"}
                          </span>
                        </td>
                        <td>
                          <span style={{ color:"#16a34a", fontWeight:"700", fontSize:"0.85rem" }}>{p.experience || "1+"} Years</span>
                        </td>
                        <td>
                          <span style={{ fontSize:"0.85rem", color:"#475569" }}><MapPin size={12} color="#ef4444" style={{ display:"inline", marginRight:4 }} />{p.location || "Bengaluru"}</span>
                        </td>
                        <td style={{ textAlign:"right" }}>
                          <div style={{ display:"inline-flex", gap:"6px" }}>
                            {p.phone && (
                              <a 
                                href={`https://wa.me/91${getCleanPhone(p.phone)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="adm-action-btn green"
                              >
                                <MessageCircle size={13} /> WhatsApp
                              </a>
                            )}
                            <button
                              onClick={() => handleDeleteDoc("partner_registrations", p.id)}
                              className="adm-action-btn delete"
                              title="Delete Partner Application"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TAB 6: WEEKEND TASKS & BLOGS */}
        {activeTab === "content_studio" && (
          <section className="adm-card animate-fade-in">
            <div className="adm-card-header">
              <h2 className="adm-card-title">
                <Calendar size={24} color="#10b981" /> Green Club Weekend Tasks & Blogs Studio
              </h2>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(340px, 1fr))", gap:"25px" }}>
              
              {/* Add Event Form */}
              <div style={{ background:"#f8fafc", padding:"24px", borderRadius:"18px", border:"1.5px solid #e2e8f0" }}>
                <h3 style={{ margin:"0 0 16px", fontSize:"1.15rem", fontWeight:"900", color:"#0f172a", display:"flex", alignItems:"center", gap:"8px" }}>
                  <Calendar size={18} color="#10b981" /> Schedule Weekend Task (Event)
                </h3>
                <form onSubmit={handleEventSubmit}>
                  <div style={{ marginBottom:"12px" }}>
                    <label style={{ display:"block", fontSize:"0.72rem", fontWeight:"800", color:"#475569", marginBottom:"4px", textTransform:"uppercase" }}>Task Title</label>
                    <input type="text" className="adm-input" placeholder="e.g. Lake Sanitation & Micro-Forestry Drive" required value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                  </div>
                  <div style={{ marginBottom:"12px" }}>
                    <label style={{ display:"block", fontSize:"0.72rem", fontWeight:"800", color:"#475569", marginBottom:"4px", textTransform:"uppercase" }}>Description</label>
                    <textarea className="adm-input" placeholder="Outline task goals, tools provided..." required style={{ height:"70px" }} value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"12px" }}>
                    <div>
                      <label style={{ display:"block", fontSize:"0.72rem", fontWeight:"800", color:"#475569", marginBottom:"4px", textTransform:"uppercase" }}>Date / Timing</label>
                      <input type="text" className="adm-input" placeholder="Saturday, 7:00 AM" required value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                    </div>
                    <div>
                      <label style={{ display:"block", fontSize:"0.72rem", fontWeight:"800", color:"#475569", marginBottom:"4px", textTransform:"uppercase" }}>Tag</label>
                      <input type="text" className="adm-input" placeholder="Lake Clean-Up" value={eventTag} onChange={(e) => setEventTag(e.target.value)} />
                    </div>
                  </div>
                  <div style={{ marginBottom:"12px" }}>
                    <label style={{ display:"block", fontSize:"0.72rem", fontWeight:"800", color:"#475569", marginBottom:"4px", textTransform:"uppercase" }}>Meeting Location</label>
                    <input type="text" className="adm-input" placeholder="e.g. Ulsoor Lake Gate, Bengaluru" required value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
                  </div>
                  <div style={{ marginBottom:"12px" }}>
                    <label style={{ display:"block", fontSize:"0.72rem", fontWeight:"800", color:"#475569", marginBottom:"4px", textTransform:"uppercase" }}>Cover Photo File</label>
                    <div className="adm-dropzone">
                      <UploadCloud size={20} color="#10b981" />
                      <p style={{ margin:"2px 0 0", fontSize:"0.78rem", color:"#475569", fontWeight:"700" }}>{eventImageFile ? eventImageFile.name : "Select Image JPG / PNG"}</p>
                      <input type="file" accept="image/*" onChange={(e) => setEventImageFile(e.target.files[0])} style={{ position:"absolute", top:0, left:0, right:0, bottom:0, opacity:0, cursor:"pointer" }} />
                    </div>
                  </div>
                  <button type="submit" disabled={eventUploading} className="adm-btn-light" style={{ width:"100%", background:"#10b981", color:"white", justifyContent:"center" }}>
                    {eventUploading ? "Scheduling..." : "Schedule Weekend Task"}
                  </button>
                </form>
              </div>

              {/* Add Blog Form */}
              <div style={{ background:"#f8fafc", padding:"24px", borderRadius:"18px", border:"1.5px solid #e2e8f0" }}>
                <h3 style={{ margin:"0 0 16px", fontSize:"1.15rem", fontWeight:"900", color:"#0f172a", display:"flex", alignItems:"center", gap:"8px" }}>
                  <BookOpen size={18} color="#009ee3" /> Publish Green Club Blog
                </h3>
                <form onSubmit={handleBlogSubmit}>
                  <div style={{ marginBottom:"12px" }}>
                    <label style={{ display:"block", fontSize:"0.72rem", fontWeight:"800", color:"#475569", marginBottom:"4px", textTransform:"uppercase" }}>Blog Title</label>
                    <input type="text" className="adm-input" placeholder="e.g. 5 Practical Ways to Segregate Plastic at Home" required value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
                  </div>
                  <div style={{ marginBottom:"12px" }}>
                    <label style={{ display:"block", fontSize:"0.72rem", fontWeight:"800", color:"#475569", marginBottom:"4px", textTransform:"uppercase" }}>Summary</label>
                    <textarea className="adm-input" placeholder="A short lead preview of the blog..." required style={{ height:"60px" }} value={blogSummary} onChange={(e) => setBlogSummary(e.target.value)} />
                  </div>
                  <div style={{ marginBottom:"12px" }}>
                    <label style={{ display:"block", fontSize:"0.72rem", fontWeight:"800", color:"#475569", marginBottom:"4px", textTransform:"uppercase" }}>Full Article Content</label>
                    <textarea className="adm-input" placeholder="Write full blog article..." required style={{ height:"90px" }} value={blogContent} onChange={(e) => setBlogContent(e.target.value)} />
                  </div>
                  <div style={{ marginBottom:"12px" }}>
                    <label style={{ display:"block", fontSize:"0.72rem", fontWeight:"800", color:"#475569", marginBottom:"4px", textTransform:"uppercase" }}>Cover Photo File</label>
                    <div className="adm-dropzone">
                      <UploadCloud size={20} color="#009ee3" />
                      <p style={{ margin:"2px 0 0", fontSize:"0.78rem", color:"#475569", fontWeight:"700" }}>{blogImageFile ? blogImageFile.name : "Select Image JPG / PNG"}</p>
                      <input type="file" accept="image/*" onChange={(e) => setBlogImageFile(e.target.files[0])} style={{ position:"absolute", top:0, left:0, right:0, bottom:0, opacity:0, cursor:"pointer" }} />
                    </div>
                  </div>
                  <button type="submit" disabled={blogUploading} className="adm-btn-light" style={{ width:"100%", background:"#009ee3", color:"white", justifyContent:"center" }}>
                    {blogUploading ? "Publishing..." : "Publish Blog Article"}
                  </button>
                </form>
              </div>

            </div>

            {/* List of existing events & blogs */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"20px", marginTop:"30px" }}>
              <div>
                <h4 style={{ margin:"0 0 12px", fontSize:"0.95rem", fontWeight:"800", color:"#0f172a" }}>Scheduled Weekend Tasks ({clubEvents.length})</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                  {clubEvents.map(ev => (
                    <div key={ev.id} style={{ background:"white", padding:"12px 16px", borderRadius:"12px", border:"1px solid #e2e8f0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <h5 style={{ margin:"0 0 2px", fontSize:"0.9rem", fontWeight:"800" }}>{ev.title}</h5>
                        <span style={{ fontSize:"0.75rem", color:"#64748b" }}>{ev.date} • {ev.location}</span>
                      </div>
                      <button onClick={() => handleDeleteDoc("green_club_events", ev.id)} className="adm-action-btn delete" style={{ padding:"6px" }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 style={{ margin:"0 0 12px", fontSize:"0.95rem", fontWeight:"800", color:"#0f172a" }}>Published Green Blogs ({clubBlogs.length})</h4>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                  {clubBlogs.map(bl => (
                    <div key={bl.id} style={{ background:"white", padding:"12px 16px", borderRadius:"12px", border:"1px solid #e2e8f0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <h5 style={{ margin:"0 0 2px", fontSize:"0.9rem", fontWeight:"800" }}>{bl.title}</h5>
                        <span style={{ fontSize:"0.75rem", color:"#64748b" }}>{bl.author} • {bl.date}</span>
                      </div>
                      <button onClick={() => handleDeleteDoc("green_club_blogs", bl.id)} className="adm-action-btn delete" style={{ padding:"6px" }}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </section>
        )}

        {/* TAB 7: USERS DIRECTORY */}
        {activeTab === "users" && (
          <section className="adm-card animate-fade-in">
            <div className="adm-card-header">
              <h2 className="adm-card-title">
                <Users size={24} color="#009ee3" /> Registered Cloud Users ({users.length})
              </h2>
            </div>

            <div className="adm-toolbar">
              <div className="adm-search-box">
                <Search size={16} className="adm-search-icon" />
                <input
                  type="text"
                  className="adm-search-input"
                  placeholder="Search users by name, email, phone, or role..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>User Profile</th>
                    <th>Email Address</th>
                    <th>Phone Number</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ padding:"40px", textAlign:"center", color:"#94a3b8" }}>
                        No registered users match your search.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(u => (
                      <tr key={u.id}>
                        <td>
                          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                            <div style={{ width:34, height:34, borderRadius:"50%", background:"#e0f2fe", color:"#0369a1", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"800", fontSize:"0.85rem" }}>
                              {(u.name || u.email || "U").charAt(0).toUpperCase()}
                            </div>
                            <div style={{ fontWeight:"800", color:"#0f172a" }}>{u.name || "Customer"}</div>
                          </div>
                        </td>
                        <td>
                          <span style={{ fontSize:"0.85rem", color:"#0284c7", fontWeight:"600" }}>{u.email || "N/A"}</span>
                        </td>
                        <td>
                          <span style={{ fontSize:"0.85rem", color:"#475569" }}>{u.phone || u.phone_number || "Not provided"}</span>
                        </td>
                        <td>
                          <span style={{ background: u.role === "admin" ? "#fef3c7" : "#f1f5f9", color: u.role === "admin" ? "#d97706" : "#475569", padding:"4px 10px", borderRadius:"12px", fontSize:"0.72rem", fontWeight:"800", textTransform:"uppercase" }}>
                            {u.role || "Customer"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

      </main>

      {/* =========================================================================
          MODAL 1: PHOTO & VOLUNTEER DETAILS INSPECTION MODAL
         ========================================================================= */}
      {selectedPhotoVolunteer && (
        <div 
          className="adm-modal-backdrop"
          onClick={() => setSelectedPhotoVolunteer(null)}
        >
          <div 
            className="adm-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding:"20px 24px", background:"linear-gradient(135deg, #10b981, #059669)", color:"white", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <Users size={22} color="white" />
                <h3 style={{ margin:0, fontSize:"1.2rem", fontWeight:"800", color:"white" }}>Green Club Member Photo & Profile</h3>
              </div>
              <button 
                onClick={() => setSelectedPhotoVolunteer(null)}
                style={{ background:"rgba(255,255,255,0.2)", border:"none", borderRadius:"50%", width:"32px", height:"32px", display:"flex", alignItems:"center", justifyContent:"center", color:"white", cursor:"pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding:"28px 24px", display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:"24px", alignItems:"start" }}>
              
              {/* Photo Card */}
              <div style={{ textAlign:"center" }}>
                <div style={{ 
                  width:"100%", 
                  maxWidth:"260px", 
                  height:"280px", 
                  margin:"0 auto", 
                  borderRadius:"18px", 
                  overflow:"hidden", 
                  border:"3px solid #10b981", 
                  boxShadow:"0 8px 24px rgba(16, 185, 129, 0.15)",
                  background:"#f8fafc",
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"center"
                }}>
                  {(selectedPhotoVolunteer.photo_url || selectedPhotoVolunteer.photo_base64 || selectedPhotoVolunteer.photo) ? (
                    <img 
                      src={selectedPhotoVolunteer.photo_url || selectedPhotoVolunteer.photo_base64 || selectedPhotoVolunteer.photo} 
                      alt={selectedPhotoVolunteer.user_name}
                      style={{ width:"100%", height:"100%", objectFit:"cover" }}
                    />
                  ) : (
                    <div style={{ textAlign:"center", padding:"20px", color:"#94a3b8" }}>
                      <ImageIcon size={48} style={{ margin:"0 auto 8px" }} />
                      <p style={{ margin:0, fontSize:"0.85rem", fontWeight:"600" }}>No custom photo uploaded</p>
                    </div>
                  )}
                </div>

                {/* Photo Actions */}
                {(selectedPhotoVolunteer.photo_url || selectedPhotoVolunteer.photo_base64 || selectedPhotoVolunteer.photo) && (
                  <div style={{ display:"flex", gap:"8px", justifyContent:"center", marginTop:"14px", flexWrap:"wrap" }}>
                    <button 
                      onClick={() => handleDownloadPhoto(
                        selectedPhotoVolunteer.photo_url || selectedPhotoVolunteer.photo_base64 || selectedPhotoVolunteer.photo,
                        selectedPhotoVolunteer.user_name
                      )}
                      style={{ 
                        background:"#10b981", 
                        color:"white", 
                        border:"none", 
                        padding:"8px 14px", 
                        borderRadius:"10px", 
                        fontWeight:"700", 
                        fontSize:"0.82rem", 
                        cursor:"pointer",
                        display:"inline-flex",
                        alignItems:"center",
                        gap:"6px"
                      }}
                    >
                      <Download size={14} /> Download Photo (.JPG)
                    </button>

                    <button 
                      onClick={() => {
                        const url = selectedPhotoVolunteer.photo_url || selectedPhotoVolunteer.photo_base64 || selectedPhotoVolunteer.photo;
                        if (url.startsWith("data:")) {
                          const w = window.open("");
                          w.document.write(`<img src="${url}" style="max-width:100%;height:auto;" />`);
                        } else {
                          window.open(url, "_blank");
                        }
                      }}
                      style={{ 
                        background:"#f1f5f9", 
                        color:"#334155", 
                        border:"1px solid #cbd5e1", 
                        padding:"8px 12px", 
                        borderRadius:"10px", 
                        fontWeight:"700", 
                        fontSize:"0.82rem", 
                        cursor:"pointer",
                        display:"inline-flex",
                        alignItems:"center",
                        gap:"6px"
                      }}
                    >
                      <ExternalLink size={14} /> Open Full
                    </button>
                  </div>
                )}
              </div>

              {/* Volunteer Details Card */}
              <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
                <div>
                  <span style={{ fontSize:"0.72rem", textTransform:"uppercase", color:"#94a3b8", fontWeight:"800", letterSpacing:"0.5px" }}>VOLUNTEER NAME</span>
                  <h4 style={{ margin:"2px 0 0", fontSize:"1.25rem", fontWeight:"800", color:"#0f172a" }}>{selectedPhotoVolunteer.user_name}</h4>
                </div>

                <div style={{ background:"#f8fafc", padding:"12px 16px", borderRadius:"12px", border:"1px solid #e2e8f0" }}>
                  <div style={{ fontSize:"0.72rem", textTransform:"uppercase", color:"#94a3b8", fontWeight:"800", marginBottom:"4px" }}>CONTACT INFORMATION</div>
                  <div style={{ fontSize:"0.9rem", color:"#334155", marginBottom:"6px", display:"flex", alignItems:"center", gap:"6px" }}>
                    <Mail size={15} color="#0284c7" /> <a href={`mailto:${selectedPhotoVolunteer.email}`} style={{ color:"#0284c7", textDecoration:"none", fontWeight:"600" }}>{selectedPhotoVolunteer.email}</a>
                  </div>
                  <div style={{ fontSize:"0.9rem", color:"#334155", display:"flex", alignItems:"center", gap:"6px" }}>
                    <Phone size={15} color="#10b981" /> <a href={`tel:${selectedPhotoVolunteer.phone}`} style={{ color:"#334155", textDecoration:"none", fontWeight:"600" }}>{selectedPhotoVolunteer.phone}</a>
                  </div>
                </div>

                <div style={{ background:"#f8fafc", padding:"12px 16px", borderRadius:"12px", border:"1px solid #e2e8f0" }}>
                  <div style={{ fontSize:"0.72rem", textTransform:"uppercase", color:"#94a3b8", fontWeight:"800", marginBottom:"4px" }}>RESIDENTIAL ADDRESS</div>
                  <div style={{ fontSize:"0.88rem", color:"#334155", lineHeight:"1.5", display:"flex", alignItems:"flex-start", gap:"6px" }}>
                    <MapPin size={15} color="#ef4444" style={{ flexShrink:0, marginTop:"3px" }} />
                    <span>{selectedPhotoVolunteer.address || "No complete address provided"}</span>
                  </div>
                </div>

                <div style={{ background:"#f0fdf4", padding:"12px 16px", borderRadius:"12px", border:"1px solid #bbf7d0" }}>
                  <div style={{ fontSize:"0.72rem", textTransform:"uppercase", color:"#166534", fontWeight:"800", marginBottom:"4px" }}>EVENT & REGISTRATION</div>
                  <div style={{ fontSize:"0.9rem", color:"#166534", fontWeight:"700" }}>
                    {selectedPhotoVolunteer.event_title || "Lifetime Membership"}
                  </div>
                  <div style={{ fontSize:"0.78rem", color:"#15803d", marginTop:"2px" }}>
                    Registered on: {formatDate(selectedPhotoVolunteer.created_at)}
                  </div>
                </div>

                {selectedPhotoVolunteer.phone && (
                  <a 
                    href={`https://wa.me/91${getCleanPhone(selectedPhotoVolunteer.phone)}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      background:"#15803d", 
                      color:"white", 
                      padding:"10px 16px", 
                      borderRadius:"12px", 
                      fontWeight:"700", 
                      fontSize:"0.85rem", 
                      textDecoration:"none", 
                      display:"flex", 
                      alignItems:"center", 
                      justifyContent:"center", 
                      gap:"8px",
                      boxShadow:"0 4px 14px rgba(21, 128, 61, 0.25)" 
                    }}
                  >
                    <MessageCircle size={16} /> Open WhatsApp Chat with Volunteer
                  </a>
                )}
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{ padding:"16px 24px", background:"#f8fafc", borderTop:"1px solid #f1f5f9", display:"flex", justifyContent:"flex-end" }}>
              <button 
                onClick={() => setSelectedPhotoVolunteer(null)}
                style={{ background:"#e2e8f0", color:"#475569", border:"none", padding:"10px 20px", borderRadius:"10px", fontWeight:"700", cursor:"pointer" }}
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: WEEKLY NEWS ARTICLE ADMIN PREVIEW MODAL
         ========================================================================= */}
      {selectedNewsPreview && (
        <div
          className="adm-modal-backdrop"
          onClick={() => setSelectedNewsPreview(null)}
        >
          <div
            className="adm-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: "20px 24px", background: "linear-gradient(135deg, #009ee3 0%, #0369a1 100%)", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Newspaper size={22} color="white" />
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "800", color: "white" }}>Weekly News Story Preview</h3>
              </div>
              <button
                onClick={() => setSelectedNewsPreview(null)}
                style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer" }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "28px 24px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "10px" }}>
                <span style={{ background: "#e0f2fe", color: "#0369a1", padding: "4px 10px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "800" }}>
                  {selectedNewsPreview.categoryLabel || selectedNewsPreview.category}
                </span>
                <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "600" }}>
                  {selectedNewsPreview.edition} • {selectedNewsPreview.date}
                </span>
              </div>

              <h2 style={{ fontSize: "1.5rem", fontWeight: "900", color: "#0f172a", lineHeight: "1.3", marginBottom: "14px" }}>
                {selectedNewsPreview.title}
              </h2>

              {selectedNewsPreview.cover_image && (
                <div style={{ borderRadius: "16px", overflow: "hidden", maxHeight: "320px", marginBottom: "20px", background: "#f1f5f9" }}>
                  <img src={selectedNewsPreview.cover_image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}

              {selectedNewsPreview.summary && (
                <blockquote style={{ background: "#f0f9ff", borderLeft: "4px solid #009ee3", padding: "14px 16px", borderRadius: "8px", margin: "0 0 20px", fontSize: "0.95rem", fontStyle: "italic", color: "#0369a1" }}>
                  "{selectedNewsPreview.summary}"
                </blockquote>
              )}

              {/* Full Content */}
              <div style={{ fontSize: "0.95rem", lineHeight: "1.7", color: "#334155", marginBottom: "24px" }}>
                {selectedNewsPreview.content && selectedNewsPreview.content.split("\n\n").map((p, idx) => (
                  <p key={idx} style={{ marginBottom: "14px" }}>{p}</p>
                ))}
              </div>

              {/* Gallery Images in Preview */}
              {selectedNewsPreview.gallery_images && selectedNewsPreview.gallery_images.length > 0 && (
                <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "20px", marginBottom: "20px" }}>
                  <h4 style={{ margin: "0 0 12px", fontSize: "0.95rem", fontWeight: "800", color: "#0f172a", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Images size={16} color="#009ee3" /> Relevant Field Images Gallery ({selectedNewsPreview.gallery_images.length})
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px" }}>
                    {selectedNewsPreview.gallery_images.map((g, i) => (
                      <div key={i} style={{ borderRadius: "10px", overflow: "hidden", height: "100px", border: "1px solid #cbd5e1" }}>
                        <img src={typeof g === "string" ? g : g.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Actions */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "18px" }}>
                <a
                  href={`/weekly-news/${selectedNewsPreview.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ background: "#009ee3", color: "white", textDecoration: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: "700", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <ExternalLink size={14} /> Open Live Article Page
                </a>
                <button
                  onClick={() => setSelectedNewsPreview(null)}
                  style={{ background: "#f1f5f9", color: "#64748b", border: "none", padding: "10px 18px", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}
                >
                  Close Preview
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
