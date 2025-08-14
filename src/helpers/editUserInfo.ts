import { getAuth, updateProfile } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

export const editUserInformation = async (firstName: string, lastName: string, phone: string) => {
  const auth = getAuth();
  const db = getFirestore();

  if (!auth.currentUser) {
    throw new Error("No authenticated user found.");
  }

  const uid = auth.currentUser.uid;

  // Atualiza o nome completo no perfil do Firebase Auth
  await updateProfile(auth.currentUser, {
    displayName: `${firstName} ${lastName}`,
  });

  // Atualiza os demais dados no Firestore
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    firstName,
    lastName,
    phone,
  });
};
