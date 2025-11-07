// src/hooks/useAuth.ts

import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store/store"; // Adjust path
import { refreshAuthData } from "../redux/reducers/authSlice"; // Adjust path

/**
 * @hook useAuth
 * A custom hook to consume the shared authentication state
 * from the Redux store.
 */
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  // 1. Select the auth state from the Redux store
  const { user, role, isLoading } = useSelector(
    (state: RootState) => state.auth,
  );

  // 2. Create a memoized function to dispatch the refresh thunk
  const refreshUserData = useCallback(async () => {
    // dispatch returns the thunk's promise
    await dispatch(refreshAuthData());
  }, [dispatch]);

  // 3. Return the state and the refresh function
  return { user, role, isLoading, refreshUserData };
};
