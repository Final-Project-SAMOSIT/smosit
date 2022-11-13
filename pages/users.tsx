import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { UserPage } from "../features/users/pages/users.page";

const UserRoute: NextPage = () => {
  return <UserPage />;
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "users"])),
    },
  };
}

export default UserRoute;
