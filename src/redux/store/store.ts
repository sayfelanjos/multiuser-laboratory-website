import { configureStore } from "@reduxjs/toolkit";
import successAlertSlice from "../reducers/successAlertSlice";
import dangerAlertSlice from "../reducers/dangerAlertSlice";
import warningOfDeletingUserModalSlice from "../reducers/warningOfDeletingUserModalSlice";
import toggleSidebarSlice from "../reducers/toggleSidebarSlice";
import authReducer from "../reducers/authSlice";

const store = configureStore({
  reducer: {
    isSidebarOpen: toggleSidebarSlice,
    successAlert: successAlertSlice,
    dangerAlert: dangerAlertSlice,
    warningOfDeletingUserModal: warningOfDeletingUserModalSlice,
    auth: authReducer,
  },
  // 3. CONFIGURE MIDDLEWARE to allow non-serializable Firebase User object
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
