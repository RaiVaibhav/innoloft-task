import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import productReducer from "./reducers/productReducer";

const store = () =>
  configureStore({
    reducer: productReducer,
    devTools: true,
  });
export const wrapper = createWrapper(store, { debug: true });

export default store;
