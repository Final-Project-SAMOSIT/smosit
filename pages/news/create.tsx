import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { NewsFormPage } from "../../features/news/pages/news_form.page";

const NewsFormRoute: NextPage = () => {
  return <NewsFormPage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "news"])),
    },
  };
}

export default NewsFormRoute;
