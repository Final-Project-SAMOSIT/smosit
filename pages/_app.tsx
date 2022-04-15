import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Fragment } from "react";

function MyApp({ Component, pageProps }: any) {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
