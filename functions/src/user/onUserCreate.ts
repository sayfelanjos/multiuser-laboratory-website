import * as functions from "firebase-functions";
import { UserRecord } from "../admin";
import {
  assignDefaultCustomClaims,
  createUserDocument,
} from "./userManagement";

/**
 * Triggered when a new user signs up or is created by an admin.
 * 1. Assigns a default custom claim for role-based access.
 * 2. Creates a corresponding user document in Firestore.
 */
export const onUserCreate = functions
  .region("southamerica-east1")
  .auth.user()
  .onCreate(async (user: UserRecord) => {
    try {
      console.info(`New user created: ${user.uid}. Setting up profile...`);

      // These two operations can run in parallel for efficiency
      await Promise.all([
        assignDefaultCustomClaims(user),
        createUserDocument(user),
      ]);

      console.info(`Successfully set up profile for user ${user.uid}.`);
    } catch (error) {
      console.error(`Failed to set up profile for user ${user.uid}:`, error);
    }
  });
