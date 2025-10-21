import { onAuthStateChanged, User, getIdTokenResult } from "firebase/auth";
import { useEffect, useState, useCallback } from "react";
import { auth } from "../firebase";
import { type UserRoleTypes } from "../types/userInfo";

/**
 * @interface AuthState
 * Defines the shape of the data returned by our useAuth hook.
 */
interface AuthState {
  isLoading: boolean;
  user: User | null;
  role: UserRoleTypes | null;
  refreshUserData: () => Promise<void>;
}

/**
 * @hook useAuth
 * A custom hook to manage and provide authentication state throughout the app.
 * It listens for changes in the user's login status and provides their data,
 * their custom role, and a function to manually refresh their auth token.
 */
export const useAuth = (): AuthState => {
  // We store all auth-related information in a single state object.
  // This is generally cleaner than having multiple separate useState calls.
  const [authInfo, setAuthInfo] = useState<Omit<AuthState, "refreshUserData">>({
    // Start in a loading state until Firebase has checked the user's status.
    isLoading: true,
    user: null,
    role: null,
  });

  /**
   * Fetches the user's ID token from Firebase, extracts the
   * custom 'role' claim, and updates the component's state.
   *
   * @param user The Firebase user object.
   * @param forceRefresh If true, bypasses the cache and gets a fresh token from the server.
   * This is crucial for seeing changes to custom claims immediately.
   */
  const updateUserStateFromToken = useCallback(
    async (user: User | null, forceRefresh = false) => {
      if (!user) {
        // If there's no user, clear the state and finish loading.
        setAuthInfo({ user: null, role: null, isLoading: false });
        return;
      }

      //
      try {
        // Get the full ID token result. The `forceRefresh` parameter is the magic key.
        const idTokenResult = await getIdTokenResult(user, forceRefresh);

        // Extract the 'role' from the custom claims.
        const userRole = (idTokenResult.claims.role as UserRoleTypes) || null;

        // Update our state with the user object and their role.
        setAuthInfo({
          user,
          role: userRole,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error fetching user token:", error);
        // If token fetching fails, ensure we are not in a loading state.
        setAuthInfo({ user, role: null, isLoading: false });
      }
    },
    [], // This function itself never changes.
  );

  // Set up the official Firebase authentication listener:
  useEffect(() => {
    // onAuthStateChanged returns an `unsubscribe` function.
    // Firebase will call our callback whenever the user logs in or out.
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      // On the initial load, we get the user's token to check their role.
      updateUserStateFromToken(authUser);
    });

    // Cleanup: React will call this when the component unmounts to prevent memory leaks.
    return () => unsubscribe();
  }, [updateUserStateFromToken]); // Runs only once

  /**
   * A function to force a refresh of the user's authentication data (profile
   * info like displayName) AND their ID token (for custom claims).
   */
  const refreshUserData = useCallback(async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      console.log("Reloading user profile data (displayName, email)...");
      // STEP 1: Force a reload of the user's profile from Firebase Auth servers.
      await currentUser.reload();
      console.log("User profile reloaded.");

      console.log("Forcing a refresh of the user token (claims/role)...");
      // STEP 2: Now that `currentUser` is fresh, get its new token and update our state.
      // The `true` flag forces a token refresh for the claims.
      await updateUserStateFromToken(currentUser, true);
      console.log("Auth state and token successfully refreshed.");
    }
  }, [updateUserStateFromToken]); // Runs only once

  return { ...authInfo, refreshUserData };
};
