console.log("--> Loading sendEmail.ts...");

import { onRequest } from "firebase-functions/v2/https";
import * as sgMail from "@sendgrid/mail";

export const sendEmail = onRequest(
  { cors: true, region: "southamerica-east1" },
  (request, response) => {
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
      response.status(500).send("SENDGRID_API_KEY is not set.");
      return;
    }
    sgMail.setApiKey(apiKey);
    console.log(process.env.NOD_ENV);
    const { subject, html } = request.body;
    const to = process.env.SENDGRID_EMAIL_TO;
    const from = process.env.SENDGRID_EMAIL_FROM;
    if (!to || !from) {
      response
        .status(500)
        .send("SENDGRID_EMAIL_TO or SENDGRID_EMAIL_FROM is not set.");
      return;
    }
    const msg = { to, from, subject, html };
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Request-Method", "POST");
    console.log(msg);
    sgMail
      .send(msg)
      .then(() => {
        response.status(200).send("Email sent!");
      })
      .catch((error) => {
        response.status(400).send(error);
      });
  },
);
