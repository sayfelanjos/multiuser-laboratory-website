import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { Storage } from "@google-cloud/storage";

// Check the length of the apps array
if (admin.apps.length === 0) {
  admin.initializeApp();
}
// admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();
const gcs = new Storage();
const bucket = gcs.bucket(
  process.env.GCLOUD_STORAGE_BUCKET || admin.storage().bucket().name,
);

export { db, auth, bucket };

// Export specific values and types from the initialized admin object
// const FieldValue = admin.firestore.FieldValue;
type UserRecord = admin.auth.UserRecord;
type fbDoc = admin.firestore.DocumentSnapshot<admin.firestore.DocumentData>;
type FirestoreFieldValue = admin.firestore.FieldValue;

export { FieldValue, FirestoreFieldValue, UserRecord, fbDoc };
