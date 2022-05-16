import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Fragment } from "react";
import { appWithTranslation } from "next-i18next";
import App, { AppContext } from "next/app";
import { configure } from "mobx";
import { AuthLayout } from "../core/components/layout/auth_layout";

configure({
  enforceActions: "never",
});
function MyApp({ Component, pageProps }: any) {
  return (
    <Fragment>
      <AuthLayout>
        <Component {...pageProps} />
      </AuthLayout>
    </Fragment>
  );
}
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default appWithTranslation(MyApp);
