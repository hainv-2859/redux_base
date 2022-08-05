import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostList, State } from "./interface";
import { getPostListThunk } from "./thunks";

const initialState: State = {
  loading: false,
  posts: [],
  page: 1,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostList: (state, { payload }: PayloadAction<PostList>) => {
      state.posts = payload;
    },

    fetchPostListSaga: (state, { payload }) => {
      state.loading = true;
    },

    fetchPostListSagaSuccess: (state, { payload }: PayloadAction<PostList>) => {
      console.log(payload);
      state.posts = payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostListThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostListThunk.fulfilled, (state, { payload }) => {
        state.posts = payload.posts;
        state.page = payload.page;
        state.loading = false;
      });
  },
});

export const { setPostList, fetchPostListSaga, fetchPostListSagaSuccess } =
  postSlice.actions;

export default postSlice;
