console.log("--> Loading userTypes.ts...");

import { FirestoreFieldValue } from "../admin";

interface userPreferences {
  theme: "light" | "dark";
  language: "pt" | "en";
}

// type userRoles = "user" | "technician" | "manager" | "admin";
// type personTypes = "unset" | "individual" | "company" | "student";

// Define the roles and person types as a const tuple for type safety.
// Placing it here makes it the single source of truth for what a role can be.
export const VALID_ROLES = ["admin", "technician", "manager", "user"] as const;
export const VALID_PERSON_TYPES = [
  "unset",
  "individual",
  "company",
  "student",
] as const;

// This uses the const above to create a union type automatically.
type userRoles = (typeof VALID_ROLES)[number];
type personTypes = (typeof VALID_PERSON_TYPES)[number];

/**
 * Defines the structure of a user document in the 'users' Firestore collection.
 */
export interface UserDocument {
  [key: string]:
    | string
    | boolean
    | null
    | FirestoreFieldValue
    | userPreferences
    | Date
    | undefined; // Index signature for dynamic properties
  uid: string;
  email?: string | null;
  emailVerified: boolean;
  // password: string;

  displayName: string;
  firstName: string;
  lastName: string;
  initials: string;

  phoneNumber?: string | null;
  photoURL?: string | null;
  country: string;

  // Role assigned via custom claims, duplicated for client-side access
  role: userRoles;

  // Document fields for different user types
  personType: personTypes;
  cpf?: string;
  cnpj?: string;
  studentId?: string;

  // Timestamps and status
  createdAt: FirestoreFieldValue | Date;
  lastUpdated: FirestoreFieldValue | Date;
  isActive: boolean;

  // Nested user preferences
  preferences: userPreferences;
}

// Define an interface for the a new user
export interface NewUserData {
  email: string;
  password: string;
  role: userRoles;
  firstName: string;
  lastName: string;
}

// Define an interface for the incoming data for type safety
export interface UserIncomingData {
  uid: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: string;
  cpf?: string;
  cnpj?: string;
  studentId?: string;
  personType?: string;
  photoURL?: string;
}

// Define an interface for the updated data for type safety
export interface UserUpdateData {
  [key: string]: string | FirestoreFieldValue | Date | undefined;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  initials?: string;
  phoneNumber?: string;
  role?: userRoles;
  cpf?: string;
  cnpj?: string;
  studentId?: string;
  personType?: personTypes;
  photoURL?: string;
  lastUpdated?: FirestoreFieldValue | Date;
}
