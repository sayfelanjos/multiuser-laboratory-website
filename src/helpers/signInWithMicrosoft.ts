import { OAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export const signInWithMicrosoft = async () => {
  const provider = new OAuthProvider("microsoft.com");
  const result = await signInWithPopup(auth, provider);
  try {
    // User is signed in.
    // IdP data available in result.additionalUserInfo.profile.

    // Get the OAuth access token and ID Token
    const credential = OAuthProvider.credentialFromResult(result);
    if (credential) {
      // const accessToken = credential.accessToken;
      // const idToken = credential.idToken;
      console.log(result.user.providerData);
    }
  } catch (error) {
    // Handle error.
  }
};
