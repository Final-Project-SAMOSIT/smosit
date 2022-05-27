import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Button } from "../core/components/input/button.component";
import { Navbar } from "../core/components/layout/navbar";

const Error401Page: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-around w-full h-[calc(100%-90px)]">
        <img
          src="/images/401.svg"
          className="w-11/12 mx-auto laptop:w-5/12 laptop:mx-0"
        />
        <Button
          onClick={() => router.push("/en")}
          title="Back"
          widthCss="w-2/5 laptop:w-1/12"
          heightCss="laptop:h-[52px] h-[36px]"
        />
      </div>
    </div>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Error401Page;
