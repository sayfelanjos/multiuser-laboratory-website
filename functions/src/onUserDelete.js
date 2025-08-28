import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

/**
 * Triggered when a user deletes their Auth account.
 * Mark it as inactive:.
 */
export const onUserDelete = functions
  .region("southamerica-east1")
  .auth.user()
  .onDelete(async (user) => {
    const { uid } = user;
    const db = admin.firestore();

    const userRef = db.collection("users").doc(uid);
    const archivedUserRef = db.collection("archivedUsers").doc(uid);

    try {
      // Get the user's data before they are deleted
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        console.log(
          `LMU_functions: User document for ${uid} not found. Nothing to archive.`,
        );
        return;
      }

      const userData = userDoc.data();

      console.log(`LMU_functions: Archiving data for deleted user: ${uid}`);

      // Create a new document in 'archivedUsers' with the original data
      await archivedUserRef.set({
        ...userData,
        isActive: false,
        // Add the deletion timestamp
        deletionDate: FieldValue.serverTimestamp(),
      });

      // Removed: // // Delete the original document from the 'users' collection
      // await userRef.delete();

      // Keep the user document but mark it as inactive:
      await userRef.set({ isActive: false }, { merge: true });
      console.log(`LMU_functions: User ${uid} archived successfully.`);
    } catch (error) {
      console.error(`LMU_functions: Error archiving user ${uid}:`, error);
    }
  });
