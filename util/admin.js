var admin = require("firebase-admin");

var serviceAccount = require("C:/Users/diamo/OneDrive/Desktop/3a04-backend/ShareARide-backend/a04-backend-firebase-adminsdk-tusvg-444406ef1b.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };