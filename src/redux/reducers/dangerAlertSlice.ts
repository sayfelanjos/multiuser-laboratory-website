import { createSlice } from "@reduxjs/toolkit";

const dangerAlertSlice = createSlice({
  name: "dangerAlert",
  initialState: {
    value: false,
  },
  reducers: {
    showDangerAlert: (
      state: { value: boolean },
      action: { type: string; payload: boolean },
    ) => {
      state.value = action.payload;
    },
  },
});

export const { showDangerAlert } = dangerAlertSlice.actions;
export default dangerAlertSlice.reducer;
