import { configureStore } from "@reduxjs/toolkit";
import { o2API } from "./api";
import authSlice from "./features/auth/authSlice";
import tokenSlice from "./features/auth/tokenSlice";
import counterReducer from "./features/counter";
import provinceSlice from "./features/selectProvince";
import emailSlice from "./features/email";
import optSlice from "./features/opt";
import orderSlice from "./features/order";

// create store
export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      province: provinceSlice,
      email: emailSlice,
      otp: optSlice,
      order: orderSlice,
      [o2API.reducerPath]: o2API.reducer,
      auth: authSlice,
      token: tokenSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(o2API.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
