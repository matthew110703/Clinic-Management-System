import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  title: "",
  type: "",
  data: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    showForm: (state, action) => {
      state.open = true;
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.data = action.payload.data || "";
    },
    closeForm: (state) => {
      state.open = false;
      state.title = "";
      state.type = "";
      state.data = "";
    },
  },
});

export const { showForm, closeForm } = formSlice.actions;

export default formSlice.reducer;
