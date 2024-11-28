import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    name: "John Doe",
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    changeName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, changeName } =
  counterSlice.actions;

export default counterSlice.reducer;
