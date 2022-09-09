import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { Navbar } from "./navbar";
import { Router } from "next/router";
import { AdminNavbar } from "./admin_navbar";
import { AuthContext } from "../../context/auth.context";
import { useTranslation } from "next-i18next";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  //---------------------
  //   i18n
  //---------------------
  const { i18n, t } = useTranslation("common");

  //---------------------
  //   CONTEXT
  //---------------------
  const authContext = useContext(AuthContext);

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) {
      i18n.changeLanguage(lang);
    } else {
      localStorage.setItem("language", i18n.language);
    }
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="w-[100vw] h-screen flex flex-col">
          <Navbar />
          <div
            className="relative w-full overflow-y-auto"
            style={{ height: "calc(100%)" }}
            id="main_layout"
          >
            <div className="min-h-[calc(100%-160px)] laptop:min-h-[calc(100%-200px)] max-w-[310px] tablet:max-w-[640px] laptop:max-w-[1200px] mx-auto">
              {children}
            </div>
            <div className="h-[160px] laptop:h-[200px] bg-dark-50 w-screen laptop:block flex items-center justify-center">
              <div className="max-w-[1200px] w-full laptop:w-auto mx-auto laptop:pt-[36px] laptop:pb-[24px] flex flex-col justify-center laptop:justify-start">
                <div className="flex items-center justify-between w-full laptop:w-auto laptop:p-0 px-[8px]">
                  <img
                    src="/images/logo_white.svg"
                    className="h-[48px] laptop:h-[72px]"
                  />
                  <div className="text-white">
                    <p className="topic2">{t("footer_contact_us_label")}</p>
                    <a
                      className="heading5 underline"
                      href="https://www.facebook.com/samositkmutt"
                      target={"_blank"}
                    >
                      facebook.com/samositkmutt
                    </a>
                  </div>
                </div>
                <div className="h-[1px] bg-white w-full laptop:mt-[24px] laptop:mb-[16px] mt-[24px] mb-[16px]" />
                <p className="text-white body">© 2022 All Right Reserved</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};
