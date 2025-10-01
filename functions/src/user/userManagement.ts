import { auth, db, UserRecord, FieldValue } from "../admin";
import type { UserDocument } from "../types/userTypes";
import { parseUserName } from "../utils/userUtils";
// ! TEMPORARY NATIVE ADMIN USERS:
import { nativeAdminList } from "../security/authorization";
import { logger } from "firebase-functions";

/**
 * Creates a Firestore document for a newly created user.
 * @param {UserRecord} user The user record from Firebase Authentication.
 */
export const createUserDocument = async (user: UserRecord): Promise<void> => {
  const { uid, email, photoURL, phoneNumber, emailVerified } = user;
  const { firstName, lastName, allLastNames, initials } = parseUserName(
    user.displayName,
  );
  const creationTime =
    new Date(user.metadata.creationTime) || FieldValue.serverTimestamp();

  const newUserDocument: UserDocument = {
    uid,
    email: email || null,
    emailVerified,
    names: {
      displayName: `${firstName} ${lastName}`,
      fullName: `${firstName} ${allLastNames}`,
      allLastNames,
      firstName,
      lastName,
      initials: initials.toUpperCase(),
    },
    phoneNumber: phoneNumber || null,
    photos: {
      smallUrl: photoURL || null,
    },
    country: "BR",
    personType: "unset",
    documents: {
      cpf: "",
      cnpj: "",
      studentId: "",
    },
    role: user.customClaims?.role || "user",
    createdAt: creationTime,
    lastUpdated: creationTime,
    isActive: true,
    preferences: {
      theme: "light",
      language: "pt",
    },
  };

  try {
    await db.collection("users").doc(uid).set(newUserDocument);
    logger.info(
      `Successfully created Firestore document for new user: ${uid}.`,
    );
  } catch (error) {
    logger.error(`Error creating Firestore document for user ${uid}:`, error);
    // Optional: add more robust error handling, like sending an alert
  }
};

/**
 * Assigns a default 'user' role via custom claims if no role is present.
 * This is idempotent and safe to run multiple times.
 * @param {UserRecord} user The user record from Firebase Authentication.
 */
export const assignDefaultCustomClaims = async (
  user: UserRecord,
): Promise<void> => {
  // No need to re-fetch the user, claims are on the object
  const userClaims = user.customClaims;
  const email = user.email || "";
  const role = nativeAdminList.includes(email) ? "admin" : "user";

  if (userClaims?.role) {
    logger.info(`User ${user.uid} already has role '${userClaims.role}'.`);
    return;
  }

  try {
    await auth.setCustomUserClaims(user.uid, { role, ...userClaims });
    logger.info(`Assigned role "${role}" to ${user.uid}`);
  } catch (error) {
    logger.error(`Error setting default claims for user ${user.uid}:`, error);
  }
};
