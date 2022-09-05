import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Fragment } from "react";
import { appWithTranslation } from "next-i18next";
import App, { AppContext } from "next/app";
import { configure } from "mobx";
import { AuthLayout } from "../core/components/layout/auth_layout";
import { ModalLayout } from "../core/components/layout/modal_layout";
import "../styles/editor.css";

configure({
  enforceActions: "never",
});
function MyApp({ Component, pageProps }: any) {
  return (
    <Fragment>
      <ModalLayout>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </ModalLayout>
    </Fragment>
  );
}
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default appWithTranslation(MyApp);
