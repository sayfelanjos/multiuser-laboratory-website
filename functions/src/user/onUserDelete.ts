console.log("--> Loading onUserDelete.ts...");

import * as functions from "firebase-functions";
import { db, FieldValue, FirestoreFieldValue, UserRecord } from "../admin";
import type { UserDocument } from "../types/userTypes";

/**
 * Triggered when a user's Auth account is deleted.
 * Atomically archives the user's data to the 'archivedUsers' collection
 * and marks the original document as inactive.
 */
export const onUserDelete = functions
  .region("southamerica-east1")
  .auth.user()
  .onDelete(async (user: UserRecord) => {
    const { uid } = user;
    const userRef = db.collection("users").doc(uid);
    const archivedUserRef = db.collection("archivedUsers").doc(uid);

    console.log(`Deletion process started for user: ${uid}`);

    try {
      // Use a transaction to ensure both operations succeed or fail together.
      await db.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(userRef);

        if (!userDoc.exists) {
          console.log(
            `User document for ${uid} not found. Nothing to archive.`,
          );
          return;
        }

        const userData = userDoc.data() as UserDocument;
        const archivedData = {
          ...userData,
          isActive: false,
          deletedAt: FieldValue.serverTimestamp() as FirestoreFieldValue,
        };

        // 1. Create a copy in the 'archivedUsers' collection.
        transaction.set(archivedUserRef, archivedData);

        // 2.1 Update the original document to mark as inactive.
        transaction.update(userRef, {
          isActive: false,
          deletedAt: FieldValue.serverTimestamp(),
        });
        // 2.2 Or delete the document:
        // transaction.delete(userRef);
      });

      console.log(`User ${uid} successfully archived and marked as inactive.`);
    } catch (error) {
      console.error(`Error in onUserDelete transaction for ${uid}:`, error);
    }
  });
