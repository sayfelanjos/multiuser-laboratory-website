console.log("--> Loading authorization.ts...");

import * as functions from "firebase-functions";
import { db } from "../admin";

// ! TEMPORARY NATIVE ADMIN USERS
export const nativeAdminList = [
  // Test
  "otter.chicken.216@example.com",
  // Disney
  "lemfem@unicamp.br",
  "disney@unicamp.br",
  "disney.tho@gmail.com",
  // Saymon
  "saymon.anjos@minasinfotech.com.br",
  "saymonfelipe@hotmail.com",
  "sayfelanjos@gmail.com",
  // Ronald
  "r196815@dac.unicamp.br",
  "ronaldgabrielfs@gmail.com",
  // Rafael
  "r176121@dac.unicamp.br",
  "rafaelogallas@gmail.com",
];

interface AuthorizeRequestOptions {
  /**
   * If provided, the user must have this role for permission to be granted
   * (unless they are acting on their own document).
   */
  role?: "user" | "manager" | "technician" | "admin";
  /**
   * The UID of the user's document being acted upon.
   * If provided, permission is granted if the caller's UID matches.
   */
  targetUid?: string;
  /**
   * If provided, role is verified by accessing custom claims instead of
   * firestore database. Defaults to false.
   */
  useCustomClaims?: boolean;
}

/**
 * Verifies that a user is authenticated and has permission to perform an action.
 * Throws an HttpsError if permission is denied.
 * @param {functions.https.CallableContext} context The function's context object.
 * @param {AuthorizeRequestOptions} options An object specifying the authorization rules.
 */
export const authorizeRequest = async (
  context: functions.https.CallableContext,
  options: AuthorizeRequestOptions = { useCustomClaims: true },
): Promise<void> => {
  const { role: requiredRole, targetUid, useCustomClaims = true } = options;

  // 1. Always check for authentication first.
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to perform this action.",
    );
  }

  // Get the caller UID;
  const callerUid = context.auth.uid;

  // 2. If a targetUid is provided, check for self-permission.
  if (targetUid && callerUid !== targetUid) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "You can only perform this action on your own account.",
    );
  }

  // ! X. Special and TEMPORARY case: Native admin Users skip role request:
  const callerEmail = context.auth.token.email || "";
  if (nativeAdminList.includes(callerEmail)) {
    return;
  }

  // Get claims from the token
  const { role: callerRole = "user" } = context.auth.token;

  // 3. If a specific role is required, check for it.
  if (requiredRole) {
    if (useCustomClaims) {
      if (callerRole !== requiredRole) {
        // Permission granted based on customClains role.
        throw new functions.https.HttpsError(
          "permission-denied",
          `You must have the '${requiredRole}' role to perform this action.`,
        );
      }
    } else {
      const callerDoc = await db.collection("users").doc(callerUid).get();
      if (callerDoc.data()?.role !== requiredRole) {
        // Permission granted based on FireStore database role.
        throw new functions.https.HttpsError(
          "permission-denied",
          `You must have the '${requiredRole}' role to perform this action.`,
        );
      }
    }
  }

  // 4. If the function has reached this point, permission is granted.
  return;
};
