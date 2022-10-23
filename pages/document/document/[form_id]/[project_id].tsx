import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { DocumentDocumentFormPage } from "../../../../features/document/pages/document_document.form.page";

const FormRoute: NextPage = () => {
  return <DocumentDocumentFormPage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "document"])),
    },
  };
}

export default FormRoute;
