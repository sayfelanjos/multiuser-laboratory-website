import { auth } from "../admin";
import { authorizeRequest } from "../security/authorization";
import * as functions from "firebase-functions";
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
export const migrateSelf = functions
  .region("southamerica-east1")
  .https.onCall(async (data, context) => {
    const validAuth = await authorizeRequest(context);
    const callerUid = validAuth.uid;
    const user = await auth.getUser(callerUid);

    logger.info(`User ${validAuth.token.email} is migrating his self account.`);

    try {
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
