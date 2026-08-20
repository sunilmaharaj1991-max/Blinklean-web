import React, { useState, useEffect, useCallback } from "react";
import { auth, db, storage } from "../firebase";
import { collection, getDocs, getDoc, doc, query, orderBy, updateDoc, addDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
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
  Plus
} from "lucide-react";
import "../assets/css/style.css";

const STATUS_COLORS = {
  PENDING_APPROVAL: { bg: "#fef3c7", color: "#f59e0b", label: "Pending Approval" },
  CONFIRMED:        { bg: "#dcfce7", color: "#1B9B3A", label: "Confirmed" },
  PICKUP_SCHEDULED: { bg: "#e0f2fe", color: "#009EE3", label: "Pickup Scheduled" },
  COLLECTED:        { bg: "#ede9fe", color: "#8b5cf6", label: "Collected" },
  COMPLETED:        { bg: "#f0fdf4", color: "#16a34a", label: "Completed" },
  CANCELLED:        { bg: "#fee2e2", color: "#ef4444", label: "Cancelled" },
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
  
  // Green Club State
  const [clubRegistrations,       setClubRegistrations]       = useState([]);
  const [clubEvents,              setClubEvents]              = useState([]);
  const [clubBlogs,               setClubBlogs]               = useState([]);
  const [selectedPhotoVolunteer,  setSelectedPhotoVolunteer]  = useState(null);
  const [gcSearchTerm,            setGcSearchTerm]            = useState("");
  const [gcFilterPhotoOnly,       setGcFilterPhotoOnly]       = useState(false);

  // Weekly News & Society Gazette State
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
      // 1. Fetch Bookings from Firestore
      const bookQuery = query(collection(db, "scrap_bookings"), orderBy("created_at", "desc"));
      const bookSnap  = await getDocs(bookQuery);
      const bookList  = bookSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setBookings(bookList);

      // 2. Fetch Partners from Firestore
      const partQuery = query(collection(db, "partner_registrations"), orderBy("created_at", "desc"));
      const partSnap  = await getDocs(partQuery);
      const partList  = partSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setPartners(partList);

      // 3. Fetch Users from Firestore
      const userSnap = await getDocs(collection(db, "users"));
      const userList = userSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setUsers(userList);

      // 4. Fetch Green Club Registrations
      try {
        const gcRegQuery = query(collection(db, "green_club_registrations"), orderBy("created_at", "desc"));
        const gcRegSnap = await getDocs(gcRegQuery);
        setClubRegistrations(gcRegSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.warn("Could not fetch Green Club registrations:", err);
      }

      // 5. Fetch Green Club Events
      try {
        const gcEventQuery = query(collection(db, "green_club_events"), orderBy("created_at", "desc"));
        const gcEventSnap = await getDocs(gcEventQuery);
        setClubEvents(gcEventSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.warn("Could not fetch Green Club events:", err);
      }

      // 6. Fetch Green Club Blogs
      try {
        const gcBlogQuery = query(collection(db, "green_club_blogs"), orderBy("created_at", "desc"));
        const gcBlogSnap = await getDocs(gcBlogQuery);
        setClubBlogs(gcBlogSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.warn("Could not fetch Green Club blogs:", err);
      }

      // 7. Fetch Weekly News Articles
      try {
        const newsQuery = query(collection(db, "weekly_news"), orderBy("created_at", "desc"));
        const newsSnap = await getDocs(newsQuery);
        setWeeklyNewsList(newsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.warn("Could not fetch Weekly News:", err);
      }

    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) { navigate("/login"); return; }
      try {
        // Double-check Role in Firestore OR check by hardcoded admin emails
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const isAdminEmail = (user.email === "sunilmaharaj1991@gmail.com" || user.email === "jeevithgowdasr@gmail.com" || user.email === "rohithlakshman1@gmail.com" || user.email === "sushmitha157@gmail.com");
        
        if (isAdminEmail || (userDoc.exists() && userDoc.data().role === "admin")) {
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
  }, [navigate, fetchData]);

  const handleConfirm = async (bookingId) => {
    const timing = pickupInput[bookingId] || "10:00 AM – 1:00 PM Tomorrow";
    setConfirming(bookingId);
    try {
      // 1. Update Firestore Status (Source of Truth)
      const bookingRef = doc(db, "scrap_bookings", bookingId);
      await updateDoc(bookingRef, {
        status: "CONFIRMED",
        pickup_timing: timing
      });

      // 2. Notify Backend API (Sync side effects like SMS)
      // We pass the timing in the body so the backend can include it in the notification
      fetch(`${API_BASE}/scrap/booking/${bookingId}/confirm`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickupTiming: timing })
      }).catch(err => console.warn("Backend confirmation notify failed, but record is safe in Firestore.", err));

      alert(`✅ Booking CONFIRMED!\n\nPickup Status Updated to: ${timing}`);
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
      // 1. Update Firestore
      const bookingRef = doc(db, "scrap_bookings", bookingId);
      await updateDoc(bookingRef, { status: newStatus });

      // 2. Update API
      fetch(`${API_BASE}/scrap/booking/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      }).catch(err => console.warn("API Status Sync Failed:", err));

      alert(`Status updated to: ${newStatus}`);
      await fetchData();
    } catch (err) {
      alert("Failed to update status.");
      console.error(err);
    }
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

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setBlogUploading(true);
    try {
      let finalUrl = blogImageUrl;
      if (blogImageFile) {
        try {
          finalUrl = await uploadImage(blogImageFile, "green_club_blogs");
        } catch (err) {
          alert(err.message + " Attempting to fallback to text image url or placeholder.");
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
      alert("✅ Blog uploaded successfully!");
      
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
        } catch (err) {
          alert(err.message + " Attempting to fallback to text image url or placeholder.");
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

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsSummary.trim() || !newsContent.trim()) {
      alert("Please provide the news headline, summary, and full content.");
      return;
    }

    setNewsUploading(true);
    try {
      // 1. Process Cover Image
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

      // 2. Process Gallery Images (Multiple relevant images)
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

      // Add manual gallery URLs if provided
      if (newsGalleryUrls.trim()) {
        const manualUrls = newsGalleryUrls
          .split(/[\n,]+/)
          .map(u => u.trim())
          .filter(u => u.startsWith("http"));
        finalGallery.push(...manualUrls);
      }

      // 3. Process Key Takeaways & Tags
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

      // Reset form
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

  const handleDeleteDoc = async (collectionName, docId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, collectionName, docId));
      alert("Deleted successfully!");
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
      console.warn("Direct download fallback to new tab:", err);
      window.open(photoUrl, "_blank");
    }
  };

  const formatDate = (ts) => {
    if (!ts) return "N/A";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString("en-IN", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" });
  };

  const filteredClubRegistrations = clubRegistrations.filter(r => {
    const photo = r.photo_url || r.photo_base64 || r.photo;
    const hasPhoto = !!photo && !photo.includes("unsplash.com/photo-1535713875002");
    if (gcFilterPhotoOnly && !hasPhoto) return false;
    
    if (!gcSearchTerm.trim()) return true;
    const q = gcSearchTerm.toLowerCase();
    return (
      (r.user_name && r.user_name.toLowerCase().includes(q)) ||
      (r.email && r.email.toLowerCase().includes(q)) ||
      (r.phone && r.phone.toLowerCase().includes(q)) ||
      (r.event_title && r.event_title.toLowerCase().includes(q)) ||
      (r.address && r.address.toLowerCase().includes(q))
    );
  });

  const filteredWeeklyNews = weeklyNewsList.filter(n => {
    if (newsCategoryFilter !== "all" && n.category !== newsCategoryFilter) return false;
    if (!newsSearchTerm.trim()) return true;
    const q = newsSearchTerm.toLowerCase();
    return (
      (n.title && n.title.toLowerCase().includes(q)) ||
      (n.summary && n.summary.toLowerCase().includes(q)) ||
      (n.author && n.author.toLowerCase().includes(q)) ||
      (n.edition && n.edition.toLowerCase().includes(q)) ||
      (n.categoryLabel && n.categoryLabel.toLowerCase().includes(q))
    );
  });

  const photoCount = clubRegistrations.filter(r => {
    const photo = r.photo_url || r.photo_base64 || r.photo;
    return !!photo && !photo.includes("unsplash.com/photo-1535713875002");
  }).length;

  if (loading) return (
    <div style={{ display:"flex", height:"100vh", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"16px" }}>
      <RefreshCw size={44} style={{ color:"#009EE3", animation:"spin 1s linear infinite" }} />
      <p style={{ color:"#64748b", fontWeight:600 }}>Syncing with Database...</p>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );

  if (!isAuthorized) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f8fafc" }}>
      <div style={{ background:"white", padding:"50px", borderRadius:"24px", textAlign:"center", maxWidth:"500px", boxShadow:"0 20px 60px rgba(0,0,0,0.1)" }}>
        <AlertCircle size={64} color="#ef4444" style={{ marginBottom: "16px", margin: "0 auto" }} />
        <h2 style={{ color:"#ef4444", margin:"10px 0" }}>Access Denied</h2>
        <p style={{ color:"#64748b", marginBottom:"30px" }}>Only authorized admins can access this portal.</p>
        <button style={{ padding:"12px 28px", background:"#009EE3", color:"white", border:"none", borderRadius:"12px", cursor:"pointer", fontWeight:"700" }} onClick={() => navigate("/")}>Go Home</button>
      </div>
    </div>
  );

  const pendingCount = bookings.filter(b => b.status === "PENDING_APPROVAL").length;

  return (
    <div style={{ minHeight:"100vh", background:"#f4fbff", fontFamily:"Inter, sans-serif" }}>
      
      <div style={{ background:"linear-gradient(135deg, #009EE3, #1B9B3A)", padding:"28px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"16px" }}>
        <div>
          <span style={{ background:"rgba(255,255,255,0.2)", color:"white", padding:"4px 12px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:"700" }}>🔒 SECURE CLOUD STORAGE LOGGED</span>
          <h1 style={{ color:"white", marginTop:"8px", marginBottom:"4px", fontSize:"1.8rem", fontWeight:"800" }}>Blinklean Dashboard</h1>
          <p style={{ color:"rgba(255,255,255,0.8)", margin:0, fontSize:"0.9rem" }}>{auth.currentUser?.email}</p>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <button onClick={fetchData} style={{ display:"flex", alignItems:"center", gap:"8px", background:"white", color:"#009EE3", padding:"10px 20px", borderRadius:"12px", border:"none", cursor:"pointer", fontWeight:"600" }}>
            <RefreshCw size={18} /> Sync Cloud
          </button>
          <button onClick={() => auth.signOut().then(() => navigate("/"))} style={{ display:"flex", alignItems:"center", gap:"8px", background:"rgba(0,0,0,0.1)", color:"white", padding:"10px 20px", borderRadius:"12px", border:"none", cursor:"pointer", fontWeight:"600" }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"32px 24px" }}>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))", gap:"20px", marginBottom:"40px" }}>
          {[
            { label:"Total Users", value:users.length, color:"#009EE3", bg:"#e0f2fe", icon:<Users /> },
            { label:"Scrap Bookings", value:bookings.length, color:"#1B9B3A", bg:"#dcfce7", icon:<Package /> },
            { label:"Partner Enrollments", value:partners.length, color:"#8b5cf6", bg:"#ede9fe", icon:<Handshake /> },
            { label:"New Requests", value:pendingCount, color:"#f59e0b", bg:"#fef3c7", icon:<Clock /> },
            { label:"Weekly News Articles", value:weeklyNewsList.length, color:"#009EE3", bg:"#e0f2fe", icon:<Newspaper /> },
            { label:"Green Registrations", value:clubRegistrations.length, color:"#10b981", bg:"#f0fdf4", icon:<Users /> },
            { label:"Uploaded Photos", value:photoCount, color:"#059669", bg:"#ecfdf5", icon:<ImageIcon /> },
            { label:"Weekend Tasks", value:clubEvents.length, color:"#10b981", bg:"#f0fdf4", icon:<Calendar /> },
          ].map((stat, i) => (
            <div key={i} style={{ background:"white", borderRadius:"20px", padding:"20px", boxShadow:`0 4px 20px rgba(0,0,0,0.05)`, borderTop:`5px solid ${stat.color}` }}>
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div>
                  <p style={{ margin:"0 0 6px", fontSize:"0.7rem", fontWeight:"700", color:"#94a3b8", textTransform:"uppercase" }}>{stat.label}</p>
                  <div style={{ fontSize:"2rem", fontWeight:"900", color:stat.color }}>{stat.value}</div>
                </div>
                <div style={{ color: stat.color }}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* --- BOOKINGS SECTION --- */}
        <section style={{ marginBottom:"50px" }}>
          <h2 style={{ marginBottom:"20px", display:"flex", alignItems:"center", gap:"10px" }}><Package color="#1B9B3A" /> Scrap Collection Requests</h2>
          <div style={{ display:"grid", gap:"16px" }}>
            {bookings.length === 0 ? <div style={{ background:"white", padding:"40px", borderRadius:"20px", textAlign:"center", color:"#94a3b8" }}>No records found in cloud database.</div> : 
              bookings.map(b => {
                const cfg = STATUS_COLORS[b.status] || { bg:"#f1f5f9", color:"#94a3b8", label: b.status };
                const isPending = b.status === "PENDING_APPROVAL";
                return (
                  <div key={b.id} style={{ background:"white", borderRadius:"20px", padding:"24px", boxShadow:"0 4px 15px rgba(0,0,0,0.03)", borderLeft:`6px solid ${cfg.color}` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"20px" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"14px" }}>
                          <span style={{ fontSize:"0.7rem", fontWeight:"800", color:"#94a3b8" }}>ID: {b.id.substring(0,6)}...</span>
                          <span style={{ padding:"4px 12px", borderRadius:"20px", fontSize:"0.7rem", fontWeight:"800", background:cfg.bg, color:cfg.color }}>{cfg.label}</span>
                        </div>
                        <h3 style={{ margin:"0 0 4px", fontSize:"1.2rem" }}>{b.user_name}</h3>
                        <p style={{ margin:"0 0 8px", color:"#009EE3", fontWeight:"600" }}><Phone size={14} style={{ display:"inline", marginRight:6 }} /> {b.phone_number}</p>
                        <p style={{ margin:0, color:"#475569", fontSize:"0.95rem" }}><MapPin size={14} style={{ display:"inline", marginRight:6 }} /> {b.address}, {b.pincode}</p>
                        
                        {/* Material List Display */}
                        {b.items && Array.isArray(b.items) && (
                          <div style={{ marginTop:16, display:"flex", flexWrap:"wrap", gap:8 }}>
                            {b.items.map((item, idx) => (
                              <span key={idx} style={{ background:"#f8fafc", padding:"4px 10px", borderRadius:6, fontSize:"0.8rem", border:"1px solid #e2e8f0" }}>
                                <strong>{item.material_name}</strong>: {item.estimated_weight}kg
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <p style={{ margin:0, color:"#94a3b8", fontSize:"0.8rem" }}>Request Date</p>
                        <p style={{ margin:0, fontWeight:"700" }}>{formatDate(b.created_at)}</p>
                        {b.pickup_timing && (
                          <div style={{ marginTop:10, color:"#1B9B3A", fontWeight:"700", fontSize:"0.85rem" }}>
                            Scheduled for: {b.pickup_timing}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {isPending ? (
                       <div style={{ marginTop:"20px", background:"#fefce8", border:"1px solid #fef08a", padding:"16px", borderRadius:"15px" }}>
                         <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
                           <Clock size={18} style={{ color:"#f59e0b" }} />
                           <input 
                             type="text" 
                             placeholder="Set Pickup Time (e.g. 2 PM Today)" 
                             style={{ flex:1, padding:"12px", borderRadius:"10px", border:"1px solid #fde68a", outline:"none" }}
                             value={pickupInput[b.id] || ""}
                             onChange={(e) => setPickupInput({...pickupInput, [b.id]: e.target.value})}
                           />
                           <button 
                             onClick={() => handleConfirm(b.id)}
                             disabled={confirming === b.id}
                             style={{ background:"#1B9B3A", color:"white", border:"none", padding:"12px 28px", borderRadius:"12px", fontWeight:"700", cursor:"pointer", transition:"0.2s" }}
                           >
                             {confirming === b.id ? "..." : "Approve & Notify"}
                           </button>
                         </div>
                       </div>
                    ) : (
                        <div style={{ marginTop: "16px", display: "flex", gap: "10px", alignItems: "center" }}>
                          <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Update Status:</span>
                          <select 
                            style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem" }}
                            value={b.status}
                            onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                          >
                            {Object.keys(STATUS_COLORS).map(statusKey => (
                              <option key={statusKey} value={statusKey}>{STATUS_COLORS[statusKey].label}</option>
                            ))}
                          </select>
                        </div>
                      )}
                  </div>
                );
              })
            }
          </div>
        </section>

        {/* --- PARTNERS SECTION --- */}
        <section style={{ marginBottom:"50px" }}>
          <h2 style={{ marginBottom:"20px", display:"flex", alignItems:"center", gap:"10px" }}><Handshake color="#8b5cf6" /> Professional Enrollments</h2>
          <div style={{ background:"white", borderRadius:"24px", overflow:"hidden", boxShadow:"0 10px 40px rgba(0,0,0,0.05)" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead style={{ background:"#f8fafc" }}>
                <tr>
                  <th style={{ padding:"18px 24px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Partner</th>
                  <th style={{ padding:"18px 24px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Service</th>
                  <th style={{ padding:"18px 24px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Experience</th>
                  <th style={{ padding:"18px 24px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Location</th>
                </tr>
              </thead>
              <tbody>
                {partners.length === 0 ? <tr><td colSpan={4} style={{ padding:"40px", textAlign:"center", color:"#94a3b8" }}>No partner requests yet.</td></tr> : 
                  partners.map(p => (
                    <tr key={p.id} style={{ borderBottom:"1px solid #f1f5f9" }}>
                      <td style={{ padding:"18px 24px" }}>
                        <div style={{ fontWeight:"700" }}>{p.fullName}</div>
                        <div style={{ fontSize:"0.8rem", color:"#94a3b8" }}>{p.phone}</div>
                        <div style={{ fontSize:"0.7rem", color:"#cbd5e1" }}>{formatDate(p.created_at)}</div>
                      </td>
                      <td style={{ padding:"18px 24px" }}>
                        <span style={{ background:"#f5f3ff", color:"#7c3aed", padding:"4px 10px", borderRadius:"12px", fontSize:"0.7rem", fontWeight:"700" }}>{p.serviceType}</span>
                      </td>
                      <td style={{ padding:"18px 24px" }}>
                         <div style={{ fontSize:"0.85rem", color:"#1b9b3a", fontWeight:"600" }}>{p.experience} Years</div>
                      </td>
                      <td style={{ padding:"18px 24px", fontSize:"0.9rem" }}>{p.location}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </section>

        {/* --- USERS SECTION --- */}
        <section>
          <h2 style={{ marginBottom:"20px", display:"flex", alignItems:"center", gap:"10px" }}><Users color="#009EE3" /> Registered Cloud Users</h2>
          <div style={{ background:"white", borderRadius:"24px", overflow:"hidden", boxShadow:"0 10px 40px rgba(0,0,0,0.05)" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#f8fafc", borderBottom:"1px solid #f1f5f9" }}>
                  <th style={{ padding:"18px 24px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>User Details</th>
                  <th style={{ padding:"18px 24px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Contact Info</th>
                  <th style={{ padding:"18px 24px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Join Date</th>
                  <th style={{ padding:"18px 24px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Access</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? <tr><td colSpan={4} style={{ padding:40, textAlign:"center", color:"#94a3b8" }}>No users registered in records.</td></tr> :
                  users.map(u => (
                    <tr key={u.id} style={{ borderBottom:"1px solid #f1f5f9" }}>
                      <td style={{ padding:"18px 24px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                          {u.photo_url ? <img src={u.photo_url} style={{ width:32, height:32, borderRadius:50 }} alt="" /> : <div style={{ width:32, height:32, background:"#e2e8f0", borderRadius:50 }} />}
                          <div style={{ fontWeight:"700" }}>{u.name || "New Customer"}</div>
                        </div>
                      </td>
                      <td style={{ padding:"18px 24px" }}>
                        <div style={{ fontSize:"0.9rem", color:"#475569" }}><Mail size={14} style={{ display:"inline", marginRight:6 }} /> {u.email || "N/A"}</div>
                        <div style={{ fontSize:"0.85rem", color:"#94a3b8", marginTop:4 }}><Phone size={14} style={{ display:"inline", marginRight:6 }} /> {u.phone_number || "No Phone"}</div>
                      </td>
                      <td style={{ padding:"18px 24px", fontSize:"0.85rem", color:"#64748b" }}>
                        {formatDate(u.created_at)}
                      </td>
                      <td style={{ padding:"18px 24px" }}>
                        <span style={{ padding:"4px 12px", borderRadius:"20px", fontSize:"0.65rem", fontWeight:"800", background: u.role === "admin" ? "#dcfce7" : "#f1f5f9", color: u.role === "admin" ? "#16a34a" : "#64748b" }}>
                          {(u.role || "user").toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </section>

        {/* --- GREEN CLUB REGISTRATIONS SECTION --- */}
        <section style={{ marginBottom:"50px", marginTop:"50px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"14px", marginBottom:"20px" }}>
            <div>
              <h2 style={{ margin:0, display:"flex", alignItems:"center", gap:"10px", fontSize:"1.4rem", fontWeight:"800", color:"#0f172a" }}>
                <Users color="#10b981" /> Blinklean Green Club Registrations
              </h2>
              <p style={{ margin:"4px 0 0", color:"#64748b", fontSize:"0.85rem" }}>
                Directly access uploaded member photos, contact numbers, residential addresses, and membership details.
              </p>
            </div>
            
            <div style={{ display:"flex", alignItems:"center", gap:"12px", flexWrap:"wrap" }}>
              {/* Search Box */}
              <div style={{ position:"relative", minWidth:"240px" }}>
                <Search size={16} style={{ position:"absolute", left:"12px", top:"12px", color:"#94a3b8" }} />
                <input 
                  type="text" 
                  placeholder="Search name, phone, email, task..." 
                  value={gcSearchTerm}
                  onChange={(e) => setGcSearchTerm(e.target.value)}
                  style={{ width:"100%", padding:"10px 14px 10px 36px", borderRadius:"12px", border:"1px solid #cbd5e1", outline:"none", fontSize:"0.85rem", background:"white" }}
                />
              </div>

              {/* Photo Filter Toggle */}
              <button 
                onClick={() => setGcFilterPhotoOnly(!gcFilterPhotoOnly)}
                style={{
                  display:"flex",
                  alignItems:"center",
                  gap:"6px",
                  padding:"10px 16px",
                  borderRadius:"12px",
                  border: gcFilterPhotoOnly ? "1px solid #10b981" : "1px solid #cbd5e1",
                  background: gcFilterPhotoOnly ? "#ecfdf5" : "white",
                  color: gcFilterPhotoOnly ? "#059669" : "#475569",
                  fontWeight:"700",
                  fontSize:"0.82rem",
                  cursor:"pointer",
                  transition:"0.2s"
                }}
              >
                <ImageIcon size={16} color={gcFilterPhotoOnly ? "#059669" : "#94a3b8"} />
                {gcFilterPhotoOnly ? `Photos Only (${filteredClubRegistrations.length})` : `All Members (${clubRegistrations.length})`}
              </button>
            </div>
          </div>

          <div style={{ background:"white", borderRadius:"24px", overflow:"hidden", boxShadow:"0 10px 40px rgba(0,0,0,0.05)" }}>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", minWidth:"920px" }}>
                <thead style={{ background:"#f8fafc" }}>
                  <tr>
                    <th style={{ padding:"18px 20px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase", width:"90px" }}>Member Photo</th>
                    <th style={{ padding:"18px 20px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Volunteer Details</th>
                    <th style={{ padding:"18px 20px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Contact Info</th>
                    <th style={{ padding:"18px 20px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Weekend Task</th>
                    <th style={{ padding:"18px 20px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Date & Payment</th>
                    <th style={{ padding:"18px 20px", textAlign:"right", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClubRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding:"40px", textAlign:"center", color:"#94a3b8" }}>
                        {clubRegistrations.length === 0 ? "No green club registrations yet." : "No registrations match your search criteria."}
                      </td>
                    </tr>
                  ) : (
                    filteredClubRegistrations.map(r => {
                      const photo = r.photo_url || r.photo_base64 || r.photo;
                      const hasCustomPhoto = !!photo && !photo.includes("unsplash.com/photo-1535713875002");
                      const cleanPhone = r.phone ? r.phone.replace(/[^0-9]/g, "") : "";

                      return (
                        <tr key={r.id} style={{ borderBottom:"1px solid #f1f5f9" }}>
                          {/* Member Photo Thumbnail */}
                          <td style={{ padding:"16px 20px", verticalAlign:"middle" }}>
                            <div 
                              onClick={() => setSelectedPhotoVolunteer(r)}
                              style={{ 
                                position:"relative", 
                                width:"52px", 
                                height:"52px", 
                                borderRadius:"14px", 
                                overflow:"hidden", 
                                cursor:"pointer", 
                                border: hasCustomPhoto ? "2px solid #10b981" : "2px dashed #cbd5e1",
                                background:"#f1f5f9",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                                transition:"transform 0.2s"
                              }}
                              title="Click to view & download photo"
                            >
                              {photo ? (
                                <img 
                                  src={photo} 
                                  alt={r.user_name || "Volunteer"} 
                                  style={{ width:"100%", height:"100%", objectFit:"cover" }}
                                  onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.parentNode.innerHTML = `<span style="font-size:1.1rem;font-weight:800;color:#10b981;">${(r.user_name || "V").charAt(0).toUpperCase()}</span>`;
                                  }}
                                />
                              ) : (
                                <span style={{ fontSize:"1.1rem", fontWeight:"800", color:"#64748b" }}>
                                  {(r.user_name || "V").charAt(0).toUpperCase()}
                                </span>
                              )}
                              <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"rgba(0,0,0,0.6)", color:"white", fontSize:"0.55rem", textAlign:"center", padding:"1px 0", fontWeight:"700" }}>
                                PHOTO
                              </div>
                            </div>
                          </td>

                          {/* Volunteer Details */}
                          <td style={{ padding:"16px 20px", verticalAlign:"middle" }}>
                            <div style={{ fontWeight:"800", fontSize:"0.98rem", color:"#0f172a", marginBottom:"3px" }}>
                              {r.user_name}
                            </div>
                            {r.address ? (
                              <div style={{ fontSize:"0.8rem", color:"#64748b", display:"flex", alignItems:"flex-start", gap:"4px", maxWidth:"260px" }}>
                                <MapPin size={13} style={{ flexShrink:0, marginTop:"2px", color:"#94a3b8" }} />
                                <span>{r.address}</span>
                              </div>
                            ) : (
                              <div style={{ fontSize:"0.75rem", color:"#94a3b8" }}>No address provided</div>
                            )}
                            <div style={{ fontSize:"0.7rem", color:"#cbd5e1", marginTop:"2px" }}>
                              ID: {r.id.substring(0, 8)}...
                            </div>
                          </td>

                          {/* Contact Info */}
                          <td style={{ padding:"16px 20px", verticalAlign:"middle" }}>
                            <div style={{ fontSize:"0.85rem", color:"#334155" }}>
                              <a href={`mailto:${r.email}`} style={{ color:"#0284c7", textDecoration:"none", display:"flex", alignItems:"center", gap:"6px", fontWeight:"600" }}>
                                <Mail size={13} /> {r.email}
                              </a>
                            </div>
                            <div style={{ fontSize:"0.85rem", color:"#334155", marginTop:"6px", display:"flex", alignItems:"center", gap:"8px" }}>
                              <a href={`tel:${r.phone}`} style={{ color:"#334155", textDecoration:"none", display:"flex", alignItems:"center", gap:"6px", fontWeight:"600" }}>
                                <Phone size={13} style={{ color:"#10b981" }} /> {r.phone}
                              </a>
                              {cleanPhone && (
                                <a 
                                  href={`https://wa.me/91${cleanPhone.slice(-10)}`}
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  style={{ background:"#dcfce7", color:"#16a34a", padding:"2px 6px", borderRadius:"6px", fontSize:"0.7rem", textDecoration:"none", fontWeight:"700", display:"inline-flex", alignItems:"center", gap:"3px" }}
                                  title="Chat on WhatsApp"
                                >
                                  <MessageCircle size={11} /> WA
                                </a>
                              )}
                            </div>
                          </td>

                          {/* Selected Task */}
                          <td style={{ padding:"16px 20px", verticalAlign:"middle" }}>
                            <span style={{ background:"#e6fcf5", color:"#0ca678", padding:"4px 10px", borderRadius:"12px", fontSize:"0.75rem", fontWeight:"700", display:"inline-block" }}>
                              {r.event_title || "Lifetime Membership"}
                            </span>
                            <div style={{ fontSize:"0.7rem", color:"#94a3b8", marginTop:4 }}>
                              Event ID: {r.event_id || "N/A"}
                            </div>
                          </td>

                          {/* Registration Date & Payment */}
                          <td style={{ padding:"16px 20px", verticalAlign:"middle" }}>
                            <div style={{ fontSize:"0.85rem", color:"#334155", fontWeight:"600" }}>
                              {formatDate(r.created_at)}
                            </div>
                            <div style={{ marginTop:"4px" }}>
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
                            </div>
                          </td>

                          {/* Direct Actions */}
                          <td style={{ padding:"16px 20px", textAlign:"right", verticalAlign:"middle" }}>
                            <div style={{ display:"inline-flex", alignItems:"center", gap:"6px" }}>
                              <button 
                                onClick={() => setSelectedPhotoVolunteer(r)}
                                style={{ 
                                  display:"flex", 
                                  alignItems:"center", 
                                  gap:"4px", 
                                  background:"#ecfdf5", 
                                  color:"#059669", 
                                  border:"1px solid #a7f3d0", 
                                  padding:"6px 12px", 
                                  borderRadius:"8px", 
                                  fontSize:"0.78rem", 
                                  fontWeight:"700", 
                                  cursor:"pointer" 
                                }}
                                title="View Member Photo & Full Profile"
                              >
                                <Eye size={14} /> View Photo
                              </button>

                              {photo && (
                                <button 
                                  onClick={() => handleDownloadPhoto(photo, r.user_name)}
                                  style={{ 
                                    background:"#f0f9ff", 
                                    color:"#0284c7", 
                                    border:"1px solid #bae6fd", 
                                    padding:"6px 10px", 
                                    borderRadius:"8px", 
                                    fontSize:"0.78rem", 
                                    fontWeight:"700", 
                                    cursor:"pointer" 
                                  }}
                                  title="Download Member Photo"
                                >
                                  <Download size={14} />
                                </button>
                              )}

                              <button 
                                onClick={() => handleDeleteDoc("green_club_registrations", r.id)}
                                style={{ 
                                  background:"#fee2e2", 
                                  color:"#ef4444", 
                                  border:"none", 
                                  padding:"6px 8px", 
                                  borderRadius:"8px", 
                                  cursor:"pointer" 
                                }}
                                title="Delete Registration"
                              >
                                <Trash2 size={14} />
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
          </div>
        </section>

        {/* --- WEEKLY NEWS & SOCIETY GAZETTE STUDIO SECTION --- */}
        <section style={{ marginBottom: "50px" }}>
          {/* Header Banner & Controls */}
          <div style={{ 
            background: "linear-gradient(135deg, #009ee3 0%, #0369a1 100%)", 
            padding: "26px 30px", 
            borderRadius: "24px", 
            color: "white", 
            marginBottom: "25px", 
            boxShadow: "0 10px 30px rgba(0, 158, 227, 0.15)" 
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.2)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  <Sparkles size={14} /> Society Newsroom Dispatch Studio
                </div>
                <h2 style={{ color: "white", margin: "8px 0 4px", fontSize: "1.6rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "10px" }}>
                  <Newspaper size={26} color="white" /> Weekly News & Society Gazette Management
                </h2>
                <p style={{ color: "rgba(255,255,255,0.85)", margin: 0, fontSize: "0.88rem" }}>
                  Compose and publish weekly bulletins covering all fields in society with cover photos, multi-image field galleries, and detailed breakdowns.
                </p>
              </div>

              {/* View / Studio Toggle Buttons */}
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
                    gap: "6px",
                    transition: "0.2s"
                  }}
                >
                  <Plus size={16} /> Publish New Bulletin
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
                    gap: "6px",
                    transition: "0.2s"
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
                  <Globe size={16} /> Live Hub ↗
                </a>
              </div>
            </div>
          </div>

          {/* TAB 1: PUBLISH STUDIO FORM */}
          {newsStudioTab === "publish" && (
            <div style={{ background: "white", padding: "32px", borderRadius: "24px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
              <h3 style={{ margin: "0 0 20px", fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", display: "flex", alignItems: "center", gap: "8px" }}>
                <FileText size={20} color="#009ee3" /> Weekly News Composer Studio
              </h3>

              <form onSubmit={handleNewsSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "25px" }}>
                  
                  {/* Left Column: Article Metadata & Body */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    
                    {/* Headline */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>
                        Article Headline / News Title *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mega Clean City Drive & Smart Segregation Launched in Bengaluru"
                        required
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        style={{ width: "100%", padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: "12px", outline: "none", fontSize: "0.95rem", fontWeight: "600" }}
                      />
                    </div>

                    {/* Category Selector & Edition */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>
                          Field in Society *
                        </label>
                        <select
                          value={newsCategory}
                          onChange={(e) => setNewsCategory(e.target.value)}
                          style={{ width: "100%", padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: "12px", outline: "none", fontSize: "0.9rem", fontWeight: "600", background: "white" }}
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
                          placeholder="e.g. Week 3, August 2026"
                          required
                          value={newsEdition}
                          onChange={(e) => setNewsEdition(e.target.value)}
                          style={{ width: "100%", padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: "12px", outline: "none", fontSize: "0.9rem" }}
                        />
                      </div>
                    </div>

                    {/* Author, Date, Read Time */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>Author/Source</label>
                        <input
                          type="text"
                          placeholder="Editorial Team"
                          value={newsAuthor}
                          onChange={(e) => setNewsAuthor(e.target.value)}
                          style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "10px", outline: "none", fontSize: "0.85rem" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>Publication Date</label>
                        <input
                          type="text"
                          placeholder="Aug 20, 2026"
                          value={newsDate}
                          onChange={(e) => setNewsDate(e.target.value)}
                          style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "10px", outline: "none", fontSize: "0.85rem" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>Read Time</label>
                        <input
                          type="text"
                          placeholder="4 min read"
                          value={newsReadTime}
                          onChange={(e) => setNewsReadTime(e.target.value)}
                          style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "10px", outline: "none", fontSize: "0.85rem" }}
                        />
                      </div>
                    </div>

                    {/* Lead Summary */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>
                        Lead Summary / Executive Abstract *
                      </label>
                      <textarea
                        placeholder="Provide a concise 1-2 sentence lead overview highlighting the core news development..."
                        required
                        value={newsSummary}
                        onChange={(e) => setNewsSummary(e.target.value)}
                        style={{ width: "100%", height: "85px", padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: "12px", outline: "none", fontSize: "0.9rem", fontFamily: "inherit" }}
                      />
                    </div>

                    {/* Full Content */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>
                        Full News Article Body * (Separate paragraphs with double Enter)
                      </label>
                      <textarea
                        placeholder="Write the comprehensive news story here with detailed facts, background context, quotes, impact data, and civic outcomes..."
                        required
                        value={newsContent}
                        onChange={(e) => setNewsContent(e.target.value)}
                        style={{ width: "100%", height: "180px", padding: "14px", border: "1px solid #cbd5e1", borderRadius: "12px", outline: "none", fontSize: "0.92rem", fontFamily: "inherit", lineHeight: "1.6" }}
                      />
                    </div>

                  </div>

                  {/* Right Column: Visuals & Relevant Images & Takeaways */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    
                    {/* Primary Cover Image */}
                    <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#0f172a", marginBottom: "6px", textTransform: "uppercase" }}>
                        📷 1. Primary Feature Cover Image
                      </label>
                      
                      <div style={{ border: "2px dashed #cbd5e1", padding: "14px", borderRadius: "12px", textAlign: "center", background: "white", cursor: "pointer", position: "relative", marginBottom: "10px" }}>
                        <UploadCloud size={24} style={{ color: "#009ee3", marginBottom: "4px" }} />
                        <p style={{ margin: 0, fontSize: "0.8rem", color: "#475569", fontWeight: "600" }}>
                          {newsCoverFile ? newsCoverFile.name : "Choose Cover JPG / PNG file"}
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
                        placeholder="Or paste Direct Image URL Fallback (https://...)"
                        value={newsCoverUrl}
                        onChange={(e) => setNewsCoverUrl(e.target.value)}
                        style={{ width: "100%", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", outline: "none", fontSize: "0.82rem" }}
                      />
                    </div>

                    {/* Relevant Images Gallery (Multiple Uploads) */}
                    <div style={{ background: "#f8fafc", padding: "18px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <label style={{ fontSize: "0.75rem", fontWeight: "800", color: "#0f172a", textTransform: "uppercase" }}>
                          🖼️ 2. Relevant Field Images Gallery ({newsGalleryFiles.length} Selected)
                        </label>
                        {newsGalleryFiles.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setNewsGalleryFiles([])}
                            style={{ background: "none", border: "none", color: "#ef4444", fontSize: "0.75rem", fontWeight: "700", cursor: "pointer" }}
                          >
                            Clear All
                          </button>
                        )}
                      </div>
                      
                      <div style={{ border: "2px dashed #93c5fd", padding: "14px", borderRadius: "12px", textAlign: "center", background: "#f0f9ff", cursor: "pointer", position: "relative", marginBottom: "10px" }}>
                        <Images size={24} style={{ color: "#0284c7", marginBottom: "4px" }} />
                        <p style={{ margin: 0, fontSize: "0.8rem", color: "#0369a1", fontWeight: "700" }}>
                          Upload Multiple Relevant Images (Select 1 to 5 photos)
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

                      {/* Selected Gallery Files Thumbnails */}
                      {newsGalleryFiles.length > 0 && (
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
                          {newsGalleryFiles.map((f, idx) => (
                            <span key={idx} style={{ background: "white", padding: "4px 8px", borderRadius: "6px", fontSize: "0.72rem", border: "1px solid #cbd5e1", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              {f.name.substring(0, 14)}...
                            </span>
                          ))}
                        </div>
                      )}

                      <textarea
                        placeholder="Or enter additional Image URLs (one per line or separated by comma)..."
                        value={newsGalleryUrls}
                        onChange={(e) => setNewsGalleryUrls(e.target.value)}
                        style={{ width: "100%", height: "60px", padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "8px", outline: "none", fontSize: "0.82rem", fontFamily: "inherit" }}
                      />
                    </div>

                    {/* Key Highlights / Takeaways */}
                    <div>
                      <label style={{ display: "block", fontSize: "0.75rem", fontWeight: "800", color: "#475569", marginBottom: "6px", textTransform: "uppercase" }}>
                        📌 Key Highlights / Takeaways (One per line)
                      </label>
                      <textarea
                        placeholder="• Over 25,000 volunteers adopted green corridors&#10;• Smart real-time water quality sensors deployed&#10;• Significant reduction in municipal landfill waste"
                        value={newsTakeaways}
                        onChange={(e) => setNewsTakeaways(e.target.value)}
                        style={{ width: "100%", height: "80px", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "10px", outline: "none", fontSize: "0.85rem", fontFamily: "inherit" }}
                      />
                    </div>

                    {/* Tags & Featured Checkbox */}
                    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "10px", alignItems: "center" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "0.72rem", fontWeight: "800", color: "#475569", marginBottom: "4px", textTransform: "uppercase" }}>
                          Topic Tags (Comma Separated)
                        </label>
                        <input
                          type="text"
                          placeholder="Ecology, MicroForest, Bengaluru"
                          value={newsTags}
                          onChange={(e) => setNewsTags(e.target.value)}
                          style={{ width: "100%", padding: "10px 12px", border: "1px solid #cbd5e1", borderRadius: "10px", outline: "none", fontSize: "0.85rem" }}
                        />
                      </div>

                      <div style={{ background: "#f8fafc", padding: "10px 12px", borderRadius: "10px", border: "1px solid #e2e8f0", marginTop: "16px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                          <input
                            type="checkbox"
                            checked={newsIsFeatured}
                            onChange={(e) => setNewsIsFeatured(e.target.checked)}
                            style={{ width: "16px", height: "16px", accentColor: "#009ee3" }}
                          />
                          ⭐ Spotlight Story
                        </label>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={newsUploading}
                      style={{
                        width: "100%",
                        background: "linear-gradient(135deg, #009ee3 0%, #0284c7 100%)",
                        color: "white",
                        border: "none",
                        padding: "15px 24px",
                        borderRadius: "14px",
                        fontWeight: "800",
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 8px 24px rgba(0, 158, 227, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        marginTop: "10px"
                      }}
                    >
                      <Newspaper size={18} />
                      {newsUploading ? "Publishing Bulletin & Processing Visuals..." : "Publish Weekly News Bulletin"}
                    </button>

                  </div>

                </div>
              </form>
            </div>
          )}

          {/* TAB 2: GAZETTE ARCHIVE & RELEVANT IMAGES MANAGEMENT */}
          {newsStudioTab === "manage" && (
            <div style={{ background: "white", borderRadius: "24px", padding: "28px", boxShadow: "0 10px 40px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
              
              {/* Archive Search & Filter Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "24px" }}>
                <div style={{ position: "relative", minWidth: "260px" }}>
                  <Search size={16} style={{ position: "absolute", left: "14px", top: "12px", color: "#94a3b8" }} />
                  <input
                    type="text"
                    placeholder="Search archive by title, author, tag..."
                    value={newsSearchTerm}
                    onChange={(e) => setNewsSearchTerm(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px 10px 38px", borderRadius: "12px", border: "1px solid #cbd5e1", outline: "none", fontSize: "0.85rem" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {["all", "environment", "tech", "society", "health", "urban", "economy"].map(catKey => (
                    <button
                      key={catKey}
                      onClick={() => setNewsCategoryFilter(catKey)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "20px",
                        border: newsCategoryFilter === catKey ? "1px solid #009ee3" : "1px solid #e2e8f0",
                        background: newsCategoryFilter === catKey ? "#e0f2fe" : "white",
                        color: newsCategoryFilter === catKey ? "#0369a1" : "#64748b",
                        fontSize: "0.75rem",
                        fontWeight: "700",
                        cursor: "pointer"
                      }}
                    >
                      {catKey.charAt(0).toUpperCase() + catKey.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Archive Grid */}
              {filteredWeeklyNews.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#94a3b8" }}>
                  <Newspaper size={40} style={{ margin: "0 auto 10px" }} />
                  <p style={{ margin: 0 }}>No news bulletins match your criteria.</p>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
                  {filteredWeeklyNews.map(item => (
                    <div
                      key={item.id}
                      style={{
                        background: "#f8fafc",
                        borderRadius: "18px",
                        border: "1px solid #e2e8f0",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.02)"
                      }}
                    >
                      <div>
                        {/* Cover Image */}
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

                        {/* Card Content */}
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

                      {/* Card Actions Footer */}
                      <div style={{ padding: "12px 16px", background: "white", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button
                          onClick={() => setSelectedNewsPreview(item)}
                          style={{
                            background: "#e0f2fe",
                            color: "#0369a1",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontSize: "0.78rem",
                            fontWeight: "700",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px"
                          }}
                        >
                          <Eye size={13} /> Preview
                        </button>

                        <div style={{ display: "flex", gap: "6px" }}>
                          <a
                            href={`/weekly-news/${item.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              background: "#f1f5f9",
                              color: "#475569",
                              textDecoration: "none",
                              padding: "6px 10px",
                              borderRadius: "8px",
                              fontSize: "0.78rem",
                              fontWeight: "700",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px"
                            }}
                            title="Open in Public Gazette"
                          >
                            <ExternalLink size={13} />
                          </a>

                          <button
                            onClick={() => handleDeleteDoc("weekly_news", item.id)}
                            style={{
                              background: "#fee2e2",
                              color: "#ef4444",
                              border: "none",
                              padding: "6px 10px",
                              borderRadius: "8px",
                              cursor: "pointer"
                            }}
                            title="Delete Article"
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

        {/* --- GREEN CLUB EVENT & BLOGS UPLOAD MANAGEMENT --- */}
        <section style={{ marginBottom:"50px" }}>
          <h2 style={{ marginBottom:"20px", display:"flex", alignItems:"center", gap:"10px" }}><PlusCircle color="#10b981" /> Green Club Content Uploads</h2>
          
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(350px, 1fr))", gap:"30px" }}>
            {/* Upload Forms (Left Col) */}
            <div style={{ display:"flex", flexDirection:"column", gap:"30px" }}>
              
              {/* Add Event Form */}
              <div style={{ background:"white", padding:"28px", borderRadius:"24px", boxShadow:"0 4px 20px rgba(0,0,0,0.03)" }}>
                <h3 style={{ marginBottom:"20px", display:"flex", alignItems:"center", gap:"8px", fontSize:"1.2rem", fontWeight:"800", color:"#1e293b" }}>
                  <Calendar size={18} color="#10b981" /> Schedule Weekend Task (Event)
                </h3>
                <form onSubmit={handleEventSubmit}>
                  <div style={{ marginBottom:"14px" }}>
                    <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Task Title</label>
                    <input type="text" placeholder="e.g. Lake Sanitation & Eco-Cleanup" required style={{ width:"100%", padding:"10px 14px", border:"1px solid #cbd5e1", borderRadius:"10px", outline:"none" }} value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
                  </div>
                  <div style={{ marginBottom:"14px" }}>
                    <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Description</label>
                    <textarea placeholder="Outline task goals, tools provided..." required style={{ width:"100%", padding:"10px 14px", border:"1px solid #cbd5e1", borderRadius:"10px", outline:"none", height:"80px", fontFamily:"inherit" }} value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"14px" }}>
                    <div>
                      <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Date/Timing</label>
                      <input type="text" placeholder="e.g. Saturday, June 27" required style={{ width:"100%", padding:"10px 14px", border:"1px solid #cbd5e1", borderRadius:"10px", outline:"none" }} value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                    </div>
                    <div>
                      <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Tag</label>
                      <input type="text" placeholder="e.g. Lake Clean-Up" style={{ width:"100%", padding:"10px 14px", border:"1px solid #cbd5e1", borderRadius:"10px", outline:"none" }} value={eventTag} onChange={(e) => setEventTag(e.target.value)} />
                    </div>
                  </div>
                  <div style={{ marginBottom:"14px" }}>
                    <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Meeting Location</label>
                    <input type="text" placeholder="e.g. Ulsoor Lake Gate, Bengaluru" required style={{ width:"100%", padding:"10px 14px", border:"1px solid #cbd5e1", borderRadius:"10px", outline:"none" }} value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
                  </div>
                  <div style={{ marginBottom:"14px" }}>
                    <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Upload Cover Image</label>
                    <div style={{ border:"2px dashed #cbd5e1", padding:"14px", borderRadius:"10px", textAlign:"center", background:"#f8fafc", cursor:"pointer", position:"relative" }}>
                      <UploadCloud size={24} style={{ color:"#94a3b8", marginBottom:"4px" }} />
                      <p style={{ margin:0, fontSize:"0.8rem", color:"#64748b" }}>{eventImageFile ? eventImageFile.name : "Select JPG/PNG image file"}</p>
                      <input type="file" accept="image/*" onChange={(e) => setEventImageFile(e.target.files[0])} style={{ position:"absolute", top:0, left:0, right:0, bottom:0, opacity:0, cursor:"pointer" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom:"20px" }}>
                    <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Or Image URL Fallback</label>
                    <input type="text" placeholder="https://images.unsplash.com/..." style={{ width:"100%", padding:"10px 14px", border:"1px solid #cbd5e1", borderRadius:"10px", outline:"none" }} value={eventImageUrl} onChange={(e) => setEventImageUrl(e.target.value)} />
                  </div>
                  <button type="submit" disabled={eventUploading} style={{ width:"100%", background:"linear-gradient(135deg, #10b981, #059669)", color:"white", border:"none", padding:"12px 20px", borderRadius:"10px", fontWeight:"700", cursor:"pointer" }}>
                    {eventUploading ? "Scheduling Event..." : "Add Weekend Task"}
                  </button>
                </form>
              </div>

              {/* Add Blog Form */}
              <div style={{ background:"white", padding:"28px", borderRadius:"24px", boxShadow:"0 4px 20px rgba(0,0,0,0.03)" }}>
                <h3 style={{ marginBottom:"20px", display:"flex", alignItems:"center", gap:"8px", fontSize:"1.2rem", fontWeight:"800", color:"#1e293b" }}>
                  <BookOpen size={18} color="#10b981" /> Publish Green Activity Blog
                </h3>
                <form onSubmit={handleBlogSubmit}>
                  <div style={{ marginBottom:"14px" }}>
                    <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Blog Title</label>
                    <input type="text" placeholder="e.g. Diverting plastic loops at our hubs" required style={{ width:"100%", padding:"10px 14px", border:"1px solid #cbd5e1", borderRadius:"10px", outline:"none" }} value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
                  </div>
                  <div style={{ marginBottom:"14px" }}>
                    <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Summary / Subtitle</label>
                    <input type="text" placeholder="A brief sentence summary..." required style={{ width:"100%", padding:"10px 14px", border:"1px solid #cbd5e1", borderRadius:"10px", outline:"none" }} value={blogSummary} onChange={(e) => setBlogSummary(e.target.value)} />
                  </div>
                  <div style={{ marginBottom:"14px" }}>
                    <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Full Article Content</label>
                    <textarea placeholder="Describe the drive activity, total waste collected, details..." required style={{ width:"100%", padding:"10px 14px", border:"1px solid #cbd5e1", borderRadius:"10px", outline:"none", height:"100px", fontFamily:"inherit" }} value={blogContent} onChange={(e) => setBlogContent(e.target.value)} />
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"14px" }}>
                    <div>
                      <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Author Name</label>
                      <input type="text" placeholder="e.g. Arun Kumar" style={{ width:"100%", padding:"10px 14px", border:"1px solid #cbd5e1", borderRadius:"10px", outline:"none" }} value={blogAuthor} onChange={(e) => setBlogAuthor(e.target.value)} />
                    </div>
                    <div>
                      <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Date Published</label>
                      <input type="text" placeholder="e.g. June 15, 2026" style={{ width:"100%", padding:"10px 14px", border:"1px solid #cbd5e1", borderRadius:"10px", outline:"none" }} value={blogDate} onChange={(e) => setBlogDate(e.target.value)} />
                    </div>
                  </div>
                  <div style={{ marginBottom:"14px" }}>
                    <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Upload Cover Image</label>
                    <div style={{ border:"2px dashed #cbd5e1", padding:"14px", borderRadius:"10px", textAlign:"center", background:"#f8fafc", cursor:"pointer", position:"relative" }}>
                      <UploadCloud size={24} style={{ color:"#94a3b8", marginBottom:"4px" }} />
                      <p style={{ margin:0, fontSize:"0.8rem", color:"#64748b" }}>{blogImageFile ? blogImageFile.name : "Select JPG/PNG image file"}</p>
                      <input type="file" accept="image/*" onChange={(e) => setBlogImageFile(e.target.files[0])} style={{ position:"absolute", top:0, left:0, right:0, bottom:0, opacity:0, cursor:"pointer" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom:"20px" }}>
                    <label style={{ display:"block", fontSize:"0.75rem", fontWeight:"800", color:"#475569", marginBottom:"6px", textTransform:"uppercase" }}>Or Image URL Fallback</label>
                    <input type="text" placeholder="https://images.unsplash.com/..." style={{ width:"100%", padding:"10px 14px", border:"1px solid #cbd5e1", borderRadius:"10px", outline:"none" }} value={blogImageUrl} onChange={(e) => setBlogImageUrl(e.target.value)} />
                  </div>
                  <button type="submit" disabled={blogUploading} style={{ width:"100%", background:"linear-gradient(135deg, #10b981, #059669)", color:"white", border:"none", padding:"12px 20px", borderRadius:"10px", fontWeight:"700", cursor:"pointer" }}>
                    {blogUploading ? "Publishing Blog..." : "Publish Green Blog"}
                  </button>
                </form>
              </div>

            </div>

            {/* List & Deletion Panels (Right Col) */}
            <div style={{ display:"flex", flexDirection:"column", gap:"30px" }}>
              
              {/* Events Management List */}
              <div style={{ background:"white", padding:"28px", borderRadius:"24px", boxShadow:"0 4px 20px rgba(0,0,0,0.03)" }}>
                <h3 style={{ marginBottom:"20px", display:"flex", alignItems:"center", gap:"8px", fontSize:"1.2rem", fontWeight:"800", color:"#1e293b" }}>
                  <Calendar size={18} color="#10b981" /> Scheduled Events ({clubEvents.length})
                </h3>
                <div style={{ display:"flex", flexDirection:"column", gap:"12px", maxHeight:"450px", overflowY:"auto" }}>
                  {clubEvents.length === 0 ? <p style={{ color:"#94a3b8", fontSize:"0.9rem", textAlign:"center", padding:"20px" }}>No events scheduled in Firestore.</p> :
                    clubEvents.map(ev => (
                      <div key={ev.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px", background:"#f8fafc", borderRadius:"12px", border:"1px solid #f1f5f9" }}>
                        <div style={{ flex:1, paddingRight:"10px" }}>
                          <span style={{ background:"#e6fcf5", color:"#0ca678", padding:"2px 8px", borderRadius:"10px", fontSize:"0.65rem", fontWeight:"800", textTransform:"uppercase" }}>{ev.tag}</span>
                          <h4 style={{ margin:"4px 0", fontSize:"0.95rem", fontWeight:"800" }}>{ev.title}</h4>
                          <p style={{ margin:0, fontSize:"0.8rem", color:"#64748b" }}>{ev.date} | {ev.location.split(",")[0]}</p>
                        </div>
                        <button onClick={() => handleDeleteDoc("green_club_events", ev.id)} style={{ background:"#fee2e2", border:"none", padding:"8px", borderRadius:"8px", cursor:"pointer", color:"#ef4444" }} title="Delete Event">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>

              {/* Blogs Management List */}
              <div style={{ background:"white", padding:"28px", borderRadius:"24px", boxShadow:"0 4px 20px rgba(0,0,0,0.03)" }}>
                <h3 style={{ marginBottom:"20px", display:"flex", alignItems:"center", gap:"8px", fontSize:"1.2rem", fontWeight:"800", color:"#1e293b" }}>
                  <BookOpen size={18} color="#10b981" /> Published Blogs ({clubBlogs.length})
                </h3>
                <div style={{ display:"flex", flexDirection:"column", gap:"12px", maxHeight:"450px", overflowY:"auto" }}>
                  {clubBlogs.length === 0 ? <p style={{ color:"#94a3b8", fontSize:"0.9rem", textAlign:"center", padding:"20px" }}>No published blogs in Firestore.</p> :
                    clubBlogs.map(bl => (
                      <div key={bl.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px", background:"#f8fafc", borderRadius:"12px", border:"1px solid #f1f5f9" }}>
                        <div style={{ flex:1, paddingRight:"10px" }}>
                          <h4 style={{ margin:"0 0 4px 0", fontSize:"0.95rem", fontWeight:"800" }}>{bl.title}</h4>
                          <p style={{ margin:0, fontSize:"0.8rem", color:"#64748b" }}>By {bl.author} | {bl.date}</p>
                        </div>
                        <button onClick={() => handleDeleteDoc("green_club_blogs", bl.id)} style={{ background:"#fee2e2", border:"none", padding:"8px", borderRadius:"8px", cursor:"pointer", color:"#ef4444" }} title="Delete Blog">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  }
                </div>
              </div>

            </div>
          </div>

        </section>

      </div>

      {/* --- PHOTO & VOLUNTEER DETAILS INSPECTION MODAL --- */}
      {selectedPhotoVolunteer && (
        <div 
          className="modal-overlay" 
          style={{ 
            position:"fixed", 
            top:0, 
            left:0, 
            right:0, 
            bottom:0, 
            background:"rgba(15, 23, 42, 0.75)", 
            backdropFilter:"blur(6px)", 
            zIndex:9999, 
            display:"flex", 
            alignItems:"center", 
            justifyContent:"center",
            padding:"20px"
          }}
          onClick={() => setSelectedPhotoVolunteer(null)}
        >
          <div 
            style={{ 
              background:"white", 
              borderRadius:"24px", 
              maxWidth:"680px", 
              width:"100%", 
              boxShadow:"0 25px 60px rgba(0,0,0,0.25)", 
              overflow:"hidden",
              position:"relative",
              animation:"fadeIn 0.2s ease-out"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding:"20px 24px", background:"linear-gradient(135deg, #10b981, #059669)", color:"white", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <Users size={22} color="white" />
                <h3 style={{ margin:0, fontSize:"1.2rem", fontWeight:"800", color:"white" }}>Green Club Member Photo & Details</h3>
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
              
              {/* Photo Display Card */}
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

                {/* Photo Action Links */}
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
                      <Download size={14} /> Download Photo
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
                    href={`https://wa.me/91${selectedPhotoVolunteer.phone.replace(/[^0-9]/g, "").slice(-10)}`}
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

      {/* --- WEEKLY NEWS ARTICLE ADMIN PREVIEW MODAL --- */}
      {selectedNewsPreview && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
          onClick={() => setSelectedNewsPreview(null)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              maxWidth: "760px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
              position: "relative"
            }}
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
