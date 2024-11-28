import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  data: null,
};

const backdropCardSlice = createSlice({
  name: "backdropCard",
  initialState,
  reducers: {
    showCard: (state, action) => {
      state.show = true;
      state.data = { ...action.payload };
    },
    hideCard: (state) => {
      state.show = false;
      state.data = null;
    },
  },
});

export const { showCard, hideCard } = backdropCardSlice.actions;

export default backdropCardSlice.reducer;
