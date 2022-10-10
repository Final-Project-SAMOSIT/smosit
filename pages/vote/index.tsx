import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { VotePage } from "../../features/vote/pages/vote.page";

const HomeRoute: NextPage = () => {
  return <VotePage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "vote", "about"])),
    },
  };
}

export default HomeRoute;
