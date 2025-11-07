import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

// Check the length of the apps array
if (admin.apps.length === 0) {
  admin.initializeApp();
}

// Values from the initialized admin object
const db = admin.firestore();
const auth = admin.auth();

// Export specific values and types from the initialized admin object
type UserRecord = admin.auth.UserRecord;
type FirestoreFieldValue = admin.firestore.FieldValue;

export { db, auth, FieldValue, FirestoreFieldValue, UserRecord };
