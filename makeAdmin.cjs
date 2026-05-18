const admin = require('firebase-admin');
const axios = require('axios');
const path = require('path');

// Load environment variables from backend .env
require('dotenv').config({ path: path.join(__dirname, 'blinklean-backend', '.env') });

const privateKey = process.env.FIREBASE_PRIVATE_KEY
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : '';

if (!privateKey) {
  console.error('❌ Error: FIREBASE_PRIVATE_KEY is not defined in .env file!');
  process.exit(1);
}

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID || "blinklean-web",
  private_key_id: "d6aeed47fc24e7d859f269e8da2a8c6ebd8b7c06",
  private_key: privateKey,
  client_email: process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-fbsvc@blinklean-web.iam.gserviceaccount.com",
  client_id: "109135810197995265065",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40blinklean-web.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const emails = ['sunilmaharaj1991@gmail.com', 'jeevithgowdasr@gmail.com'];
const API_BASE = 'https://blinklean-api.onrender.com/api/v1';

async function setAdmins() {
  console.log("🚀 Starting Admin Assignment Process...");
  for (const email of emails) {
    try {
      const user = await admin.auth().getUserByEmail(email);
      await admin.auth().setCustomUserClaims(user.uid, { admin: true });
      console.log(`✅ Firebase: ${email} is now an admin (uid: ${user.uid}).`);

      try {
        const apiKey = process.env.JWT_SECRET || 'blinklean_fallback_secret_123';
        await axios.post(`${API_BASE}/users/upsert`, {
          firebase_uid: user.uid,
          email: email,
          name: user.displayName || 'Admin',
          role: 'admin'
        }, {
          headers: {
            'Authorization': `ApiKey ${apiKey}`
          }
        });
        console.log(`✅ Database: ${email} role synced to Postgres.`);
      } catch (dbErr) {
        console.warn(`⚠️ Database Sync failed for ${email}: ${dbErr.message}.`);
      }
    } catch (error) {
      console.error(`❌ Error for ${email}:`, error.message);
    }
  }
  process.exit(0);
}

setAdmins();
