import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import { User } from "firebase/auth"; // Import User type
import { firestore as db, functions } from "../firebase";
import UserDocType from "../interfaces/userDoc";

type LoadingStatus = "loading" | "migrating" | "error" | "success";

export const useUserDocument = (
  user: User | null,
  refreshUserData: () => void,
) => {
  const [userData, setUserData] = useState<UserDocType | null>(null);
  const [loadingDocStatus, setLoadingDocStatus] =
    useState<LoadingStatus>("loading");

  useEffect(() => {
    // Don't run if the user isn't loaded yet
    if (!user) {
      setLoadingDocStatus("loading"); // Or maybe an 'idle' state?
      return;
    }

    setLoadingDocStatus("loading");
    const userDocRef = doc(db, "users", user.uid);
    const migrateSelf = httpsCallable(functions, "migrateSelf");

    getDoc(userDocRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as UserDocType;
          setUserData(data);
          setLoadingDocStatus("success");
        } else {
          // Document doesn't exist, try migrating
          console.info(
            `Couldn't find the user document for user: ${user.email}. Trying self migration...`,
          );
          setLoadingDocStatus("migrating");
          migrateSelf()
            .then(() => {
              // Wait a tiny bit for backend processes, then refresh
              // Using a promise ensures refresh happens after timeout
              new Promise<void>((resolve) => {
                setTimeout(() => {
                  refreshUserData(); // Refresh auth state which should trigger this hook again
                  resolve();
                }, 1000); // Increased delay slightly
              });
              // Keep status as migrating until the hook re-runs with new data
            })
            .catch((error) => {
              setLoadingDocStatus("error");
              console.error("Error: Could not create self document.", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error when accessing user document:", error);
        setLoadingDocStatus("error");
      });
  }, [user, refreshUserData]); // Rerun when user object changes (e.g., after migration)

  return { userData, loadingDocStatus };
};
