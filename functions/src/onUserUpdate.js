import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const onUserUpdate = functions
  .region("southamerica-east1")
  .firestore.document("users/{uid}")
  .onUpdate(async (change, context) => {
    const targetUid = context.params.uid;
    const newData = change.after.data();
    const prevData = change.before.data();

    // Exit if no meaningful change (to avoid infinite loops)
    if (
      prevData &&
      prevData.displayName === newData.displayName &&
      prevData.photoURL === newData.photoURL &&
      // prevData.email === newData.email &&
      // prevData.phone === newData.phone &&
      true
    ) {
      console.log("LMU_functions: No relevant changes detected, exiting.");
      return null;
    }

    try {
      await admin.auth().updateUser(targetUid, {
        displayName: newData.displayName,
        photoURL: newData.photoURL,
        // email: newData.email,
      });

      console.log(
        `LMU_functions: Successfully synced user ${targetUid} to Auth!`,
      );
    } catch (err) {
      console.error(`LMU_functions: Failed to sync user ${targetUid}:`, err);

      // Optional: rollback Firestore if Auth fails
      if (prevData) {
        await change.after.ref.set(prevData, { merge: true });
      }
    }

    return null;
  });
