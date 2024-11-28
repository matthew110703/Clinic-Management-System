import { createSlice } from "@reduxjs/toolkit";

const initialSlice = {
  waiting: 0,
  consulting: 0,
  served: 0,
  newPatients: 0,
  totalPatients: 0,
};

const statsSlice = createSlice({
  name: "stats",
  initialState: initialSlice,
  reducers: {
    updateStats(state, action) {
      const { waiting, consulting, served, newPatients, totalPatients } =
        action.payload;
      state.waiting = waiting || state.waiting;
      state.consulting = consulting || state.consulting;
      state.served = served || state.served;
      state.newPatients = newPatients || state.newPatients;
      state.totalPatients = totalPatients || state.totalPatients;
    },
  },
});

export const { updateStats } = statsSlice.actions;

export default statsSlice.reducer;
