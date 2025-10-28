import { FirestoreFieldValue } from "../admin";

interface userPreferences {
  theme: "light" | "dark";
  language: "pt" | "en";
}

// ========================================================================
// Auxiliary types: -------------------------------------------------------
// ========================================================================

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
type userNames = {
  firstName: string;
  allLastNames: string;
  lastName: string;
  fullName: string;
  displayName: string;
  initials: string;
};
type userPhotos = {
  medium?: string | null;
  mediumUrl?: string | null;
  small?: string | null;
  smallUrl?: string | null;
  thumb?: string | null;
  thumbUrl?: string | null;
};
type userDocuments = {
  cpf?: string;
  cnpj?: string;
  studentId?: string;
};

// ========================================================================
// Exporting types: -------------------------------------------------------
// ========================================================================

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
    | userNames
    | userPhotos
    | userDocuments
    | undefined; // Index signature for dynamic properties
  uid: string;
  email?: string | null;
  emailVerified: boolean;
  // password: string;

  names: userNames;
  phoneNumber?: string | null;
  photos: userPhotos;
  country: string;

  // Role assigned via custom claims, duplicated for client-side access
  role: userRoles;

  // Document fields for different user types
  personType: personTypes;
  documents: userDocuments;

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
  email?: string;
  firstName?: string;
  allLastNames?: string;
  phone?: string;
  role?: string;
  cpf?: string;
  cnpj?: string;
  studentId?: string;
  personType?: string;
  photoURL?: string;
}

// Define an interface for the updated data for type safety
export interface UserUpdateData {
  [key: string]:
    | string
    | FirestoreFieldValue
    | Date
    | boolean
    | userNames
    | userDocuments
    | userPhotos
    | undefined;
  email?: string;
  emailVerified?: boolean;
  names?: userNames;
  phone?: string;
  documents?: userDocuments;
  role?: userRoles;
  personType?: personTypes;
  photos?: userPhotos;
  lastUpdated?: FirestoreFieldValue | Date;
}
