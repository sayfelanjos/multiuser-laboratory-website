import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { createUserDocument } from "./onUserCreate.js"; // Reuse the user creation logic

/**
 * A callable function to migrate existing Auth users to Firestore.
 * This should be run manually one time.
 */
export const migrateUsers = functions

  .region("southamerica-east1")
  .https.onCall(async (data, context) => {
    // Security Check: Only an admin should be able to run this.
    const callerUid = context.auth.uid; // Get the caller unique ID
    const callerDoc = await admin
      .firestore()
      .collection("users")
      .doc(callerUid)
      .get();
    const callerRole = callerDoc.data()?.role || "user";
    if (callerRole !== "admin") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "LMU_functions: You must be an admin to run this function.",
      );
    }

    const db = admin.firestore();
    const usersRef = db.collection("users");
    let migratedCount = 0;
    let skippedCount = 0;

    try {
      const listUsersResult = await admin.auth().listUsers(1000); // Max 1000 per page

      for (const userRecord of listUsersResult.users) {
        console.log("Processing user:", userRecord);
        const userDocRef = usersRef.doc(userRecord.uid);
        const userDoc = await userDocRef.get();

        if (userDoc.exists) {
          // User already exists in Firestore, skip them.
          skippedCount++;
        } else {
          // User does not exist, create their document.
          await createUserDocument(userRecord);
          migratedCount++;
        }
      }

      const message = `Migration complete. Migrated: ${migratedCount}, Skipped: ${skippedCount}.`;
      console.log(message);
      return { message };
    } catch (error) {
      console.error("Error during user migration:", error);
      throw new functions.https.HttpsError(
        "internal",
        "User migration failed.",
      );
    }
  });
