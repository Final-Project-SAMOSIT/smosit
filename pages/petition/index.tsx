import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { PetitionPage } from "../../features/petition/page/petition.page";

const PetitionRoute: NextPage = () => {
  return <PetitionPage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "petition"])),
    },
  };
}

export default PetitionRoute;
