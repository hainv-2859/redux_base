export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type PostList = Post[];

export interface State {
  loading: boolean;
  posts: PostList;
  page: number;
}
