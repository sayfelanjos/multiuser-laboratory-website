import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

// Check the length of the apps array
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth };

// Export specific values and types from the initialized admin object
type UserRecord = admin.auth.UserRecord;
type fbDoc = admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>;
type FirestoreFieldValue = admin.firestore.FieldValue;

export { FieldValue, FirestoreFieldValue, UserRecord, fbDoc };
