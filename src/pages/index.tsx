import type { NextPage } from "next";
import withAuth from "../hoc/withAuth";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectorLoading,
  selectorPage,
  selectorPostList,
} from "../redux/post/selectors";
import { setPostList, fetchPostListSaga } from "../redux/post/slice";
import { getPostListThunk } from "../redux/post/thunks";
import PostService from "../services/postService";

const Home: NextPage = () => {
  const postList = useAppSelector(selectorPostList);
  const page = useAppSelector(selectorPage);
  const loading = useAppSelector(selectorLoading);

  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(getPostListThunk({ page }));
        }}
      >
        Load more with redux thunk
      </button>

      <button
        onClick={() => {
          dispatch(fetchPostListSaga({ page }));
        }}
      >
        load more with saga
      </button>

      {!loading ? (
        postList.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        ))
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  );
};

export const getServerSideProps = withAuth({
  callback: async (store) => {
    const posts = await PostService.getPostList();

    store.dispatch(setPostList(posts));
  },
  options: {
    noAuth: true,
  },
});

export default Home;
