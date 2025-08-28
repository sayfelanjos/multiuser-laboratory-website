import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const createUserDocument = async (user) => {
  const { uid, email, displayName = "", photoURL } = user;
  const db = admin.firestore();
  const userDoc = db.collection("users").doc(uid);
  const displayNameSanitizedArray = displayName
    .trim()
    .replace(/\s+/g, " ")
    .split(" ");
  // .map((name) => name[0].toUpperCase() + name.slice(1).toLowerCase());
  // Extract first name
  const firstName = displayNameSanitizedArray[0] || "";
  // Extract last name
  const lastName = displayNameSanitizedArray.slice(-1)[0] || "";
  // Extract all middle name(s)
  const middleAndLastNames = displayNameSanitizedArray.slice(1).join(" ") || "";
  //
  const createdAt = user.metadata.creationTime
    ? new Date(user.metadata.creationTime)
    : FieldValue.serverTimestamp();

  return userDoc
    .set({
      uid, // From Firebase Auth (duplicate for quick lookups)
      email, // From Firebase Auth
      emailVerified: user.emailVerified,
      displayName: [firstName, middleAndLastNames].filter(Boolean).join(" "),
      firstName,
      lastName: middleAndLastNames,
      initials: firstName[0] + lastName[0],
      // Contact Info
      phoneNumber: "",
      country: "BR",
      // Documents
      personType: "unset", // "unset" | "individual" | "company" | "student"
      cpf: "", // Required if personType = "individual"
      cnpj: "", // Required if personType = "company"
      studentId: "", // Required if personType = "student"
      // cpfCnpj: "",

      role: "user", // "user" (default) | "technician" | "manager" | "admin"
      photoURL: photoURL ?? null,
      createdAt,
      lastUpdated: createdAt,

      // Permissions / Flags
      isActive: true, // Soft-delete / ban flag
      preferences: {
        // Nest user preferences for scalability
        theme: "light", // Default
        language: "pt", // pt | en
      },
    })
    .then((response) => {
      console.log(
        `LMU_functions: Successfully created Firestore document for new user: ${uid}.`,
        response,
      );
    })
    .catch((error) => {
      console.error("LMU_functions: Error creating user document:", error);
    });
};

/**
 * Triggered when a new user signs up.
 * Creates a corresponding user document in Firestore.
 */
export const onUserCreate = functions
  .region("southamerica-east1") // Match your project's region
  .auth.user()
  .onCreate(async (user) => {
    console.log(
      "LMU_functions: New user signed up. Creating document...",
      user,
    );

    return createUserDocument(user);
  });
