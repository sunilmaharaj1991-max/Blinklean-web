import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
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
  const [showLangModal, setShowLangModal] = useState(false);

  useEffect(() => {
    // Check if user has already set a language
    const langSet = localStorage.getItem("blinklean_lang_set");
    if (!langSet) {
      setShowLangModal(true);
    }
  }, []);

  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [formMode, showPassword, showLangModal]);

  const selectLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("blinklean_lang_set", "true");
    setShowLangModal(false);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'ml', name: 'മലയാളം (Malayalam)' }
  ];

  const trackUserLogin = async (user) => {
    const userData = {
      firebase_uid: user.uid,
      email: user.email || "",
      name: user.displayName || fullName || "",
      photo_url: user.photoURL || "",
      role: (user.email === "sunilmaharaj1991@gmail.com" || user.email === "jeevithgowdasr@gmail.com") ? "admin" : "user",
      last_login: serverTimestamp(),
      created_at: serverTimestamp(),
      preferred_language: i18n.language
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
        const isAdminEmail = (result.user.email === "sunilmaharaj1991@gmail.com" || result.user.email === "jeevithgowdasr@gmail.com");
        const userSnap = await getDoc(doc(db, "users", result.user.uid));
        if (isAdminEmail || (userSnap.exists() && userSnap.data().role === "admin")) {
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
        const isAdminEmail = (result.user.email === "sunilmaharaj1991@gmail.com" || result.user.email === "jeevithgowdasr@gmail.com");
        const userSnap = await getDoc(doc(db, "users", result.user.uid));
        if (isAdminEmail || (userSnap.exists() && userSnap.data().role === "admin")) {
          navigate("/admin");
          return;
        }
      } catch (roleErr) {
        console.warn("Cloud Role check failed:", roleErr);
      }
      
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      let friendlyMsg = "Failed to sign in with Google.";
      
      const errorCode = err?.code || "";
      if (errorCode.includes("popup-closed-by-user")) {
        friendlyMsg = "Sign-in popup was closed before completion.";
      } else if (errorCode.includes("unauthorized-domain")) {
        friendlyMsg = "This domain (blinklean.com) is not authorized for Google Sign-In. Please check Firebase console.";
      } else if (errorCode.includes("operation-not-allowed")) {
        friendlyMsg = "Google Sign-In is not enabled for this project.";
      } else if (err?.message) {
        friendlyMsg = `Error: ${err.message}`;
      }
      
      setError(friendlyMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      {/* Language Selection Modal */}
      {showLangModal && (
        <div className="lang-modal-overlay">
          <div className="lang-modal-content">
            <div className="lang-modal-header">
              <i data-lucide="languages" className="modal-icon"></i>
              <h3>Choose Your Language / भाषा चुनें</h3>
              <p>Select your preferred language for a better experience</p>
            </div>
            <div className="lang-grid-premium">
              {languages.map((lang) => (
                <button 
                  key={lang.code} 
                  className={`lang-option-btn ${i18n.language === lang.code ? 'active' : ''}`}
                  onClick={() => selectLanguage(lang.code)}
                >
                  <span className="lang-name">{lang.name}</span>
                  {i18n.language === lang.code && <i data-lucide="check-circle" className="check-icon"></i>}
                </button>
              ))}
            </div>
            <div className="lang-modal-footer">
              <button 
                className="skip-btn" 
                onClick={() => {
                  localStorage.setItem("blinklean_lang_set", "true");
                  setShowLangModal(false);
                }}
              >
                Continue with English
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="login-card-premium">
        <div className="login-header-premium">
          <a href="/" style={{ textDecoration: "none" }}>
            <div className="logo-box">
              <Logo type="navbar" style={{ height: "85px" }} />
            </div>
          </a>
          <h2>{formMode === "signup" ? t('login.create_account') : formMode === "forgot" ? t('login.reset_password') : t('login.welcome_back')}</h2>
          <p>{formMode === "signup" ? t('login.join_platform') : formMode === "forgot" ? t('login.enter_reset_link') : t('login.manage_bookings')}</p>
        </div>

        {error && <div className="feedback-msg error">{error}</div>}
        {message && <div className="feedback-msg success">{message}</div>}

        <form className="auth-form-premium" onSubmit={handleEmailAction}>
          {formMode === "signup" && (
            <div className="form-group-premium">
              <label>{t('login.full_name')}</label>
              <i data-lucide="user"></i>
              <input type="text" placeholder="John Doe" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
          )}
          <div className="form-group-premium">
            <label>{t('login.email_address')}</label>
            <i data-lucide="mail"></i>
            <input type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {formMode !== "forgot" && (
            <div className="form-group-premium">
              <label>{t('login.password')}</label>
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
                {t('login.remember_me')}
              </label>
              <button type="button" className="link-btn" onClick={() => setFormMode("forgot")}>{t('login.forgot_password')}</button>
            </div>
          )}

          <button type="submit" className="btn-login-premium" disabled={loading}>
            {loading ? <span className="loader-dots"><span>.</span><span>.</span><span>.</span></span> : 
              (formMode === "signup" ? t('login.sign_up') : formMode === "forgot" ? t('login.send_link') : t('login.sign_in'))
            }
          </button>
        </form>

        <div className="divider-premium">{t('login.or')}</div>

        <button className="btn-social-premium" onClick={handleGoogleLogin} disabled={loading}>
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
          {t('login.continue_google')}
        </button>

        <div className="signup-link-premium">
          {formMode === "login" ? (
            <>{t('login.new_to_blinklean')} <button onClick={() => setFormMode("signup")} className="link-btn">{t('login.create_account')}</button></>
          ) : (
            <>{t('login.already_have_account')} <button onClick={() => { setFormMode("login"); setError(""); setMessage(""); }} className="link-btn">{t('login.sign_in')}</button></>
          )}
        </div>
        
        {/* Quick language switch at bottom */}
        <div className="language-selector-premium">
          <select 
            className="lang-select" 
            value={i18n.language} 
            onChange={(e) => {
              i18n.changeLanguage(e.target.value);
              localStorage.setItem("blinklean_lang_set", "true");
            }}
          >
            {languages.map(l => (
              <option key={l.code} value={l.code}>{l.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Login;
