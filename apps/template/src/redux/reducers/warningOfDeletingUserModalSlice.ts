import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isOpened: boolean | undefined;
  key: string;
  userName: string;
};

const warningOfDeletingUserModalSlice = createSlice({
  name: "warningOfDeletingUserModal",
  initialState: <InitialState>{
    isOpened: false,
    key: "",
    userName: "",
  },
  reducers: {
    setWarningOfDeletingUserModal: (
      state: {
        isOpened: boolean | undefined;
        key: string;
        userName: string;
      },
      action: { type: string; payload: InitialState },
    ) => {
      state.isOpened = action.payload.isOpened;
      state.key = action.payload.key;
      state.userName = action.payload.userName;
    },
  },
});

export const { setWarningOfDeletingUserModal } =
  warningOfDeletingUserModalSlice.actions;

export default warningOfDeletingUserModalSlice.reducer;
