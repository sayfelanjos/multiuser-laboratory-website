console.log("--> Loading createUser.ts...");

import * as functions from "firebase-functions";
import { auth } from "../admin";
import { authorizeRequest } from "../security/authorization";
import { sanitizeSpaces, removeWhitespace } from "../utils/stringUtils";
import { isFirebaseError } from "../utils/errorUtils";
import type { NewUserData } from "../types/userTypes"; // <-- Import type

export const createUser = functions
  .region("southamerica-east1")
  .https.onCall(async (data: NewUserData, context) => {
    // 1. Security Check: Ensure the caller is an administrator.
    await authorizeRequest(context, { role: "admin" });

    // 2. Sanitize & Validate Inputs
    const { email, password, firstName, lastName, role } = data;
    const sanitizedEmail = removeWhitespace(email);
    const sanitizedFirstName = sanitizeSpaces(firstName);
    const sanitizedLastName = sanitizeSpaces(lastName);

    if (
      !sanitizedEmail ||
      !password ||
      !sanitizedFirstName ||
      !sanitizedLastName
    ) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Missing required fields: email, password, firstName, lastName.",
      );
    }

    try {
      // 3. Create user in Firebase Authentication
      const userRecord = await auth.createUser({
        email: sanitizedEmail,
        password: password,
        displayName: `${sanitizedFirstName} ${sanitizedLastName}`,
      });

      // 4. Set custom claims for the user's role
      await auth.setCustomUserClaims(userRecord.uid, { role: role || "user" });

      // * The Firestore user document is created by a separate onCreate trigger.

      return {
        success: true,
        message: `Successfully created user ${sanitizedFirstName} (${sanitizedEmail}).`,
        uid: userRecord.uid,
      };
    } catch (error) {
      console.error("Error creating new user:", error);
      if (
        isFirebaseError(error) &&
        error.code === "auth/email-already-exists"
      ) {
        throw new functions.https.HttpsError(
          "already-exists",
          "This email is already in use.",
        );
      }
      throw new functions.https.HttpsError(
        "internal",
        "An unexpected error occurred while creating the user.",
      );
    }
  });
