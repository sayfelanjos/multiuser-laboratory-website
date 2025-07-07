import { addDoc, collection } from "firebase/firestore";
import { firestore as db } from "../firebase";

interface UsersData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  createdAt: string;
  lastUpdated: string;
}
export const addUser = async (usersData: UsersData) => {
  await addDoc(collection(db, "users"), usersData);
};
