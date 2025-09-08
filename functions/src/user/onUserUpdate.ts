import * as functions from "firebase-functions";
import { auth, db } from "../admin";
import type { UserDocument } from "../types/userTypes";
import { VALID_ROLES } from "../types/userTypes";
import { logger } from "firebase-functions";
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
          logger.info(`Updated custom claim for ${uid} to '${newRole}'.`);
        });
      updatePromises.push(claimsUpdatePromise);
    }

    // --- Task 2: Sync email to Auth and emailVerified ---
    const updateData: UpdateRequest = {};
    if (newData.email && newData.email !== oldData.email) {
      updateData.email = newData.email;
      updateData.emailVerified = false;
      const verifiedEmailPromisse = db
        .collection("users")
        .doc(uid)
        .update({
          emailVerified: false,
        })
        .then(() => {
          logger.info(`Set emailVerified as false in firestore for ${uid}.`);
        });
      updatePromises.push(verifiedEmailPromisse);
    }

    // --- Task 3: Sync Profile to Auth ---
    if (newData.fullName && newData.fullName !== oldData.fullName) {
      updateData.displayName = newData.fullName;
    }
    if (newData.photoURL !== oldData.photoURL) {
      updateData.photoURL = newData.photoURL;
    }
    if (Object.keys(updateData).length > 0) {
      const profileUpdatePromise = auth.updateUser(uid, updateData).then(() => {
        logger.info(`Synced Auth profile for ${uid}.`);
      });
      updatePromises.push(profileUpdatePromise);
    }

    // --- Execute All Tasks ---
    if (updatePromises.length === 0) {
      logger.info("No relevant changes detected, exiting.");
      return null;
    }

    try {
      // Run all pending updates in parallel
      await Promise.all(updatePromises);
      logger.info(`All updates for user ${uid} completed successfully.`);
    } catch (error) {
      logger.error(`Failed to sync updates for user ${uid}:`, error);
      // Optional: Add rollback logic here if needed, but logging the error
      // for manual review is often a safer first step.
    }
    return null;
  });
