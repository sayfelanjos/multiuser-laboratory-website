import { createSlice } from "@reduxjs/toolkit";

const togleSidebarSlice = createSlice({
  name: "isSidebarOpen",
  initialState: {
    value: false,
  },
  reducers: {
    setIsSidebarOpen: (state: { value: boolean }) => {
      state.value = !state.value;
    },
  },
});

export const { setIsSidebarOpen } = togleSidebarSlice.actions;
export default togleSidebarSlice.reducer;
