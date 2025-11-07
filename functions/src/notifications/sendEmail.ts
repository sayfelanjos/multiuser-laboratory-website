import {
  onRequest,
  HttpsError,
  // onCall
} from "firebase-functions/v2/https";
import * as sgMail from "@sendgrid/mail";
import * as functions from "firebase-functions";
import { authorizeRequest } from "../security/authorization";

// Define an interface for the expected request body
interface EmailData {
  to?: string[] | string;
  subject?: string;
  html?: string;
}

let isSendGridInitialized = false;
const { SENDGRID_EMAIL_TO, SENDGRID_EMAIL_FROM, SENDGRID_API_KEY } =
  process.env;

/**
 * An HTTP-triggered function to send a templated email via SendGrid.
 * It reads the subject and HTML content from the request body.
 */
export const sendEmail = onRequest(
  { cors: true, region: "southamerica-east1" },
  async (request, response) => {
    // 1. Check the flag before running the initialization logic
    if (!isSendGridInitialized) {
      console.log("Initializing SendGrid client..."); // Add a log to see it in action

      if (SENDGRID_API_KEY) {
        sgMail.setApiKey(SENDGRID_API_KEY);
      } else {
        console.warn("SENDGRID_API_KEY environment variable not set.");
      }

      // Set the flag to true so this block never runs again for the life of this function instance
      isSendGridInitialized = true;
    }

    // 1. Check for Server Configuration Errors
    if (!SENDGRID_EMAIL_TO || !SENDGRID_EMAIL_FROM || !SENDGRID_API_KEY) {
      !SENDGRID_EMAIL_TO &&
        console.error(
          "SendGrid SENDGRID_EMAIL_TO environment variable are not configured.",
        );
      !SENDGRID_EMAIL_FROM &&
        console.error(
          "SendGrid SENDGRID_EMAIL_FROM environment variable are not configured.",
        );
      !SENDGRID_API_KEY &&
        console.error(
          "SendGrid SENDGRID_API_KEY environment variable are not configured.",
        );
      response.status(500).send({
        error: "Server configuration error.",
      });
      return;
    }

    // 2. Validate Incoming Data
    const { subject, html } = request.body as EmailData;
    if (!subject || !html) {
      console.warn("Request missing 'subject' or 'html' in body.", {
        body: request.body,
      });
      response.status(400).send({ error: "Missing required fields." });
      return;
    }

    // 3. Send Email
    const msg = {
      to: SENDGRID_EMAIL_TO,
      from: SENDGRID_EMAIL_FROM,
      subject,
      html,
    };

    try {
      await sgMail.send(msg);
      console.info(
        `Email sent successfully to ${msg.to} with subject "${msg.subject}"`,
      );
      response.status(200).send({ success: true, message: "Email sent!" });
    } catch (error) {
      console.error("Error sending email via SendGrid:", error);
      response.status(500).send({ error: "Failed to send email." });
    }
  },
);

/**
 * Send a email to another user, if caller is a admin, or send to self if no
 * "to" address is provided.
 */
export const sendUserEmail = functions
  .region("southamerica-east1")
  .https.onCall(async (request, context) => {
    // 1. Check for Server Configuration Errors
    if (!SENDGRID_API_KEY || !SENDGRID_EMAIL_TO || !SENDGRID_EMAIL_FROM) {
      console.error("SendGrid environment variables are not fully configured.");
      throw new HttpsError(
        "failed-precondition",
        "Server configuration error: missing enviroment variables.",
      );
    }

    // 2. Security Check: Ensure the caller is an administrator.
    const contextAuth = await authorizeRequest(context);
    const { to, subject, html } = request.data as EmailData;
    const callerUid = contextAuth.uid;
    const callerEmail = contextAuth.token.email || "";
    let toAddresses: string[];

    // 3. CORE LOGIC: Determine the recipients
    if (
      !to ||
      (Array.isArray(to) && to.length === 1 && to[0] === callerEmail) || // Not self email
      (typeof to === "string" && to === callerEmail) // Not self email
    ) {
      // --- SELF-SEND PATH: No 'to' address was provided or it is self email ---
      if (!callerEmail) {
        throw new HttpsError(
          "failed-precondition",
          "Your account does not have an email address.",
        );
      }
      console.info(`User ${callerUid} sending email to self.`);
      toAddresses = [callerEmail];
    } else {
      // --- ADMIN PATH: A 'to' address was provided and it is not self ---
      // Check if the user has the 'admin' role in their custom claims
      await authorizeRequest(context, { role: "admin" });
      console.info(
        `Admin user ${callerUid} sending email to multiple recipients.`,
      );
      toAddresses = typeof to === "string" ? [to] : to;
    }

    // 4. Validate final data
    if (!subject || !html) {
      throw new HttpsError(
        "invalid-argument",
        "Missing subject or html content.",
      );
    }
    if (toAddresses.length === 0) {
      throw new HttpsError("invalid-argument", "No recipients specified.");
    }

    // 5. Send the email
    try {
      await sgMail.send({
        to: toAddresses, // SendGrid handles the array automatically
        from: SENDGRID_EMAIL_FROM,
        subject,
        html,
      });
      return {
        success: true,
        message: `Email sent to ${toAddresses.join(", ")}.`,
      };
    } catch (error) {
      console.error("Error sending email via SendGrid:", error);
      throw new HttpsError("internal", "Failed to send email.");
    }
  });
