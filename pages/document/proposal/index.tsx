import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { DocumentProposalFormPage } from "../../../features/document/pages/document_proposal_form.page";

const FormRoute: NextPage = () => {
  return <DocumentProposalFormPage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "document"])),
    },
  };
}

export default FormRoute;
