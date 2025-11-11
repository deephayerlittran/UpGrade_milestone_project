import admin from "firebase-admin";
import path from "path";

const serviceAccountPath = path.resolve(__dirname, "../../../../test-project-1a599-firebase-adminsdk-fbsvc-4bfe817687.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(require(serviceAccountPath)),
  });
}

export const db = admin.firestore();
