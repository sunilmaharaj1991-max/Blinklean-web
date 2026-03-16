import React, { useState, useEffect, useCallback } from "react";
import { auth, db } from "../firebase";
import { collection, query, getDocs, orderBy, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const STATUS_COLORS = {
  PENDING_APPROVAL: { bg: "#fef3c7", color: "#f59e0b", label: "Pending Approval" },
  CONFIRMED:        { bg: "#dcfce7", color: "#1B9B3A", label: "Confirmed" },
  PICKUP_SCHEDULED: { bg: "#e0f2fe", color: "#009EE3", label: "Pickup Scheduled" },
  COLLECTED:        { bg: "#ede9fe", color: "#8b5cf6", label: "Collected" },
  COMPLETED:        { bg: "#f0fdf4", color: "#16a34a", label: "Completed" },
  CANCELLED:        { bg: "#fee2e2", color: "#ef4444", label: "Cancelled" },
};

const Admin = () => {
  const [users,        setUsers]        = useState([]);
  const [bookings,     setBookings]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [confirming,   setConfirming]   = useState(null); // bookingId being confirmed
  const [pickupInput,  setPickupInput]  = useState({});   // { [id]: timing string }
  const navigate = useNavigate();

  // Fetch all bookings from PostgreSQL backend
  const fetchBookings = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/scrap/all-bookings`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  }, []);

  // Fetch users from Firestore (Firebase Auth — kept for user management only)
  const fetchUsers = useCallback(async () => {
    try {
      const usersQuery = query(collection(db, "users"), orderBy("lastLogin", "desc"));
      const snap = await getDocs(usersQuery);
      setUsers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }, []);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchBookings(), fetchUsers()]);
    setLoading(false);
  }, [fetchBookings, fetchUsers]);

  useEffect(() => {
    const checkAuth = async (user) => {
      if (!user) { navigate("/login"); return; }
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAuthorized(true);
          fetchAll();
        } else {
          setIsAuthorized(false);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    const unsub = auth.onAuthStateChanged(checkAuth);
    return () => unsub();
  }, [navigate, fetchAll]);

  // Confirm booking — sets CONFIRMED + triggers backend SMS log
  const handleConfirm = async (bookingId) => {
    const timing = pickupInput[bookingId] || "10:00 AM – 1:00 PM Tomorrow";
    setConfirming(bookingId);
    try {
      const res = await fetch(`${API_BASE}/scrap/booking/${bookingId}/confirm`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pickupTiming: timing }),
      });
      if (!res.ok) throw new Error("Confirm failed");
      const updated = await res.json();
      alert(`✅ Booking #${String(bookingId).padStart(4,"0")} CONFIRMED!\n\n📱 SMS sent to ${updated.phone_number}:\n"Dear ${updated.user_name}, your Blinklean scrap pickup is confirmed for ${timing}. Thank you! 🌱"`);
      await fetchBookings();
    } catch (err) {
      alert("Failed to confirm booking. Please try again.");
      console.error(err);
    } finally {
      setConfirming(null);
    }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleString("en-IN", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }) : "N/A";

  /* ---- Loading Screen ---- */
  if (loading) return (
    <div style={{ display:"flex", height:"100vh", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"16px" }}>
      <div style={{ width:"44px", height:"44px", border:"4px solid #bae6fd", borderTopColor:"#009EE3", borderRadius:"50%", animation:"spin 0.9s linear infinite" }} />
      <p style={{ color:"#64748b", fontWeight:600 }}>Verifying Admin Credentials...</p>
      <style>{`@keyframes spin { to { transform:rotate(360deg); } }`}</style>
    </div>
  );

  /* ---- Access Denied ---- */
  if (!isAuthorized) return (
    <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f8fafc" }}>
      <div style={{ background:"white", padding:"50px", borderRadius:"24px", textAlign:"center", maxWidth:"500px", boxShadow:"0 20px 60px rgba(0,0,0,0.1)" }}>
        <div style={{ fontSize:"4rem", marginBottom:"16px" }}>🚫</div>
        <h2 style={{ color:"#ef4444", margin:"0 0 10px" }}>Access Denied</h2>
        <p style={{ color:"#64748b", marginBottom:"30px" }}>Only authorized admins can access this portal. Ensure your account has admin privileges in the database.</p>
        <button style={{ padding:"12px 28px", background:"#009EE3", color:"white", border:"none", borderRadius:"12px", cursor:"pointer", fontWeight:"700", marginRight:"10px" }} onClick={() => navigate("/")}>Go Home</button>
        <button style={{ padding:"12px 28px", background:"#f1f5f9", color:"#475569", border:"none", borderRadius:"12px", cursor:"pointer", fontWeight:"700" }} onClick={() => auth.signOut()}>Logout</button>
      </div>
    </div>
  );

  const pending   = bookings.filter(b => b.status === "PENDING_APPROVAL");
  const confirmed = bookings.filter(b => b.status === "CONFIRMED");

  return (
    <div style={{ minHeight:"100vh", background:"#f4fbff", fontFamily:"Inter, sans-serif" }}>
      
      {/* ---- Top Header ---- */}
      <div style={{ background:"linear-gradient(135deg, #009EE3, #1B9B3A)", padding:"28px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"16px" }}>
        <div>
          <span style={{ background:"rgba(255,255,255,0.2)", border:"1px solid rgba(255,255,255,0.3)", color:"white", padding:"4px 12px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:"700", letterSpacing:"1px" }}>ADMIN PORTAL</span>
          <h1 style={{ color:"white", marginTop:"8px", marginBottom:"4px", fontSize:"1.8rem", fontWeight:"800" }}>Blinklean Dashboard</h1>
          <p style={{ color:"rgba(255,255,255,0.8)", margin:0, fontSize:"0.9rem" }}>{auth.currentUser?.email}</p>
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <button onClick={fetchAll} style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", color:"white", padding:"10px 20px", borderRadius:"12px", cursor:"pointer", fontWeight:"600" }}>
            ↻ Refresh
          </button>
          <button onClick={() => auth.signOut().then(() => navigate("/"))} style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", color:"white", padding:"10px 20px", borderRadius:"12px", cursor:"pointer", fontWeight:"600" }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth:"1200px", margin:"0 auto", padding:"32px 24px" }}>

        {/* ---- Stats ---- */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))", gap:"20px", marginBottom:"40px" }}>
          {[
            { label:"Total Users",       value:users.length,     color:"#009EE3", bg:"#e0f2fe", icon:"👥" },
            { label:"Total Bookings",    value:bookings.length,  color:"#1B9B3A", bg:"#dcfce7", icon:"📦" },
            { label:"Awaiting Approval", value:pending.length,   color:"#f59e0b", bg:"#fef3c7", icon:"⏳" },
            { label:"Confirmed",         value:confirmed.length, color:"#1B9B3A", bg:"#f0fdf4", icon:"✅" },
          ].map((stat, i) => (
            <div key={i} style={{ background:"white", borderRadius:"20px", padding:"24px", borderTop:`5px solid ${stat.color}`, boxShadow:`0 4px 20px rgba(0,0,0,0.05)` }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div>
                  <p style={{ margin:"0 0 6px", fontSize:"0.78rem", fontWeight:"700", color:"#94a3b8", textTransform:"uppercase", letterSpacing:"1px" }}>{stat.label}</p>
                  <div style={{ fontSize:"2.8rem", fontWeight:"900", color:stat.color, lineHeight:1 }}>{stat.value}</div>
                </div>
                <div style={{ width:"46px", height:"46px", borderRadius:"12px", background:stat.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem" }}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ---- Scrap Bookings (PostgreSQL) ---- */}
        <section style={{ marginBottom:"50px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
            <h2 style={{ margin:0, color:"#1e293b" }}>📋 Scrap Collection Requests</h2>
            <span style={{ fontSize:"0.82rem", color:"#64748b", background:"#f0fdf4", border:"1px solid #bbf7d0", padding:"5px 12px", borderRadius:"20px", fontWeight:"600" }}>
              Stored in PostgreSQL
            </span>
          </div>

          {bookings.length === 0 ? (
            <div style={{ background:"white", borderRadius:"20px", padding:"60px", textAlign:"center", boxShadow:"0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize:"3rem", marginBottom:"12px" }}>📭</div>
              <p style={{ color:"#64748b", fontSize:"1.05rem" }}>No collection requests yet. Bookings will appear here once customers submit them.</p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:"16px" }}>
              {bookings.map(booking => {
                const cfg = STATUS_COLORS[booking.status] || { bg:"#f1f5f9", color:"#94a3b8", label: booking.status };
                const isPending = booking.status === "PENDING_APPROVAL";
                return (
                  <div key={booking.id} style={{ background:"white", borderRadius:"20px", padding:"24px", boxShadow:"0 4px 20px rgba(0,0,0,0.04)", borderLeft:`6px solid ${cfg.color}` }}>
                    
                    <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"16px", marginBottom:"16px" }}>
                      <div>
                        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"6px" }}>
                          <span style={{ fontSize:"0.75rem", color:"#94a3b8", fontWeight:"700", textTransform:"uppercase" }}>Order #{String(booking.id).padStart(4,"0")}</span>
                          <span style={{ padding:"4px 12px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:"700", background:cfg.bg, color:cfg.color }}>{cfg.label}</span>
                        </div>
                        <h3 style={{ margin:0, fontSize:"1.1rem", color:"#1e293b" }}>{booking.user_name}</h3>
                        <p style={{ margin:"4px 0 0", fontSize:"0.9rem", color:"#009EE3", fontWeight:"600" }}>{booking.phone_number} &nbsp;|&nbsp; <span style={{ color:"#64748b" }}>{booking.email}</span></p>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <p style={{ margin:"0 0 4px", fontSize:"0.8rem", color:"#94a3b8" }}>Booked on</p>
                        <p style={{ margin:0, fontWeight:"600", color:"#475569", fontSize:"0.9rem" }}>{formatDate(booking.created_at)}</p>
                      </div>
                    </div>

                    {/* Address */}
                    <div style={{ display:"flex", gap:"8px", marginBottom:"14px", fontSize:"0.88rem", color:"#475569" }}>
                      <span>📍</span>
                      <span>{booking.address}, PIN: <strong>{booking.pincode}</strong> {booking.pickup_point && `— Near: ${booking.pickup_point}`}</span>
                    </div>

                    {/* Materials */}
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"16px" }}>
                      {(booking.items || []).map((item, idx) => (
                        <span key={idx} style={{ background:"#f0f9ff", border:"1px solid #bae6fd", padding:"5px 14px", borderRadius:"20px", fontSize:"0.84rem", color:"#0369a1", fontWeight:"600" }}>
                          {item.material_name} — {item.estimated_weight}kg
                        </span>
                      ))}
                    </div>

                    {/* Confirmed timing */}
                    {booking.pickup_timing && (
                      <div style={{ background:"#dcfce7", padding:"10px 16px", borderRadius:"12px", fontSize:"0.88rem", color:"#15803d", fontWeight:"600", marginBottom:"12px" }}>
                        🚛 Pickup Scheduled: {booking.pickup_timing}
                      </div>
                    )}

                    {/* Confirm action (only for pending) */}
                    {isPending && (
                      <div style={{ background:"#fef9f0", border:"1px solid #fde68a", borderRadius:"14px", padding:"16px", marginTop:"8px" }}>
                        <p style={{ margin:"0 0 10px", fontSize:"0.85rem", fontWeight:"700", color:"#92400e" }}>⏳ Awaiting Admin Confirmation</p>
                        <div style={{ display:"flex", gap:"10px", flexWrap:"wrap", alignItems:"center" }}>
                          <input
                            type="text"
                            placeholder="Pickup timing (e.g. 10:00 AM – 1:00 PM Tomorrow)"
                            value={pickupInput[booking.id] || ""}
                            onChange={(e) => setPickupInput(prev => ({ ...prev, [booking.id]: e.target.value }))}
                            style={{ flex:1, minWidth:"220px", padding:"10px 14px", border:"2px solid #fde68a", borderRadius:"10px", fontSize:"0.88rem", outline:"none", fontFamily:"inherit" }}
                          />
                          <button
                            onClick={() => handleConfirm(booking.id)}
                            disabled={confirming === booking.id}
                            style={{ padding:"10px 22px", background:"linear-gradient(135deg, #1B9B3A, #009EE3)", color:"white", border:"none", borderRadius:"10px", cursor:"pointer", fontWeight:"700", fontSize:"0.9rem", whiteSpace:"nowrap", opacity: confirming === booking.id ? 0.7 : 1 }}
                          >
                            {confirming === booking.id ? "Confirming..." : "✓ Confirm & Send SMS"}
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

        {/* ---- Authorized Users (Firebase) ---- */}
        <section>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px" }}>
            <h2 style={{ margin:0, color:"#1e293b" }}>👥 Registered Users</h2>
            <span style={{ fontSize:"0.82rem", color:"#64748b", background:"#f0f4ff", border:"1px solid #c7d2fe", padding:"5px 12px", borderRadius:"20px", fontWeight:"600" }}>
              Firebase Auth
            </span>
          </div>
          <div style={{ background:"white", borderRadius:"20px", boxShadow:"0 4px 20px rgba(0,0,0,0.05)", overflow:"hidden" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#f8fafc" }}>
                  <th style={{ padding:"16px 20px", textAlign:"left", fontSize:"0.82rem", fontWeight:"700", color:"#64748b", textTransform:"uppercase", letterSpacing:"0.5px" }}>Name</th>
                  <th style={{ padding:"16px 20px", textAlign:"left", fontSize:"0.82rem", fontWeight:"700", color:"#64748b", textTransform:"uppercase", letterSpacing:"0.5px" }}>Email</th>
                  <th style={{ padding:"16px 20px", textAlign:"left", fontSize:"0.82rem", fontWeight:"700", color:"#64748b", textTransform:"uppercase", letterSpacing:"0.5px" }}>Role</th>
                  <th style={{ padding:"16px 20px", textAlign:"left", fontSize:"0.82rem", fontWeight:"700", color:"#64748b", textTransform:"uppercase", letterSpacing:"0.5px" }}>Last Session</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding:"40px", textAlign:"center", color:"#94a3b8" }}>No users found in Firebase.</td>
                  </tr>
                ) : users.map(u => (
                  <tr key={u.id} style={{ borderTop:"1px solid #f1f5f9" }}>
                    <td style={{ padding:"16px 20px", fontWeight:"600", color:"#1e293b" }}>{u.displayName || "—"}</td>
                    <td style={{ padding:"16px 20px", fontSize:"0.9rem", color:"#475569" }}>{u.email || "—"}</td>
                    <td style={{ padding:"16px 20px" }}>
                      <span style={{ padding:"4px 12px", borderRadius:"20px", fontSize:"0.75rem", fontWeight:"700", background: u.role === "admin" ? "#dcfce7" : "#f1f5f9", color: u.role === "admin" ? "#16a34a" : "#64748b" }}>
                        {(u.role || "user").toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding:"16px 20px", fontSize:"0.85rem", color:"#94a3b8" }}>
                      {u.lastLogin?.toDate ? u.lastLogin.toDate().toLocaleString() : "Never"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Admin;
