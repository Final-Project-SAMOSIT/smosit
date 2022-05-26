import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";
import { Navbar } from "./navbar";
import { Router } from "next/router";
import { AdminNavbar } from "./admin_navbar";
import { AuthContext } from "../../context/auth.context";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
  //---------------------
  //   CONTEXT
  //---------------------
  const authContext = useContext(AuthContext);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="w-[100vw] h-screen flex flex-col">
          {authContext.isPermission(["Publisher"]) ? (
            <AdminNavbar />
          ) : (
            <Navbar />
          )}
          <div
            className="relative w-full overflow-y-auto"
            style={{ height: "calc(100%)" }}
          >
            <div className="min-h-[calc(100%-160px)] laptop:min-h-[calc(100%-320px)] max-w-[310px] tablet:max-w-[640px] laptop:max-w-[1200px] mx-auto">
              {children}
            </div>
            <div className="h-[160px] laptop:h-[320px] bg-dark-50 w-screen laptop:block flex items-center justify-center">
              <div className="max-w-[1200px] w-full laptop:w-auto mx-auto laptop:pt-[83px] laptop:pb-[31px] flex flex-col justify-center laptop:justify-start">
                <div className="flex items-center justify-between w-full laptop:w-auto laptop:p-0 px-[8px]">
                  <img
                    src="/images/logo_white.svg"
                    className="h-[48px] laptop:h-[103px]"
                  />
                  <div className="text-white">
                    <p className="topic2">Contact us</p>
                    <a
                      className="heading5"
                      href="https://www.facebook.com/samositkmutt"
                      target={"_blank"}
                    >
                      facebook.com/samositkmutt
                    </a>
                  </div>
                </div>
                <div className="h-[1px] bg-white w-full laptop:mt-[50px] laptop:mb-[28px] mt-[24px] mb-[16px]" />
                <p className="text-white body">© 2022 All Right Reserved</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};
