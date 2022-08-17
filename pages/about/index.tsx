import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AboutPage } from "../../features/about/pages/about.page";

const AboutRoute: NextPage = () => {
  return <AboutPage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "about"])),
    },
  };
}

export default AboutRoute;
