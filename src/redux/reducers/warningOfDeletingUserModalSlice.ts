import { createSlice, createAction } from "@reduxjs/toolkit";

type stateType = {
  isOpened: boolean | undefined;
  key: string;
  userName: string;
};

type actionType = { type: string; payload: stateType };

const initialState = {
  isOpened: false,
  key: "",
  userName: "",
};

export const closeWarningOfDeletingUserModal = createAction(
  "warningOfDeletingUserModal/close",
);

const warningOfDeletingUserModalSlice = createSlice({
  name: "warningOfDeletingUserModal",
  initialState,
  reducers: {
    setWarningOfDeletingUserModal: (state: stateType, action: actionType) => {
      state.isOpened = action.payload.isOpened;
      state.key = action.payload.key;
      state.userName = action.payload.userName;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(closeWarningOfDeletingUserModal, (state) => {
      state.isOpened = false;
      state.key = "";
      state.userName = "";
    });
  },
});

export const { setWarningOfDeletingUserModal } =
  warningOfDeletingUserModalSlice.actions;

export default warningOfDeletingUserModalSlice.reducer;
