import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import reducer from "./rootReducer";

const middleware = [thunk];

const makeStore = () =>
  configureStore({ reducer }, compose(applyMiddleware(...middleware)));

export const wrapper = createWrapper(makeStore);
