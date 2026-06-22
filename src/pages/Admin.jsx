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
  Trash2
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
  const [clubRegistrations, setClubRegistrations] = useState([]);
  const [clubEvents,        setClubEvents]        = useState([]);
  const [clubBlogs,         setClubBlogs]         = useState([]);

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

  const formatDate = (ts) => {
    if (!ts) return "N/A";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString("en-IN", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" });
  };

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
            { label:"Green Registrations", value:clubRegistrations.length, color:"#10b981", bg:"#f0fdf4", icon:<Users /> },
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
          <h2 style={{ marginBottom:"20px", display:"flex", alignItems:"center", gap:"10px" }}><Users color="#10b981" /> Blinklean Green Club Registrations</h2>
          <div style={{ background:"white", borderRadius:"24px", overflow:"hidden", boxShadow:"0 10px 40px rgba(0,0,0,0.05)" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead style={{ background:"#f8fafc" }}>
                <tr>
                  <th style={{ padding:"18px 24px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Volunteer Details</th>
                  <th style={{ padding:"18px 24px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Contact Info</th>
                  <th style={{ padding:"18px 24px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Selected Weekend Task</th>
                  <th style={{ padding:"18px 24px", textAlign:"left", fontSize:"0.75rem", color:"#94a3b8", textTransform:"uppercase" }}>Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {clubRegistrations.length === 0 ? <tr><td colSpan={4} style={{ padding:"40px", textAlign:"center", color:"#94a3b8" }}>No green club registrations yet.</td></tr> : 
                  clubRegistrations.map(r => (
                    <tr key={r.id} style={{ borderBottom:"1px solid #f1f5f9" }}>
                      <td style={{ padding:"18px 24px" }}>
                        <div style={{ fontWeight:"700" }}>{r.user_name}</div>
                      </td>
                      <td style={{ padding:"18px 24px" }}>
                        <div style={{ fontSize:"0.9rem", color:"#475569" }}><Mail size={14} style={{ display:"inline", marginRight:6 }} /> {r.email}</div>
                        <div style={{ fontSize:"0.85rem", color:"#94a3b8", marginTop:4 }}><Phone size={14} style={{ display:"inline", marginRight:6 }} /> {r.phone}</div>
                      </td>
                      <td style={{ padding:"18px 24px" }}>
                        <span style={{ background:"#e6fcf5", color:"#0ca678", padding:"4px 10px", borderRadius:"12px", fontSize:"0.75rem", fontWeight:"700" }}>{r.event_title}</span>
                        <div style={{ fontSize:"0.7rem", color:"#94a3b8", marginTop:4 }}>ID: {r.event_id}</div>
                      </td>
                      <td style={{ padding:"18px 24px", fontSize:"0.85rem", color:"#64748b" }}>
                        {formatDate(r.created_at)}
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
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
    </div>
  );
};

export default Admin;
