console.log("--> Loading migrateUser.ts...");

import * as functions from "firebase-functions";
import { db, auth } from "../admin";
import { authorizeRequest } from "../security/authorization";
import {
  createUserDocument,
  assignDefaultCustomClaims,
} from "./userManagement";

export const migrateUsers = functions
  .region("southamerica-east1")
  .runWith({ timeoutSeconds: 540, memory: "1GB" }) // Use higher resources for long tasks
  .https.onCall(async (data, context) => {
    // 1. Security Check: Only an admin can run this.
    await authorizeRequest(context, { role: "admin" });

    let migratedCount = 0;
    let skippedCount = 0;
    let pageToken; // To paginate through the list of users

    try {
      console.log("Starting user migration...");

      // 2. Loop through all users in batches
      do {
        const listUsersResult = await auth.listUsers(1000, pageToken);
        pageToken = listUsersResult.pageToken;

        // Create a list of promises for the current batch
        const userProcessingPromises = listUsersResult.users.map(
          async (userRecord) => {
            const userDocRef = db.collection("users").doc(userRecord.uid);
            const userDoc = await userDocRef.get();

            // 1. Always ensure the default claim is set (first)
            await assignDefaultCustomClaims(userRecord);

            // 2. Only create the document if it's missing (after)
            if (userDoc.exists) {
              skippedCount++;
            } else {
              await createUserDocument(userRecord);
              migratedCount++;
            }
          },
        );

        // Wait for the entire batch to finish processing
        await Promise.all(userProcessingPromises);
        console.log(
          `Processed batch of ${listUsersResult.users.length} users.`,
        );
      } while (pageToken);

      const message = `Migration complete. Migrated: ${migratedCount}, Skipped: ${skippedCount}.`;
      console.log(message);
      return { success: true, message };
    } catch (error) {
      console.error("Error during user migration:", error);
      throw new functions.https.HttpsError(
        "internal",
        "User migration failed.",
      );
    }
  });
