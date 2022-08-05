import { PayloadAction } from "@reduxjs/toolkit";
import { fork } from "child_process";
import { call, put, take } from "redux-saga/effects";
import PostService from "../../services/postService";
import { PostList } from "./interface";
import { fetchPostListSaga, fetchPostListSagaSuccess } from "./slice";

interface GetPostListPayload {
  page: number;
}

function* fetchPostListWithSaga(payload: GetPostListPayload) {
  const action: PayloadAction<PostList> = yield call(
    PostService.getPostList,
    payload.page
  );
  yield put({ type: fetchPostListSagaSuccess.type, posts: action.payload });
}

export function* PostSaga() {
  const action: PayloadAction<GetPostListPayload> = yield take(
    fetchPostListSaga.type
  );
  yield call(fetchPostListWithSaga, action.payload);
}
