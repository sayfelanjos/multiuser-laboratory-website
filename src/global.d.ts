/// <reference types="react-scripts" /> // Keep this if you have it

// Declaration for SCSS files
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

// Declaration for window object (if you have it)
import { RecaptchaVerifier } from "firebase/auth";
declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}
