import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { PetitionManage } from "../../../features/petition/page/petition_manage";

const PetitionRoute: NextPage = () => {
  return <PetitionManage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default PetitionRoute;
