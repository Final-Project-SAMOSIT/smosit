import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import _ from "lodash";
import classNames from "classnames";
import { Button } from "../input/button.component";
import { useTranslation } from "next-i18next";
import { AuthContext } from "../../context/auth.context";

export const AdminNavbar = () => {
  //---------------------
  //   i18n
  //---------------------
  const { t, i18n } = useTranslation("common");

  //---------------------
  //   COSNT
  //---------------------
  const features = [
    { name: t("navbar_feature_home_vote"), route: "/manage/vote" },
    { name: t("navbar_feature_home_petition"), route: "/manage/petition" },
    { name: t("navbar_feature_home_project"), route: "/manage/project" },
  ];

  //---------------------
  //   CONTEXT
  //---------------------
  const authContext = useContext(AuthContext);

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="w-full h-[90px]">
          <div className="max-w-[1200px] mx-auto h-full flex justify-between items-center">
            <img
              src="/images/logo.svg"
              className="h-[60px]"
              onClick={() => router.push("/")}
            />
            <div className="flex space-x-[65px]">
              {_.map(features, (feature) => (
                <div
                  className="cursor-pointer w-max flex flex-col space-y-[8px] group"
                  onClick={() => router.push(feature.route)}
                  key={`nav_${feature.name}_link_button`}
                >
                  <p className="heading5">{feature.name}</p>
                  <div
                    className={classNames([
                      "group-hover:w-[calc(100%-12px)] mx-[6px] h-[1px] bg-black duration-300 transition-all",
                      {
                        "w-[calc(100%-12px)]":
                          feature.name === t("navbar_feature_home_name")
                            ? router.asPath === "/"
                            : _.includes(router.asPath, feature.route),
                      },
                      {
                        "w-0": !_.includes(router.asPath, feature.route),
                      },
                    ])}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex space-x-[16px] items-center relative">
              <div className="flex space-x-[4px] heading6">
                <p
                  className={classNames([
                    "cursor-pointer",
                    { "font-bold": i18n.language === "en" },
                  ])}
                  onClick={() => {
                    i18n.changeLanguage("en");
                  }}
                >
                  EN
                </p>
                <p>|</p>
                <p
                  className={classNames([
                    "cursor-pointer",
                    { "font-bold": i18n.language === "th" },
                  ])}
                  onClick={() => {
                    i18n.changeLanguage("th");
                  }}
                >
                  TH
                </p>
              </div>
              <div>
                {authContext.me ? (
                  <Button
                    onClick={() => {
                      authContext.logout();
                    }}
                    title={t("navbar_logout_button")}
                    widthCss="w-[137px]"
                  ></Button>
                ) : (
                  <Button
                    onClick={() => {
                      router.push(
                        "https://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=dEV6F8Xb&redirect_uri=http://localhost:3000/redirect&state=1234"
                      );
                    }}
                    title={t("navbar_login_button")}
                    widthCss="w-[137px]"
                  ></Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};
