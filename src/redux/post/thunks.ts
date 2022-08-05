import { createAsyncThunk } from "@reduxjs/toolkit";
import PostService from "../../services/postService";
import { PostList } from "./interface";

interface Error {
  [key: string]: any;
}

export const getPostListThunk = createAsyncThunk<
  { posts: PostList; page: number },
  { page: number }
>("getPostListThunk", async (payload, { rejectWithValue }) => {
  const nextPage = payload.page + 1;
  const posts = await PostService.getPostList(nextPage);
  return { posts, page: nextPage };
});
