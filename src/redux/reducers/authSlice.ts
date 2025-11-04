// src/redux/reducers/authSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, getIdTokenResult } from "firebase/auth";
import { auth } from "../../firebase"; // Adjust path as needed
import { UserRoleTypes } from "../../types/userInfo"; // Adjust path as needed

// 1. Define the shape of the auth state
export interface AuthState {
  user: User | null;
  role: UserRoleTypes | null;
  isLoading: boolean;
  isRefreshing: boolean;
}

// 2. Define the initial state
const initialState: AuthState = {
  user: null,
  role: null,
  isLoading: true, // Start as true until onAuthStateChanged runs
  isRefreshing: false,
};

// 3. Define the payload for setting the user
interface AuthDataPayload {
  user: User;
  role: UserRoleTypes | null;
}

// 4. Create the Async Thunk for REFRESHING data
// This is your new global refreshUserData function
export const refreshAuthData = createAsyncThunk(
  "auth/refreshAuthData",
  async (_, { rejectWithValue }) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        // Step 1: Force reload of profile (displayName, photoURL)
        await currentUser.reload();

        // Step 2: Force refresh of token to get new claims (role)
        const idTokenResult = await getIdTokenResult(currentUser, true);
        const role = (idTokenResult.claims.role as UserRoleTypes) || null;

        // Return the payload. NOTE: User object is non-serializable
        return { user: currentUser, role };
      } catch (error: unknown) {
        console.error("Error refreshing auth data:", error);
        return rejectWithValue(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
      }
    }
    return rejectWithValue("No user to refresh.");
  },
);

// 5. Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  // Reducers for simple, synchronous state updates
  reducers: {
    // Action to set user data (called by onAuthStateChanged)
    setAuthData: (state, action: PayloadAction<AuthDataPayload>) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isLoading = false;
    },
    // Action to clear user data (called on logout)
    clearAuthData: (state) => {
      state.user = null;
      state.role = null;
      state.isLoading = false;
    },
    // Action to set loading (called by onAuthStateChanged listener)
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  // Reducers for async thunks
  extraReducers: (builder) => {
    builder
      .addCase(refreshAuthData.pending, (state) => {
        state.isRefreshing = true;
        console.log("Refreshing auth data...");
      })
      .addCase(refreshAuthData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.isLoading = false;
        state.isRefreshing = false;
        console.log("Auth data refreshed in Redux!");
      })
      .addCase(refreshAuthData.rejected, (state, action) => {
        state.isLoading = false;
        state.isRefreshing = false;
        console.error("Auth refresh rejected:", action.payload);
      });
  },
});

export const { setAuthData, clearAuthData, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
