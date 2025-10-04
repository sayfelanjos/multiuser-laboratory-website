import * as functions from "firebase-functions";
import { logger } from "firebase-functions";
import { CallableContext } from "firebase-functions/v1/https";

// ! TEMPORARY NATIVE ADMIN USERS
// A hardcoded list for granting immediate admin access.
// Best for development or a small, fixed number of superusers.
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
   * The UID of the user's being acted upon.
   * If provided, permission is granted if the caller's UID matches.
   */
  targetUid?: string;
  /**
   * The email of the user's being acted upon.
   * If provided, permission is granted if the caller's UID matches.
   */
  targetEmail?: string;
  /**
   * If provided, role is verified by accessing custom claims instead of
   * firestore database. Defaults to false.
   */
  useCustomClaims?: boolean;
}

/**
 * Verifies if a user has permission to perform an action.
 * Permission is granted if ANY of the following conditions are met:
 * ! 1. The user's email is in the `nativeAdminList`.
 * 2. The `targetUid` matches the user's own UID.
 * 3. The user has the `role` specified in the options.
 *
 * Throws an HttpsError if the user is unauthenticated or unauthorized.
 *
 * @param {CallableContext} context The function's context.
 * @param {AuthorizeRequestOptions} options An object specifying the authorization rules.
 */
export const authorizeRequest = async (
  context: CallableContext,
  options: AuthorizeRequestOptions = {},
) => {
  const { role: requiredRole, targetUid, targetEmail } = options;

  // =============================================
  // --- MANDATORY CHECKS (FAILS IF ANY MATCH) ---
  // =============================================

  // 1. Authentication Check (Mandatory)
  // This is the first and most critical gate.
  if (!context.auth) {
    logger.error("Authorization failed: User is not authenticated.");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "You must be logged in to perform this action.",
    );
  }

  const callerUid = context.auth.uid;
  const callerEmail = context.auth.token.email || "";

  // 2. Only Authentication needed:
  if (!targetUid && !requiredRole && !targetEmail) {
    logger.info(`Permission GRANTED for ${callerUid} (User Authenticated).`);
    return context.auth;
  }

  // ===============================================
  // --- PERMISSION CHECKS (SUCCESS IF ANY PASS) ---
  // ===============================================

  // 3. Native Admin Check
  // Grants immediate access to hardcoded superusers.
  if (nativeAdminList.includes(callerEmail)) {
    logger.info(`Permission GRANTED for ${callerEmail} (Native Admin).`);
    return context.auth;
  }

  // 4. Self-Access Check
  // Grants access if the user is modifying their own resource.
  if (targetUid && callerUid === targetUid) {
    logger.info(`Permission GRANTED for ${callerUid} (Self-Access -> uid).`);
    return context.auth;
  }

  // 5. Self-Access Check
  // Grants access if the user is modifying their own resource.
  if (targetEmail && callerEmail === targetEmail) {
    logger.info(`Permission GRANTED for ${callerUid} (Self-Access -> email).`);
    return context.auth;
  }

  // 6. Role-Based Check
  // Grants access if the user has the required role.
  if (requiredRole) {
    // Check role from the ID token's custom claims (fast and efficient).
    const claimsRole = context.auth.token.role;

    if (claimsRole === requiredRole) {
      logger.info(
        `Permission GRANTED for ${callerUid} (Role: ${requiredRole}).`,
      );
      return context.auth;
    }
  }

  // ===================
  // --- DENY ACCESS ---
  // ===================

  // If the function reaches this point, none of the checks passed.
  logger.error(
    `Permission DENIED for ${callerEmail}. Failed checks:\n` +
      (targetUid ? ` - Self-Access (Target: ${targetUid}),\n` : "") +
      (targetEmail ? ` - Self-Access (Target: ${targetEmail}),\n` : "") +
      (requiredRole ? ` - Role (Required: ${requiredRole}),\n` : ""),
  );

  throw new functions.https.HttpsError(
    "permission-denied",
    "You do not have the required permissions to perform this action.",
  );
};
