import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Redirectpage } from "../features/auth/pages/redirect_page";

const HomeRoute: NextPage = () => {
  return <Redirectpage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default HomeRoute;
