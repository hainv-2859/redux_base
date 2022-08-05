import { GetServerSidePropsContext } from "next";
import { AppStore, wrapper } from "../redux/store";

interface Options {
  noAuth?: boolean;
}

interface GsspType {
  options: Options;
  callback: (store: AppStore, ctx?: GetServerSidePropsContext) => void;
}

const withAuth = ({ callback = () => null, options = {} }: GsspType) =>
  wrapper.getServerSideProps(
    (store) => async (ctx: GetServerSidePropsContext) => {
      if (options?.noAuth) {
        await callback(store, ctx);
      }

      return { props: {} };
    }
  );

export default withAuth;
