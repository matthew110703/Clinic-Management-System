import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

// UI Reducers
import loadingReducer from "./loadingSlice";
import alertReducer from "./alertSlice";
import authReducer from "./authSlice";
import formReducer from "./formSlice";
import tabReducer from "./tabSlice";
import dialogReducer from "./dialogSlice";
import backDropCardReducer from "./backdropCardSlice";

// Reducers
import userReducer from "./userSlice";
import tokenReducer from "./tokenSlice";
import statsReducer from "./stats";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    loading: loadingReducer,
    alert: alertReducer,
    auth: authReducer,
    form: formReducer,
    tab: tabReducer,
    dialog: dialogReducer,
    backdrop: backDropCardReducer,
    user: userReducer,
    token: tokenReducer,
    stats: statsReducer,
  },
});

export default store;
