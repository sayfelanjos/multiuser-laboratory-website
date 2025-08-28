import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const deleteUser = functions
  .region("southamerica-east1") // Match your project's region
  .https.onCall(async (data, context) => {
    // Check if the user making the request is authenticated
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "LMU_functions: You must be logged in to delete a user.",
      );
    }

    // Get the UID of the user making the request
    const callerUid = context.auth.uid;
    // Get the UID of the user to be deleted from the data payload
    const targetUid = data.uid;

    if (!targetUid) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "LMU_functions: The function must be called with a 'uid' argument.",
      );
    }

    try {
      // --- Security Check using Firestore Role ---
      // Get the document of the user calling the function
      const callerDoc = await admin
        .firestore()
        .collection("users")
        .doc(callerUid)
        .get();

      // Check if the 'role' field in their document is 'admin'
      if (callerDoc.data()?.role !== "admin") {
        throw new functions.https.HttpsError(
          "permission-denied",
          "LMU_functions: You must be an admin to delete users.",
        );
      }

      // --- Deletion Logic ---
      console.log(`Admin ${callerUid} is deleting user ${targetUid}`);

      // 1. Delete the user from Firebase Authentication
      await admin.auth().deleteUser(targetUid);

      console.log(
        `LMU_functions: User ${targetUid} successfully deleted from auth!`,
      );

      return {
        message: `Successfully deleted user from auth: uid "${targetUid}".`,
      };
    } catch (error) {
      console.error("LMU_functions: Error deleting user:", error);
      // Re-throw the error so the client knows what happened
      throw error;
    }
  });
