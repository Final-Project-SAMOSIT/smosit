import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { NewsPage } from "../../features/news/pages/news.page";

const NewsRoute: NextPage = () => {
  return <NewsPage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "news"])),
    },
  };
}

export default NewsRoute;
