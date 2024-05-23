import { onRequest } from "firebase-functions/v2/https";
import sgMail from "@sendgrid/mail";

export const sendEmail = onRequest(
  { cors: true, region: "southamerica-east1" },
  (request, response) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const data = request.body;
    console.log(data);
    const msg = {
      to: process.env.SENDGRID_EMAIL_TO,
      from: process.env.SENDGRID_EMAIL_FROM,
      ...data,
    };
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Request-Method", "POST");
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
