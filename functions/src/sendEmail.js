/* using Twilio SendGrid's v3 Node.js Library
https://github.com/sendgrid/sendgrid-nodejs
Imports the Secret Manager library*/

// import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { onRequest } from "firebase-functions/v2/https";
import sgMail from "@sendgrid/mail";

export const sendEmail = onRequest(
  { cors: ["http://localhost:3000"], region: "southamerica-east1" },
  async (request, response) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const data = request.body;
    console.log(data);
    const msg = {
      to: process.env.SENDGRID_EMAIL_TO,
      from: process.env.SENDGRID_EMAIL_FROM,
      ...data,
    };
    console.log(msg);
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    response.setHeader("Access-Control-Request-Method", "POST");
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
