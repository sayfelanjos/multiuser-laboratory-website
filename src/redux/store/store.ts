import { configureStore } from "@reduxjs/toolkit";
import successAlertSlice from "../reducers/successAlertSlice";
import dangerAlertSlice from "../reducers/dangerAlertSlice";
import warningOfDeletingUserModalSlice from "../reducers/warningOfDeletingUserModalSlice";

const store = configureStore({
  reducer: {
    successAlert: successAlertSlice,
    dangerAlert: dangerAlertSlice,
    warningOfDeletingUserModal: warningOfDeletingUserModalSlice,
  },
});

export default store;
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
