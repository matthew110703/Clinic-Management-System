import { createSlice } from "@reduxjs/toolkit";

export const alertSlice = createSlice({
  initialState: {
    show: false,
    type: "",
    message: "",
  },
  name: "alert",
  reducers: {
    showAlert: (state, action) => {
      state.show = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    clearAlert: (state) => {
      state.show = false;
      state.type = "";
      state.message = "";
    },
  },
});

export const { showAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
