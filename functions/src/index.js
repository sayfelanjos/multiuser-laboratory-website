import * as admin from "firebase-admin";
import dotenv from "dotenv";

// Initialize Firebase Admin SDK
// This is necessary to use Firebase services like Authentication.
admin.initializeApp();

// Load environment variables from a .env file based on the NODE_ENV
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// Export the functions so they can be used in other parts of the application.
export { deleteUser } from "./deleteUser";
export { migrateUsers } from "./migrateUsers";
export { onUserCreate } from "./onUserCreate";
export { onUserDelete } from "./onUserDelete";
export { onUserUpdate } from "./onUserUpdate";
export { sendEmail } from "./sendEmail";
export { updateUserProfile } from "./updateUserProfile";
