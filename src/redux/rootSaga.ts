import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, takeEvery } from "redux-saga/effects";
import { PostSaga } from "./post/saga";

function* log(action: PayloadAction) {
  console.log("log", action.type);
}

export default function* rootSaga() {
  yield takeEvery("*", log);

  yield all([call(PostSaga)]);
}
