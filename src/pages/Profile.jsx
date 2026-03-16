import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const statusConfig = {
  PENDING_APPROVAL: { color: "#f59e0b", bg: "#fef3c7", label: "Pending Approval" },
  CONFIRMED:        { color: "#1B9B3A", bg: "#dcfce7", label: "Confirmed ✓" },
  PICKUP_SCHEDULED: { color: "#009EE3", bg: "#e0f2fe", label: "Pickup Scheduled" },
  COLLECTED:        { color: "#8b5cf6", bg: "#ede9fe", label: "Collected" },
  COMPLETED:        { color: "#16a34a", bg: "#f0fdf4", label: "Completed" },
  CANCELLED:        { color: "#ef4444", bg: "#fee2e2", label: "Cancelled" },
};

const Profile = () => {
  const [user,     setUser]     = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchBookings(currentUser.uid);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const fetchBookings = async (uid) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/scrap/user-bookings/${uid}`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Could not load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const avatar = user?.displayName
    ? user.displayName[0].toUpperCase()
    : user?.email
    ? user.email[0].toUpperCase()
    : "U";

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", alignItems: "center", justifyContent: "center", gap: "16px", background: "#f0f9ff" }}>
        <div style={{ width: "44px", height: "44px", border: "4px solid #bae6fd", borderTopColor: "#009EE3", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
        <p style={{ color: "#64748b", fontWeight: 600 }}>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%)", fontFamily: "Inter, sans-serif" }}>
      
      {/* ---- Header ---- */}
      <div style={{ background: "linear-gradient(135deg, #009EE3, #1B9B3A)", padding: "60px 20px 80px", textAlign: "center", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1000px", margin: "0 auto 30px" }}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", color: "white", fontWeight: "600" }}>
            ← Back to Home
          </Link>
          <button
            onClick={() => auth.signOut().then(() => navigate("/"))}
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", padding: "8px 20px", borderRadius: "20px", cursor: "pointer", fontWeight: "600", color: "white", fontSize: "0.9rem" }}
          >
            Logout
          </button>
        </div>
        <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "3px solid white", color: "white", fontSize: "2.4rem", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontWeight: "800" }}>
          {avatar}
        </div>
        <h1 style={{ color: "white", margin: "0 0 4px", fontSize: "1.8rem", fontWeight: "800" }}>{user?.displayName || "Blinklean User"}</h1>
        <p style={{ color: "rgba(255,255,255,0.85)", margin: 0 }}>{user?.email}</p>
      </div>

      {/* ---- Main Content ---- */}
      <div style={{ maxWidth: "1000px", margin: "-50px auto 60px", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "24px", alignItems: "start" }}>

          {/* ---- Sidebar Stats ---- */}
          <div style={{ background: "white", borderRadius: "24px", padding: "28px", boxShadow: "0 10px 40px rgba(0,158,227,0.1)", border: "1px solid #e0f4fd" }}>
            <h3 style={{ margin: "0 0 20px", fontSize: "1rem", color: "#64748b", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Account Summary</h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#f0f9ff", borderRadius: "12px" }}>
                <span style={{ color: "#64748b", fontSize: "0.9rem" }}>Member Since</span>
                <span style={{ fontWeight: "700", color: "#1e293b", fontSize: "0.9rem" }}>
                  {user?.metadata?.creationTime ? formatDate(user.metadata.creationTime) : "N/A"}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#f0fdf4", borderRadius: "12px" }}>
                <span style={{ color: "#64748b", fontSize: "0.9rem" }}>Total Bookings</span>
                <span style={{ fontWeight: "800", color: "#1B9B3A", fontSize: "1.1rem" }}>{bookings.length}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#fef3c7", borderRadius: "12px" }}>
                <span style={{ color: "#64748b", fontSize: "0.9rem" }}>Pending</span>
                <span style={{ fontWeight: "800", color: "#f59e0b" }}>
                  {bookings.filter(b => b.status === "PENDING_APPROVAL").length}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 16px", background: "#dcfce7", borderRadius: "12px" }}>
                <span style={{ color: "#64748b", fontSize: "0.9rem" }}>Confirmed</span>
                <span style={{ fontWeight: "800", color: "#1B9B3A" }}>
                  {bookings.filter(b => b.status === "CONFIRMED").length}
                </span>
              </div>
            </div>

            <Link to="/scrap-booking" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "20px", padding: "13px", background: "linear-gradient(135deg, #009EE3, #1B9B3A)", color: "white", borderRadius: "14px", textDecoration: "none", fontWeight: "700", fontSize: "0.95rem" }}>
              + New Booking
            </Link>
          </div>

          {/* ---- Bookings List ---- */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ margin: 0, color: "#1e293b", fontSize: "1.4rem", fontWeight: "800" }}>
                📋 Booking History
              </h2>
              <button onClick={() => fetchBookings(user.uid)} style={{ background: "#f0f9ff", border: "1px solid #bae6fd", padding: "8px 16px", borderRadius: "10px", cursor: "pointer", color: "#009EE3", fontWeight: "600", fontSize: "0.85rem" }}>
                ↻ Refresh
              </button>
            </div>

            {error && (
              <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", padding: "16px", borderRadius: "12px", color: "#dc2626", marginBottom: "20px" }}>
                ⚠ {error}
              </div>
            )}

            {bookings.length === 0 ? (
              <div style={{ background: "white", borderRadius: "24px", padding: "60px 20px", textAlign: "center", boxShadow: "0 8px 30px rgba(0,0,0,0.05)", border: "1px solid #e0f4fd" }}>
                <div style={{ fontSize: "3rem", marginBottom: "16px" }}>📦</div>
                <h3 style={{ margin: "0 0 10px", color: "#1e293b" }}>No Bookings Yet</h3>
                <p style={{ color: "#64748b", marginBottom: "24px" }}>You haven't placed any scrap pickup requests yet.</p>
                <Link to="/scrap-booking" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", background: "linear-gradient(135deg, #009EE3, #1B9B3A)", color: "white", borderRadius: "14px", textDecoration: "none", fontWeight: "700" }}>
                  Book Your First Pickup
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {bookings.map((booking) => {
                  const cfg = statusConfig[booking.status] || { color: "#94a3b8", bg: "#f1f5f9", label: booking.status };
                  return (
                    <div key={booking.id} style={{ background: "white", borderRadius: "20px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", borderLeft: `5px solid ${cfg.color}`, border: `1px solid #e0f4fd`, borderLeftWidth: "5px", borderLeftColor: cfg.color }}>
                      
                      {/* Header row */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
                        <div>
                          <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
                            Order #{String(booking.id).padStart(4, "0")}
                          </span>
                          <h4 style={{ margin: "4px 0 0", fontSize: "1.05rem", color: "#1e293b", fontWeight: "700" }}>
                            🌱 Scrap Recycling Pickup
                          </h4>
                        </div>
                        <span style={{ padding: "6px 14px", borderRadius: "20px", fontSize: "0.78rem", fontWeight: "700", background: cfg.bg, color: cfg.color }}>
                          {cfg.label}
                        </span>
                      </div>

                      {/* Date & Time row */}
                      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "14px", fontSize: "0.88rem", color: "#475569" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span>📅</span>
                          <strong>Date:</strong> {formatDate(booking.created_at)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span>🕐</span>
                          <strong>Time:</strong> {formatTime(booking.created_at)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span>📍</span>
                          {booking.pincode}
                        </div>
                      </div>

                      {/* Materials */}
                      <div style={{ background: "#f8fafc", padding: "12px 16px", borderRadius: "12px", marginBottom: "12px" }}>
                        <p style={{ margin: "0 0 8px", fontSize: "0.75rem", color: "#94a3b8", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Materials to Pickup</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                          {(booking.items || []).map((item, idx) => (
                            <span key={idx} style={{ background: "#e0f4fd", border: "1px solid #bae6fd", padding: "4px 12px", borderRadius: "20px", fontSize: "0.83rem", color: "#0369a1", fontWeight: "600" }}>
                              {item.material_name} — {item.estimated_weight}kg
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Confirmed pickup timing */}
                      {booking.pickup_timing && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", background: "#dcfce7", borderRadius: "10px", fontSize: "0.88rem", color: "#15803d", fontWeight: "600" }}>
                          🚛 Agent arrives: {booking.pickup_timing}
                        </div>
                      )}

                      {/* Pending note */}
                      {booking.status === "PENDING_APPROVAL" && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", background: "#fef3c7", borderRadius: "10px", fontSize: "0.85rem", color: "#92400e", marginTop: "10px" }}>
                          ⏳ Waiting for admin confirmation — you'll receive an SMS once approved.
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Profile;
