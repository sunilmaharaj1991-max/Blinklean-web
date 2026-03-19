import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider, 
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import "../assets/css/login-premium.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://blinklean-api.onrender.com/api/v1";

const Login = () => {
  const navigate = useNavigate();
  const [formMode, setFormMode] = useState("login"); // login, signup, forgot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [formMode, showPassword]);

  const trackUserLogin = async (user) => {
    const userData = {
      firebase_uid: user.uid,
      email: user.email || "",
      name: user.displayName || fullName || "",
      photo_url: user.photoURL || "",
      role: (user.email === "sunilmaharaj1991@gmail.com") ? "admin" : "user",
      last_login: serverTimestamp(),
      created_at: serverTimestamp()
    };

    try {
      // 1. Sync to Firebase Firestore (Primary)
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, userData, { merge: true });
      console.log("✅ User synced to Cloud Firestore");

      // 2. Sync to PostgreSQL (Secondary Background)
      if (API_BASE) {
        fetch(`${API_BASE}/users/upsert`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
        }).catch(err => console.warn("Backend user sync failed, but data is safe in Firebase.", err));
      }
    } catch (err) {
      console.error("Error tracking user:", err);
    }
  };

  const handleEmailAction = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (formMode === "forgot") {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset link sent to your email!");
        return;
      }

      const result = await (formMode === "login" ? signInWithEmailAndPassword(auth, email, password) : createUserWithEmailAndPassword(auth, email, password));
      
      if (formMode === "signup" && fullName) {
        await updateProfile(result.user, { displayName: fullName });
      }

      await trackUserLogin(result.user);

      // Check Role from Firestore
      try {
        const userSnap = await getDoc(doc(db, "users", result.user.uid));
        if (userSnap.exists() && userSnap.data().role === "admin") {
          console.log("Welcome, Admin!");
          navigate("/admin");
          return;
        }
      } catch (roleErr) {
        console.warn("Cloud Role check failed:", roleErr);
      }
      
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      let friendlyMsg = "Authentication failed. Please check your credentials.";
      
      const errorCode = err.code || "";
      if (errorCode.includes("invalid-credential") || errorCode.includes("wrong-password") || errorCode.includes("user-not-found")) {
        friendlyMsg = "Invalid email or password.";
      } else if (errorCode.includes("email-already-in-use")) {
        friendlyMsg = "This email is already registered.";
      } else if (errorCode.includes("too-many-requests")) {
        friendlyMsg = "Too many failed attempts. Try again later.";
      } else if (errorCode.includes("network-request-failed")) {
        friendlyMsg = "Network error. Please check your connection.";
      }
      
      setError(friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      
      // Update data in Firestore & PostgreSQL
      await trackUserLogin(result.user);

      // Check Role from Firestore
      try {
        const userSnap = await getDoc(doc(db, "users", result.user.uid));
        if (userSnap.exists() && userSnap.data().role === "admin") {
          navigate("/admin");
          return;
        }
      } catch (roleErr) {
        console.warn("Cloud Role check failed:", roleErr);
      }
      
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setError("Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card-premium">
        <div className="login-header-premium">
          <a href="/" style={{ textDecoration: "none" }}>
            <div className="logo-box">
              <Logo type="navbar" style={{ height: "85px" }} />
            </div>
          </a>
          <h2>{formMode === "signup" ? "Create Account" : formMode === "forgot" ? "Reset Password" : "Welcome Back"}</h2>
          <p>{formMode === "signup" ? "Join India's First AI Powered QuickClean platform" : formMode === "forgot" ? "Enter your email to receive a reset link" : "Login to manage your bookings"}</p>
        </div>

        {error && <div className="feedback-msg error">{error}</div>}
        {message && <div className="feedback-msg success">{message}</div>}

        <form className="auth-form-premium" onSubmit={handleEmailAction}>
          {formMode === "signup" && (
            <div className="form-group-premium">
              <label>Full Name</label>
              <i data-lucide="user"></i>
              <input type="text" placeholder="John Doe" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
          )}
          <div className="form-group-premium">
            <label>Email Address</label>
            <i data-lucide="mail"></i>
            <input type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {formMode !== "forgot" && (
            <div className="form-group-premium">
              <label>Password</label>
              <i data-lucide="lock"></i>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)}>
                <i data-lucide={showPassword ? "eye-off" : "eye"}></i>
              </button>
            </div>
          )}
          
          {formMode === "login" && (
            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                <span className="checkmark"></span>
                Remember Me
              </label>
              <button type="button" className="link-btn" onClick={() => setFormMode("forgot")}>Forgot Password?</button>
            </div>
          )}

          <button type="submit" className="btn-login-premium" disabled={loading}>
            {loading ? <span className="loader-dots"><span>.</span><span>.</span><span>.</span></span> : 
              (formMode === "signup" ? "Sign Up" : formMode === "forgot" ? "Send Link" : "Sign In")
            }
          </button>
        </form>

        <div className="divider-premium">OR</div>

        <button className="btn-social-premium" onClick={handleGoogleLogin} disabled={loading}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          Continue with Google
        </button>

        <div className="signup-link-premium">
          {formMode === "login" ? (
            <>New to Blinklean? <button onClick={() => setFormMode("signup")} className="link-btn">Create an account</button></>
          ) : (
            <>Already have an account? <button onClick={() => { setFormMode("login"); setError(""); setMessage(""); }} className="link-btn">Sign In</button></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
