import { createSlice } from "@reduxjs/toolkit";

const successAlertSlice = createSlice({
  name: "successAlert",
  initialState: {
    value: false,
  },
  reducers: {
    showSuccessAlert: (
      state: { value: boolean },
      action: { type: string; payload: boolean },
    ) => {
      state.value = action.payload;
    },
  },
});

export const { showSuccessAlert } = successAlertSlice.actions;
export default successAlertSlice.reducer;
