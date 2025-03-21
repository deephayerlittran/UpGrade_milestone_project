import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import * as serviceAccount from "../test-project-aadf9-firebase-adminsdk-fbsvc-d1e752358a.json"

// Initialize the Firebase app with the service account credentials
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

// Get a reference to the Firestore service
const db: Firestore = getFirestore();

export { db };