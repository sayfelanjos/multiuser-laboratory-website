// import * as admin from "firebase-admin";
import dotenv from "dotenv";

// // Check the length of the apps array
// if (admin.apps.length === 0) {
//   // Initialize Firebase Admin SDK
//   // This is necessary to use Firebase services like Authentication.
//   admin.initializeApp();
// }

// Load environment variables from a .env file based on the NODE_ENV
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Export the functions so they can be used in other parts of the application.
export { deleteUser } from "./user/deleteUser";
export { createUser } from "./user/createUser";
export { migrateUsers } from "./user/migrateUsers";
export { onUserCreate } from "./user/onUserCreate";
export { onUserDelete } from "./user/onUserDelete";
export { onUserUpdate } from "./user/onUserUpdate";
export { sendEmail } from "./sendEmail";
export { updateUser } from "./user/updateUser";
