import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./features/auth";
const store = configureStore({
  reducer: {},
});

export default store;
