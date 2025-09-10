import * as functions from "firebase-functions";
import { UserRecord } from "../admin";
import {
  assignDefaultCustomClaims,
  createUserDocument,
} from "./userManagement";
import { logger } from "firebase-functions";

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
      logger.info(`New user created: ${user.uid}. Setting up profile...`);

      // These two operations can run in parallel for efficiency
      await Promise.all([
        assignDefaultCustomClaims(user),
        createUserDocument(user),
      ]);

      logger.info(`Successfully set up profile for user ${user.uid}.`);
    } catch (error) {
      logger.error(`Failed to set up profile for user ${user.uid}:`, error);
    }
  });
