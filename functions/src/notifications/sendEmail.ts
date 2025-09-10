import { onRequest } from "firebase-functions/v2/https";
import * as sgMail from "@sendgrid/mail";
import { logger } from "firebase-functions";

// Set the API key once, safely, during initialization.
// This is a best practice as it avoids setting the key on every invocation.
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else if (process.env.FUNCTIONS_EMULATOR !== "true") {
  // Log a warning during deployment/startup if the key is missing.
  logger.warn("SENDGRID_API_KEY environment variable not set.");
}

// Define an interface for the expected request body
interface EmailData {
  subject?: string;
  html?: string;
}

/**
 * An HTTP-triggered function to send a templated email via SendGrid.
 * It reads the subject and HTML content from the request body.
 */
export const sendEmail = onRequest(
  { cors: true, region: "southamerica-east1" },
  async (request, response) => {
    // 1. Check for Server Configuration Errors
    if (
      !process.env.SENDGRID_API_KEY ||
      !process.env.SENDGRID_EMAIL_TO ||
      !process.env.SENDGRID_EMAIL_FROM
    ) {
      logger.error("SendGrid environment variables are not fully configured.");
      response.status(500).send({ error: "Server configuration error." });
      return;
    }

    // 2. Validate Incoming Data
    const { subject, html } = request.body as EmailData;
    if (!subject || !html) {
      logger.warn("Request missing 'subject' or 'html' in body.", {
        body: request.body,
      });
      response.status(400).send({ error: "Missing required fields." });
      return;
    }

    // 3. Send Email
    const msg = {
      to: process.env.SENDGRID_EMAIL_TO,
      from: process.env.SENDGRID_EMAIL_FROM,
      subject,
      html,
    };

    try {
      await sgMail.send(msg);
      logger.info(
        `Email sent successfully to ${msg.to} with subject "${msg.subject}"`,
      );
      response.status(200).send({ success: true, message: "Email sent!" });
    } catch (error) {
      logger.error("Error sending email via SendGrid:", error);
      response.status(500).send({ error: "Failed to send email." });
    }
  },
);
