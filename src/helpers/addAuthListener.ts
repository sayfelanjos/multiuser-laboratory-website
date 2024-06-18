import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

type CallbackFunction = (user: User | null) => void;

export const addAuthListener = (callback: CallbackFunction) => {
  const onChange = (user: User | null): void => {
    callback(user);
  };
  return onAuthStateChanged(auth, onChange);
};
