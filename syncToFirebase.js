const fs = require("fs");
const admin = require("firebase-admin");

// Load Firebase service account from secret
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://edge-data-filtering-default-rtdb.firebaseio.com"
});

// Read JSON data
const rawData = fs.readFileSync("data.json", "utf8");

if (!rawData) {
  throw new Error("data.json is empty");
}

const data = JSON.parse(rawData);

// Push to Firebase
admin.database().ref("githubData").set(data)
  .then(() => {
    console.log("✅ Data synced to Firebase successfully");
  })
  .catch((err) => {
    console.error("❌ Firebase error:", err);
    process.exit(1);
  });

