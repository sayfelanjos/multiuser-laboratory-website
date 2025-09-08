import { sanitizeSpaces } from "./stringUtils";

interface ParsedName {
  firstName: string;
  lastName: string;
  allLastNames: string;
  displayName: string;
  fullName: string;
  initials: string;
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
  const sanitizeName = sanitizeSpaces(name);
  const sanitizeSurname = sanitizeSpaces(surname);
  const fullName = sanitizeSpaces(
    sanitizeSurname ? `${sanitizeName} ${sanitizeSurname}` : sanitizeName,
  );
  if (!fullName) {
    return {
      firstName: "",
      lastName: "",
      allLastNames: "",
      displayName: "",
      fullName: "",
      initials: "",
    };
  }

  const nameParts = fullName.split(" ");
  const firstName = nameParts[0];

  if (nameParts.length === 1) {
    return {
      firstName,
      lastName: "",
      allLastNames: "",
      displayName: firstName,
      fullName: firstName,
      initials: firstName.slice(0, 2).toUpperCase(),
    };
  }

  const lastName = nameParts.slice(-1)[0];

  return {
    firstName,
    lastName: nameParts.slice(-1)[0],
    allLastNames: nameParts.slice(1).join(" "),
    displayName: [firstName, lastName].join(" "),
    fullName: nameParts.join(" "),
    initials: (firstName[0] + lastName[0]).toUpperCase(),
  };
};
