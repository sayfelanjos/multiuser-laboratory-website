console.log("--> Loading stringUtils.ts...");

/**
 * Removes all whitespace characters from a string.
 * @param {unknown} input The value to sanitize.
 * @return {string} The sanitized string.
 */
export const removeWhitespace = (input: unknown): string => {
  return String(input ?? "").replace(/\s/g, "");
};

/**
 * Removes all non-digit characters from a string.
 * @param {unknown} input The value to sanitize.
 * @return {string} The sanitized string.
 */
export const keepOnlyDigits = (input: unknown): string => {
  return String(input ?? "").replace(/\D/g, "");
};

/**
 * Trims leading/trailing whitespace and collapses multiple spaces into one.
 * @param {unknown} input The value to sanitize.
 * @return {string} The sanitized string.
 */
export const sanitizeSpaces = (input: unknown): string => {
  return String(input ?? "")
    .trim()
    .replace(/\s+/g, " ");
};
