import * as functions from "firebase-functions";
import { auth } from "../admin";
import { authorizeRequest } from "../security/authorization";
import { isFirebaseError } from "../utils/errorUtils";

interface UserDeleteData {
  uid: string;
}

export const deleteUser = functions
  .region("southamerica-east1")
  .https.onCall(async (data: UserDeleteData, context) => {
    const { uid: targetUid } = data;

    // 1. Security Check: Ensure the caller is an admin.
    await authorizeRequest(context, { role: "admin", targetUid });

    // 2. Validate Input
    if (!targetUid) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a 'uid' argument to delete.",
      );
    }

    // 3. Deletion Logic:
    try {
      console.info(`Admin ${context.auth?.uid} is deleting user ${targetUid}`);

      // Deleting a user from Auth automatically triggers the onDelete function
      // which handles the cleaning up of the Firestore document.
      await auth.deleteUser(targetUid);

      console.info(
        `User ${targetUid} successfully deleted from Authentication.`,
      );

      return {
        success: true,
        message: `Successfully deleted user ${targetUid}.`,
      };
    } catch (error) {
      console.error("Error deleting user:", error);
      if (isFirebaseError(error) && error.code === "auth/user-not-found") {
        throw new functions.https.HttpsError(
          "not-found",
          "The user to be deleted was not found.",
        );
      }
      throw new functions.https.HttpsError(
        "internal",
        "An unexpected error occurred while deleting the user.",
      );
    }
  });
