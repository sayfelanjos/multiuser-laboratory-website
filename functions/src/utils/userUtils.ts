console.log("--> Loading userUtils.ts...");

import { sanitizeSpaces } from "./stringUtils";

interface ParsedName {
  firstName: string;
  lastName: string;
  initials: string;
  allLastNames: string;
  displayName: string;
}

/**
 * Parses and sanityzes a full display name into a first and last name.
 * Handles single names, multiple middle names, and extra spacing.
 * @param {string | null | undefined} name The full name to parse or the first name if second parameter is provided.
 * @param {string | null | undefined} surname the last name or empty
 * @return {ParsedName} An object containing the firstName, the lastName, and the full lastNames.
 */
export const parseUserName = (
  name?: string | null,
  surname?: string | undefined,
): ParsedName => {
  const displayName = sanitizeSpaces(surname ? `${name} ${surname}` : name);
  if (!displayName) {
    return {
      displayName: "",
      firstName: "",
      lastName: "",
      allLastNames: "",
      initials: "",
    };
  }

  const nameParts = displayName.split(" ");
  const firstName = nameParts[0];

  if (nameParts.length <= 1) {
    return {
      displayName,
      firstName,
      lastName: "",
      allLastNames: "",
      initials: "",
    };
  }

  const lastName = nameParts.slice(-1)[0];
  const allLastNames = nameParts.slice(1).join(" ");
  const initials = firstName[0] + lastName[0];

  return {
    displayName,
    firstName,
    lastName,
    allLastNames,
    initials,
  };
};
