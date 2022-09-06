import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NewsDetailPage } from "../../../features/news/pages/news_detail.page";

const NewsDetailsRoute: NextPage = () => {
  return <NewsDetailPage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "news"])),
    },
  };
}

export default NewsDetailsRoute;
