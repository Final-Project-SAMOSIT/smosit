import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ExperianceDetailPage } from "../../../features/about/pages/experiance_detail.page";

const AboutRoute: NextPage = () => {
  return <ExperianceDetailPage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "about"])),
    },
  };
}

export default AboutRoute;
