import { combineReducers } from "@reduxjs/toolkit";
import postSlice from "./post/slice";

export const rootReducer = combineReducers({
  [postSlice.name]: postSlice.reducer,
});

export type RootReducer = typeof rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
