import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

// type updateUserDataType = {
//   firstName?: string;
//   lastName?: string;
//   displayName?: string;
//   initials?: string;
//   phoneNumber?: string;
//   photoURL?: string;
//   lastUpdated: admin.firestore.FieldValue;
//   // email?: string;
// };

/**
 * Callable function to update user profile information.
 * Users can update their own profile; admins can update any profile.
 */
export const updateUserProfile = functions
  .region("southamerica-east1")
  .https.onCall(async (data, context) => {
    // 1. Authentication Check ===========================================
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "LMU_functions: User must be logged in to update profile.",
      );
    }

    // 2. Input Validation ===============================================
    const { uid: targetUid, firstName, lastName, phoneNumber, photoURL } = data; // Get the new data from the client

    if (!targetUid) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "LMU_functions: The function must be called with a 'uid' argument.",
      );
    }
    if (!firstName && !lastName && !phoneNumber && !photoURL) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "LMU_functions: You must provide at least one field to update.",
      );
    }

    // 3. Admin Permission Check ==============================================
    const callerUid = context.auth.uid; // Get the caller unique ID
    const callerDoc = await admin
      .firestore()
      .collection("users")
      .doc(callerUid)
      .get();
    const callerRole = callerDoc.data()?.role || "user";
    if (targetUid !== callerUid && callerRole !== "admin") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "LMU_functions: Only admins can edit others.",
      );
    }

    // 4. Prepare update data ==============================================
    // const updateData: updateUserDataType = {
    const updateData = {
      lastUpdated: FieldValue.serverTimestamp(),
    };
    // Note: Updating email and phoneNumber in Auth requires re-verification.
    if (phoneNumber !== null) {
      // todo: sanitize and validate if this is a proper phone number
      updateData.phoneNumber = phoneNumber;
    }
    if (photoURL !== null) {
      // todo: sanitize and validate if this is a proper URL
      updateData.photoURL = photoURL;
    }
    if (firstName && lastName) {
      updateData.firstName = firstName;
      updateData.lastName = lastName;
      updateData.initials = firstName[0] + lastName[0];
      updateData.displayName = [firstName, lastName].join(" ");
    }

    try {
      // 5. Update Firestore =================================================
      await admin
        .firestore()
        .collection("users")
        .doc(targetUid)
        .update(updateData);

      // 6. Update Auth: ===================================================
      // This will be done at onUserUpdate Trigger

      return { success: true, message: "User document successfully updated!" };
    } catch (error) {
      console.error("Error updating user:", error);
      throw new functions.https.HttpsError(
        "internal",
        "LMU_functions: Failed to update user document.",
      );
    }
  });
