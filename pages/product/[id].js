import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { useSelector, useStore } from "react-redux";
import { Content } from "../../components/Content";
import { Navigation } from "../../components/Navigation";
import { GET_PRODUCT, GET_TRL } from "../../redux/actions/productActions";
import { wrapper } from "../../redux/store";

export default function Product({ config, error }) {
  const router = useRouter();
  const product = useSelector((state) => state.product);
  if (error) {
    return <ErrorPage statusCode={404} />;
  }
  if (router.isFallback) {
    return (
      <div className="flex h-screen w-screen text-center justify-center items-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-16 w-16 text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }
  return (
    <div className="relative min-h-screen md:flex" data-dev-hint="container">
      <Navigation logo={config.logo} />
      <Content product={product} hasUserSection={config.hasUserSection} />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}
export const getStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      let configId = process.env.APP_ID || 1;
      let prodres = await fetch(
        `https://api-test.innoloft.com/product/${params.id}/`
      );

      if (prodres.status !== 200) {
        return { props: { error: true } };
      }
      let configdata = await fetch(
        `https://api-test.innoloft.com/configuration/${configId}/`
      );
      let trlres = await fetch(`https://api-test.innoloft.com/trl/`);
      const product = await prodres.json();
      const trl = await trlres.json();
      const config = await configdata.json();
      store.dispatch({
        type: GET_TRL,
        payload: trl,
      });
      store.dispatch({
        type: GET_PRODUCT,
        payload: product,
      });
      return { props: { config } };
    }
);
