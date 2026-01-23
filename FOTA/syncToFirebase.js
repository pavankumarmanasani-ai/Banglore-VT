const admin = require("firebase-admin");
const fs = require("fs");

// Read Firebase credentials from GitHub Secrets
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

const db = admin.database();

// Read data.json from repo
const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

async function main() {
  await db.ref("githubSync").set({
    data: data,
    updatedAt: new Date().toISOString(),
    source: "GitHub Actions"
  });

  console.log("✅ Data synced to Firebase successfully");
}

main();

