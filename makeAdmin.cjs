const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Replace with the emails you want to make admins
const emails = ['sunilmaharaj1991@gmail.com', 'jeevithgowdasr@gmail.com'];

emails.forEach(async (email) => {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Successfully made ${email} an admin (uid: ${user.uid})`);
  } catch (error) {
    console.log(`Error for ${email}:`, error.message);
  }
});
