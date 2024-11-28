import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    clinicName: "",
    fullName: "",
    email: "",
    gender: "",
    phone: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    updateUserProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export const { setUserProfile, updateUserProfile } = userSlice.actions;

export default userSlice.reducer;
