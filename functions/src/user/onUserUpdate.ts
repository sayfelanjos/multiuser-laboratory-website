import * as functions from "firebase-functions";
import { auth } from "../admin";
import type { UserDocument } from "../types/userTypes";
import { VALID_ROLES } from "../types/userTypes";
import { UpdateRequest } from "firebase-admin/auth";

/**
 * Firestore trigger to sync user profile and role changes back to Firebase Auth.
 */
export const onUserUpdate = functions
  .region("southamerica-east1")
  .firestore.document("users/{uid}")
  .onUpdate(async (change, context) => {
    const { uid } = context.params;
    const newData = change.after.data() as UserDocument;
    const oldData = change.before.data() as UserDocument;

    // Create a list to hold all the async tasks
    const updatePromises: Promise<void>[] = [];

    // --- Task 1: Sync Role to Custom Claims ---
    const newRole = newData.role;
    const oldRole = oldData.role;
    const userRecord = await auth.getUser(uid);
    const userClaims = userRecord.customClaims || {};

    if (newRole !== oldRole && VALID_ROLES.includes(newRole)) {
      const claimsUpdatePromise = auth
        .setCustomUserClaims(uid, { ...userClaims, role: newRole })
        .then(() => {
          console.info(`Updated custom claim for ${uid} to '${newRole}'.`);
        });
      updatePromises.push(claimsUpdatePromise);
    }

    // --- Task 2: Sync email to Auth and emailVerified ---
    const updateAuthData: UpdateRequest = {};
    // if (newData.email && newData.email !== oldData.email) {
    //   updateAuthData.email = newData.email;
    //   updateAuthData.emailVerified = false;
    //   const verifiedEmailPromisse = db
    //     .collection("users")
    //     .doc(uid)
    //     .update({
    //       emailVerified: false,
    //     })
    //     .then(() => {
    //       console.info(`Set emailVerified as false in firestore for ${uid}.`);
    //     });
    //   updatePromises.push(verifiedEmailPromisse);
    // }

    // --- Task 3: Sync Profile to Auth ---

    // 3.1 - Names
    if (newData.names && newData.names.fullName !== oldData.names.fullName) {
      updateAuthData.displayName = newData.names.fullName;
    }

    // 3.2 - Photos
    // if (newData.photos && newData.photos.smallUrl !== oldData.photos.smallUrl) {
    //   updateAuthData.photoURL = newData.photos.smallUrl;
    // }

    // 3.3 - Apply changes
    if (Object.keys(updateAuthData).length > 0) {
      const profileUpdatePromise = auth
        .updateUser(uid, updateAuthData)
        .then(() => {
          console.info(`Synced Auth profile for ${uid}.`);
        });
      updatePromises.push(profileUpdatePromise);
    }

    // --- Execute All Tasks ---
    if (updatePromises.length === 0) {
      console.info("No relevant changes detected, exiting.");
      return null;
    }

    try {
      // Run all pending updates in parallel
      await Promise.all(updatePromises);
      console.info(`All updates for user ${uid} completed successfully.`);
    } catch (error) {
      console.error(`Failed to sync updates for user ${uid}:`, error);
      // Optional: Add rollback logic here if needed, but logging the error
      // for manual review is often a safer first step.
    }
    return null;
  });
