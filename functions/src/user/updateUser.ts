import * as functions from "firebase-functions";
import { db, FieldValue } from "../admin";
import { UserIncomingData, UserUpdateData } from "../types/userTypes";
import { authorizeRequest } from "../security/authorization";
import { parseUserName } from "../utils/userUtils";
import { removeWhitespace, keepOnlyDigits } from "../utils/stringUtils"; // <-- Import our new utils
import { logger } from "firebase-functions";
import { cpf as cpfValidator, cnpj as cnpjValidator } from "cpf-cnpj-validator";
import * as EmailValidator from "email-validator";

export const updateUser = functions
  .region("southamerica-east1")
  .https.onCall(async (data: UserIncomingData, context) => {
    // 1. Sanitize and Validate Inputs =======================================
    const targetUid = removeWhitespace(data.uid);
    const phoneNumber = keepOnlyDigits(data.phone);
    const photoURL = removeWhitespace(data.photoURL);
    const role = removeWhitespace(data.role);
    const cpf = keepOnlyDigits(data.cpf);
    const cnpj = keepOnlyDigits(data.cnpj);
    const studentId = keepOnlyDigits(data.studentId);
    const personType = removeWhitespace(data.personType);
    const email = removeWhitespace(data.email);
    const {
      firstName,
      lastName,
      fullName,
      displayName,
      initials,
      allLastNames,
    } = parseUserName(data.firstName, data.allLastNames);

    // 2. Authentication & Authorization =====================================
    await authorizeRequest(context, { targetUid, role: "admin" });

    if (!targetUid) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "The function must be called with a 'uid' argument.",
      );
    }

    // 3. Prepare Update Data ================================================
    const updateData: UserUpdateData = {
      lastUpdated: FieldValue.serverTimestamp(),
    };

    if (firstName) {
      updateData.firstName = firstName;
      updateData.lastName = lastName;
      updateData.allLastNames = allLastNames;
      updateData.fullName = fullName;
      updateData.displayName = displayName;
      updateData.initials = initials;
    }

    if (email && EmailValidator.validate(email)) {
      updateData.email = email;
    }

    if (phoneNumber !== null) {
      // Options: empty string, "(99) 9 9999-9999" or "(99) 9999-9999"
      if (phoneNumber === "" || [10, 11].includes(phoneNumber.length)) {
        updateData.phoneNumber = phoneNumber;
      } else {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "The phone number provided is not valid. Must be a string with 10 or 11 digits.",
        );
      }
    }

    if (cpf !== null) {
      if (cpf === "" || cpfValidator.isValid(cpf)) {
        updateData.cpf = cpf;
      } else {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "The CPF number provided is not valid.",
        );
      }
    }

    if (cnpj !== null) {
      if (cnpj === "" || cnpjValidator.isValid(cnpj)) {
        updateData.cnpj = cnpj;
      } else {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "The CNPJ number provided is not valid.",
        );
      }
    }

    // Dynamically add other fields if they exist
    const otherFields = {
      photoURL,
      role,
      cpf,
      cnpj,
      studentId,
      personType,
    };

    for (const [key, value] of Object.entries(otherFields)) {
      if (value) {
        updateData[key] = value;
      }
    }

    // Check if any fields were actually added besides the timestamp
    if (Object.keys(updateData).length <= 1) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "You must provide at least one valid field to update.",
      );
    }

    // 4. Execute Update =====================================================
    try {
      await db.collection("users").doc(targetUid).update(updateData);
      return { success: true, message: "User document successfully updated!" };
    } catch (error) {
      logger.error("Error updating user:", error);
      throw new functions.https.HttpsError(
        "internal",
        "Failed to update user document.",
      );
    }
  });
