/**
 * Checks if an unknown error is an object with a 'code' property,
 * which is common for Firebase errors.
 * @param {unknown} error The error object to check.
 * @return {boolean} True if the error is a Firebase-like error, false otherwise.
 */
export const isFirebaseError = (error: unknown): error is { code: string } => {
  return typeof error === "object" && error !== null && "code" in error;
};
