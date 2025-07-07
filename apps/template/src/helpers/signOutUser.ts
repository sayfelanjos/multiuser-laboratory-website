import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error("Error while signing out");
  }
};
