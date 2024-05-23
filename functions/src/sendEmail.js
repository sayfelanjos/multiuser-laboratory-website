import { onRequest } from "firebase-functions/v2/https";
import sgMail from "@sendgrid/mail";

export const sendEmail = onRequest(
  { cors: true, region: "southamerica-east1" },
  async (request, response) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const body = await request.body;
    console.log(body);
    const msg = {
      to: process.env.SENDGRID_EMAIL_TO,
      from: process.env.SENDGRID_EMAIL_FROM,
      subject,
      html,
      attachments: [
        {
          content: Buffer.from(file.arrayBuffers()).toString("base64"),
          filename: file.name,
          type: file.type,
          disposition: "Attachment",
        },
      ],
    };
    response.setHeader("Access-Control-Allow-Origin", "*");
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
