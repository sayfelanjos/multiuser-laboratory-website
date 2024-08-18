import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const signUpUserByEmailAndPassword = (
  email: string,
  password: string,
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(
        "Error code: ",
        errorCode,
        "\nError message: ",
        errorMessage,
      );
      // ..
    });
};
