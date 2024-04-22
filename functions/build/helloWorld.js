"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.helloWorld = void 0;
var _firebaseFunctions = require("firebase-functions");
var _https = require("firebase-functions/v2/https");
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const helloWorld = exports.helloWorld = (0, _https.onRequest)((request, response) => {
  _firebaseFunctions.logger.info("Hello logs!", {
    structuredData: true
  });
  response.send("Hello from Firebase!");
});