import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider, 
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import "../assets/css/login-premium.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://blinklean-api.onrender.com/api/v1";

const Login = () => {
  const navigate = useNavigate();
  const [authTab, setAuthTab] = useState("email"); // email or phone
  const [formMode, setFormMode] = useState("login"); // login, signup, forgot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [formMode, authTab, showPassword]);

  const trackUserLogin = async (user) => {
    try {
      // 1. Sync to Firestore (Backup)
      const userRef = doc(db, "users", user.uid);
      const userData = {
        uid: user.uid,
        email: user.email || "",
        phone: user.phoneNumber || phone || "",
        displayName: user.displayName || fullName || "",
        lastLogin: new Date().toISOString(),
        role: "user",
        photoURL: user.photoURL || ""
      };

      await setDoc(userRef, userData, { merge: true });

      // 2. Sync to PostgreSQL (Primary for Admin Panel)
      if (API_BASE) {
        try {
          await fetch(`${API_BASE}/users/upsert`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firebase_uid: userData.uid,
              email: userData.email,
              phone_number: userData.phone,
              name: userData.displayName,
              photo_url: userData.photoURL,
              role: userData.role
            })
          });
          console.log("✅ User synced to PostgreSQL");
        } catch (apiErr) {
          console.warn("⚠️ PostgreSQL sync failed:", apiErr.message);
        }
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
        await trackUserLogin(result.user);
      } else if (formMode === "login") {
        await trackUserLogin(result.user);
      }

      // SNIPPET IMPLEMENTATION: Role based redirection
      const userDocRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "admin") {
          console.log("Welcome, Admin!");
          navigate("/admin"); // Redirect to admin portal
        } else {
          console.log("Regular user logged in.");
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login Error:", err);
      let friendlyMsg = "Authentication failed. Please check your credentials.";
      
      const errorCode = err.code || "";
      if (errorCode.includes("invalid-credential") || errorCode.includes("wrong-password") || errorCode.includes("user-not-found")) {
        friendlyMsg = "Invalid email or password. Don't have an account? Click 'Create an account' below.";
      } else if (errorCode.includes("too-many-requests")) {
        friendlyMsg = "Too many failed attempts. Please reset your password or try again later.";
      } else if (errorCode.includes("network-request-failed")) {
        friendlyMsg = "Network error. Please check your internet connection.";
      } else {
        friendlyMsg = err.message.replace("Firebase: ", "").replace("Error ", "");
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

      // SNIPPET IMPLEMENTATION: Role based redirection
      const userDocRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "admin") {
          console.log("Welcome, Admin!");
          navigate("/admin");
        } else {
          console.log("Regular user logged in.");
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          // reCAPTCHA solved
        }
      });
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      setMessage("OTP sent to " + formattedPhone);
    } catch (err) {
      console.error("OTP send error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await confirmationResult.confirm(otp);
      await trackUserLogin(result.user);
      navigate("/");
    } catch (err) {
      console.error("OTP verify error:", err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div id="recaptcha-container"></div>
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

        <div className="auth-tabs-premium">
          <button
            className={`tab-btn-premium ${authTab === "email" ? "active" : ""}`}
            onClick={() => { setAuthTab("email"); setFormMode("login"); setError(""); setMessage(""); }}
          >
            Email
          </button>
          <button
            className={`tab-btn-premium ${authTab === "phone" ? "active" : ""}`}
            onClick={() => { setAuthTab("phone"); setFormMode("login"); setError(""); setMessage(""); }}
          >
            Phone (OTP)
          </button>
        </div>

        <form className="auth-form-premium" onSubmit={authTab === "phone" ? (confirmationResult ? handleVerifyOtp : handleSendOtp) : handleEmailAction}>
          {authTab === "email" && (
            <>
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
            </>
          )}

          {authTab === "phone" && (
            <>
              {!confirmationResult ? (
                <div className="form-group-premium">
                  <label>Phone Number</label>
                  <i data-lucide="phone"></i>
                  <input type="tel" placeholder="7022803582" pattern="[0-9]{10}" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              ) : (
                <div className="form-group-premium">
                  <label>OTP Code</label>
                  <i data-lucide="key"></i>
                  <input type="text" placeholder="Enter 6-digit OTP" required value={otp} onChange={(e) => setOtp(e.target.value)} />
                </div>
              )}
            </>
          )}

          <button type="submit" className="btn-login-premium" disabled={loading}>
            {loading ? <span className="loader-dots"><span>.</span><span>.</span><span>.</span></span> : 
              (authTab === "phone" ? (confirmationResult ? "Verify OTP" : "Get OTP") : 
              (formMode === "signup" ? "Sign Up" : formMode === "forgot" ? "Send Link" : "Sign In"))
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
