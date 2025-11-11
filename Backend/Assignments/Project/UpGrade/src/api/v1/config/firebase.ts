import admin from "firebase-admin";
import serviceAccount from "../../../../test-project-1a599-firebase-adminsdk-fbsvc-4bfe817687.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const db = admin.firestore();
export const auth = admin.auth();
