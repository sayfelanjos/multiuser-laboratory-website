import { onRequest } from "firebase-functions/v2/https";
import sgMail from "@sendgrid/mail";

export const sendEmail = onRequest(
  { cors: true, region: "southamerica-east1" },
  (request, response) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log(process.env.NOD_ENV);
    const { subject, html } = request.body;
    const msg = {
      to: process.env.SENDGRID_EMAIL_TO,
      from: process.env.SENDGRID_EMAIL_FROM,
      subject,
      html,
    };
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
