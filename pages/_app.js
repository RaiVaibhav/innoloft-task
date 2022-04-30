import "../styles/globals.css";
import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp);
