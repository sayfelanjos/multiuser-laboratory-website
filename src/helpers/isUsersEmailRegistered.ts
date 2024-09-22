import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore as db } from "../firebase";
import User from "../interfaces/user";

export const isUsersEmailRegistered = async (userEmail: string): Promise<boolean> => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", userEmail));
  const u: User[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    u.push(doc.data() as User);
  });
  return u.length > 0;
};
