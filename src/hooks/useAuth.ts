import { useEffect, useState } from "react";
import { addAuthListener } from "../helpers/addAuthListener";
import { User } from "firebase/auth";
import { getCurrentUser } from "../helpers/getCurrentUser";

interface AuthState {
  isLoading: boolean;
  user: User | null;
}
export const useAuth = () => {
  const [authInfo, setAuthInfo] = useState<AuthState>((): AuthState => {
    const user: User | null = getCurrentUser();
    const isLoading = !user;
    return <AuthState>{ isLoading, user };
  });

  useEffect(() => {
    return addAuthListener((user) => {
      setAuthInfo({ isLoading: false, user } as AuthState);
    });
  }, []);

  return authInfo;
};
