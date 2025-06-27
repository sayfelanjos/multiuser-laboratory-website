import { deleteUser } from "firebase/auth";
import { auth } from "../firebase";

export const deleteAccount = async () => {
  if (!auth.currentUser){
    throw new Error("No user is currently signed in")
  }

  try {
    await deleteUser(auth.currentUser);
  } catch (error) {
    throw new Error("Error while deleting user account");
  }
};
