import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { HomePage } from "../features/home/page/home.page";

const HomeRoute: NextPage = () => {
  return <p>403</p>;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}

export default HomeRoute;
