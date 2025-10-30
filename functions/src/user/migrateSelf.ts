import { auth } from "../admin";
import { authorizeRequest } from "../security/authorization";
import * as functions from "firebase-functions";
import {
  assignDefaultCustomClaims,
  createUserDocument,
} from "./userManagement";

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

    console.info(
      `User ${validAuth.token.email} is migrating his self account.`,
    );

    try {
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
