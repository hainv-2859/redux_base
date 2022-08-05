import { PostList } from "../redux/post/interface";
import axiosClient from "./axiosClient";

const PostService = {
  getPostList: (page: number = 1): Promise<PostList> =>
    axiosClient.request({
      method: "get",
      url: "/posts",
      params: {
        _limit: 5 * page,
      },
    }),
};

export default PostService;
