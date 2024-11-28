import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  consultingToken: null,
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.consultingToken = action.payload;
    },
    removeToken: (state) => {
      state.consultingToken = null;
    },
  },
});

export const { setToken, removeToken } = tokenSlice.actions;

export default tokenSlice.reducer;
