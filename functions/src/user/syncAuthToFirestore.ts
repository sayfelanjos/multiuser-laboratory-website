import * as functions from "firebase-functions";
import { logger } from "firebase-functions";
import { db, auth } from "../admin";
import { UserUpdateData, UserDocument } from "../types/userTypes";
import * as EmailValidator from "email-validator";
import { authorizeRequest } from "../security/authorization";

export const syncAuthToFirestore = functions
  .region("southamerica-east1")
  .https.onCall(async (_, context) => {
    const authInfo = await authorizeRequest(context);
    const callerUid = authInfo.uid;

    // Get the most recent auth info:
    const user = await auth.getUser(callerUid);
    const callerEmail = user.email || "";
    const callerPhone = user.phoneNumber || "";

    // Get the current the user's document
    const userDocRef = db.doc(`users/${callerUid}`);
    const userDoc = await userDocRef.get();
    const userData = userDoc.data() as UserDocument;

    if (!userData) {
      logger.log("could not get user document");
      return;
    }
    // 1. Check if email or phone number actually changed
    const emailChanged = userData.email !== callerEmail;
    const phoneChanged = userData.phone !== callerPhone;

    if (!emailChanged && !phoneChanged) {
      logger.info(
        `User ${callerUid} email/phone were not changed. No sync needed.`,
      );
      return;
    }

    // 2. Prepare the data object for Firestore
    const updateData: UserUpdateData = {};

    if (emailChanged) {
      logger.info(
        `User ${callerUid} email changed from ${userData.email} to ${callerEmail}`,
      );
      updateData.email = callerEmail;
    }

    if (phoneChanged) {
      logger.info(
        `User ${callerUid} phone changed from ${userData.phone} to ${callerPhone}`,
      );
      updateData.phone = callerPhone;
    }

    // If there's nothing to update (e.g., email was removed), exit
    if (Object.keys(updateData).length === 0) {
      logger.info("No new data to sync.");
      return;
    }

    // Update the Firestore document
    try {
      await userDocRef.update(updateData);
      logger.log(
        `Successfully synced auth changes for user ${callerUid} to Firestore.`,
      );
    } catch (error) {
      logger.error(
        `Error syncing auth changes for user ${callerUid} to Firestore:`,
        error,
      );
    }
  });
/* */
