import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Button } from "../core/components/input/button.component";
import { AdminNavbar } from "../core/components/layout/admin_navbar";
import { Navbar } from "../core/components/layout/navbar";
import { AuthContext } from "../core/context/auth.context";

const Error404Page: NextPage = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center h-screen">
      {authContext.isPermission(["Publisher"]) ? (
        <AdminNavbar noTranslation />
      ) : (
        <Navbar noTranslation />
      )}
      <div className="flex flex-col items-center justify-around w-full h-[calc(100%-90px)]">
        <img
          src="/images/404.png"
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

export default Error404Page;
