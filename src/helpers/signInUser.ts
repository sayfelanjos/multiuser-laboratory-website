import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signInUser = async (email: string, password: string) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw new Error("Error while signing in");
  }
};
