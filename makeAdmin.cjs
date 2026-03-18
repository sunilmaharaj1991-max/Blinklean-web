const admin = require('firebase-admin');
const axios = require('axios');

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDF61WdUpb+lwri
L3K7ijIcfvkkqjHYvZnELkEp3Gjfbud4Q6RmtDGqxtI6NqvR2PSQ5VseR4pgj7sG
X0dkLFx3mYdeK0cfhC/dnpSwrqBAz79fxdyr8FaZMAPbxDBzuPB91+VyUpLE+d1t
PEdZ7znruxxRFMqnf47aLGqYkKl4Rwlb9L5eutZD9erphJP7C8N9RzOnYqZ6NkP8
yp7soN390z1qjnD4hKLuvbcqJk4593Z/l1pN+HWFO5zzmnD/GCy8ofN0n0474emr
8Vz0lq/bh5i4pNro9pKa6sHtnV7oMee9OBh+mUvhW6r0rAHEF5Wr7AW1+Cli/7eZ
OMXj9HOPAgMBAAECggEAKV1K8mttdV4Z/zXNc9apLH15Eqmja1oNBgxowBf5ryDd
ravtcy2b58ZP76y3ck82pgXZalWnXRENFILbR9tho/lpakv/PF4DJv1atCZ7BbCl
nnZ2bxi+f2bpIRCkXu0fes15o7ODHHfXeylK70tcFsvfTLjr7M9CcCYsY6DPrx2Aq
usFwJAEXXn0Hz515rVJotyXUBr85ECeVIC3kIyUYkwyPZDJFtzTOPdcslSbI7xxa
o+kiBZ7QOHn7DrdCdta/u6GPlOvQ/NGo8ymlvqWMk/4gh4SRRwVHeGYkkvbk6uOo
DWLoa2W04oRbW0IecZoE+jS5zuDs1W9A1YPi6zSeEQKBgQD6g52x8fcmGVPONv88
1v/v7tVv3BrEcgcK07EV+vWJkKmfKvbimBbKjSaYM83aB0gRWbvSvWkXKjXcVuU4
ahXmOA1Q//XpC3yjwcgQLSsncshQbz7Wk9VIaph2GksATHUzBz1ZacNGy7GKx3og
vMWVVuc60HJnoSUmxQv110Or2QKBgQDKQN8PKf+jsHdrBBkssvf+0FrKkV+ypSuX
lofbf4FIM0bERNThY8PP2K05PBJmvjPIWcO4Lr0M6rWK67lnfiDJMV3BkOBiNJa7
VHqV3vbYd8xf3JnUfkaHvd6pCBgdRXiUxLoQLC2A5zb/C8SQwmHSM06eYkQafeA0
hami94+BpwKBgQDHs6w+cnlnMcGRHl6SDYKxrl8PcRMVjyD2DJOaxhh+tYfCjumI
8V0Z0zP1GTb8m9ljm3kTIlNoWAnfwJWyRz916zESZTmPscyGbrAh1SAVrnbpSAV7
4RWhSPiJDaTEdC7potfRM3KsOS0rSKGe/10zE7f5Nro8ykVnhqVmMViM4QKBgQC0
nd/oRX9pZxyZneTq1ZeRfnK7Gvbz0fOlO0+TZ+QX01Lw6eWiyzQB2P9MhlPaecu1l
wqMff6T1F6FyGjBPpn2+yKvuAkYVmvM8qH7RqCf+s7bLet5Qe3SXvtYlYbGSvOCB
bqDPuXvI34d1QJzexnPeyiVGskwuj081zma1ocyNVQKBgCs/gBuBECQK+fgcE11k
nGyeiCncVQR9MbOpux9nJ3ztpn14yWrRfHFXj+8pBJ7LT6KVTtf0i0z2puNgUa9s
28yjw0ceEHF4Z82LK3ngSsMCYRBnmfWKM449PyugTkPpV4cFtDMwAqDFYXB10ctg
BNq4xUdJy3/rgP/Rtv43R3Vl
-----END PRIVATE KEY-----`;

const serviceAccount = {
  type: "service_account",
  project_id: "blinklean-web",
  private_key_id: "d6aeed47fc24e7d859f269e8da2a8c6ebd8b7c06",
  private_key: privateKey,
  client_email: "firebase-adminsdk-fbsvc@blinklean-web.iam.gserviceaccount.com",
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
        await axios.post(`${API_BASE}/users/upsert`, {
          firebase_uid: user.uid,
          email: email,
          name: user.displayName || 'Admin',
          role: 'admin'
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
