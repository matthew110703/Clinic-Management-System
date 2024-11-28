import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  title: "",
  content: "",
  onAccept: null,
  acceptText: "Okay",
  cancelText: "Cancel",
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    showDialog: (state, action) => {
      state.show = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.onAccept = action.payload.onAccept;
      state.acceptText = action.payload.acceptText;
      state.cancelText = action.payload.cancelText;
    },
    closeDialog: (state) => {
      state.show = false;
      state.title = "";
      state.content = "";
      state.onAccept = null;
    },
  },
});

export const { showDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;
