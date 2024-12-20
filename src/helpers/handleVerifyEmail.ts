import { applyActionCode, Auth } from "firebase/auth";

export const handleVerifyEmail = (
  auth: Auth,
  actionCode: string,
  continueUrl: string,
  lang: string,
) => {
  // Localize the UI to the selected language as determined by the lang
  // parameter.
  // Try to apply the email verification code.
  applyActionCode(auth, actionCode)
    .then((resp) => {
      // Email address has been verified.
      // TODO: Display a confirmation message to the user.
      // You could also provide the user with a link back to the app.
      // TODO: If a continue URL is available, display a button which on
      // click redirects the user back to the app via continueUrl with
      // additional state determined from that URL's parameters.
    })
    .catch((error) => {
      // Code is invalid or expired. Ask the user to verify their email address
      // again.
    });
};
