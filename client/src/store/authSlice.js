import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    currentUser: {
      id: null,
      email: null,
      exp: null,
      iat: null,
      role: null,
    },
    token: null,
  },
  reducers: {
    authenticate: (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export default authSlice.reducer;
