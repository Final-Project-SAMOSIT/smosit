import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { DocumentPage } from "../../features/document/pages/document.page";

const FormRoute: NextPage = () => {
  return <DocumentPage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "document"])),
    },
  };
}

export default FormRoute;
