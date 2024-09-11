import {
  signInWithEmailAndPassword,
  getIdToken,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "../firebase";

export const signInUser = async (email: string, password: string) => {
  await setPersistence(auth, browserSessionPersistence);
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const idToken = await getIdToken(userCredential.user);
};
