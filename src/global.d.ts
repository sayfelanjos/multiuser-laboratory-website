import { RecaptchaVerifier } from "firebase/auth";

// Extend the global Window interface
declare global {
  interface Window {
    // Declare recaptchaVerifier as a property that can hold a RecaptchaVerifier object
    // It is optional (using '?') because it might not be set initially
    // or it could be null/undefined at certain times.
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

// Note: You might also need to declare it for the standard 'var' scope if you're
// relying on it being globally defined without explicitly attaching it to 'window'.
// However, explicitly declaring it on 'window' is usually sufficient and clearer.
