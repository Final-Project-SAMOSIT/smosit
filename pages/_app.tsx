import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Fragment } from "react";

function MyApp({ Component, pageProps }: any) {
  return (
    <Fragment>
      <Component {...pageProps} />
      <i className="far fa-address-book"></i>
    </Fragment>
  );
}

export default MyApp;
