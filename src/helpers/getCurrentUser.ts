import { User } from "firebase/auth";
import { auth } from "../firebase";

export const getCurrentUser = (): User | null => {
  const user = auth.currentUser;
  if (!user) return null;
  return user;
};
