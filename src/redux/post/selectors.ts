import { createSelector } from "reselect";
import { AppState } from "../store";

const selectorPostStore = (app: AppState) => app.post;

export const selectorPostList = createSelector(
  selectorPostStore,
  (state) => state.posts
);

export const selectorPage = createSelector(
  selectorPostStore,
  (state) => state.page
);

export const selectorLoading = createSelector(
  selectorPostStore,
  (state) => state.loading
);
