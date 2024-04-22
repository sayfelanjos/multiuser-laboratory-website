// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

require("regenerator-runtime/runtime");
// const functions = require("firebase-functions");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const buildFunctions = require("./build");
// const sgMail = require("@sendgrid/mail");

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//
// const msg = {
//   to: "saymonfelipe@hotmail.com", // Change to your recipient
//   from: "saymon.anjos@minasinfotech.com.br", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };

Object.keys(buildFunctions).forEach((functionName) => {
  exports[functionName] = buildFunctions[functionName];
});

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   sgMail
//     .send(msg)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   response.send("Hello from Firebase!");
// });
