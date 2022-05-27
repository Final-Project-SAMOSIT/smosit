import React, { Fragment, useContext, useEffect, useState } from "react";
import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import _ from "lodash";
import classNames from "classnames";
import { Button } from "../input/button.component";
import { useTranslation } from "next-i18next";
import { AuthContext } from "../../context/auth.context";
import getConfig from "next/config";
import { ModalContext } from "../../context/modal.context";

interface AdminNavbarProps {
  noTranslation?: boolean;
}

export const AdminNavbar = (props: AdminNavbarProps) => {
  //---------------------
  //   i18n
  //---------------------
  const { t, i18n } = useTranslation("common");

  //---------------------
  //   CONTEXT
  //---------------------
  const modal = useContext(ModalContext);

  //---------------------
  //   STATE
  //---------------------
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //---------------------
  //   COSNT
  //---------------------
  const features = [
    {
      name: props.noTranslation
        ? "Request Petition"
        : t("navbar_feature_home_vote"),
      route: "/manage/vote",
    },
    {
      name: props.noTranslation
        ? "Project Form"
        : t("navbar_feature_home_petition"),
      route: "/manage/petition",
    },
    {
      name: props.noTranslation ? "login" : t("navbar_feature_home_project"),
      route: "/manage/project",
    },
  ];

  const { publicRuntimeConfig } = getConfig();

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
          <div className="laptop:max-w-[1200px] laptop:mx-auto h-full flex justify-between items-center laptop:p-0 px-[8px]">
            <img
              src="/images/logo.svg"
              className="laptop:h-[60px] h-[48px] mobile:mt-[8px] m-0"
              onClick={() => router.push("/")}
            />
            <div className="laptop:flex hidden space-x-[65px]">
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
                          feature.name ===
                          (props.noTranslation
                            ? "Home"
                            : t("navbar_feature_home_name"))
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
                    localStorage.setItem("language", "en");
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
                    localStorage.setItem("language", "th");
                  }}
                >
                  TH
                </p>
              </div>

              <div className="relative block laptop:hidden">
                <div
                  className=" border-black border rounded-[5px] w-[36px] h-[36px] flex items-center justify-center cursor-pointer"
                  onClick={() => setIsDropdownOpen(true)}
                >
                  <i className="fas fa-bars"></i>
                </div>

                {isDropdownOpen && (
                  <Fragment>
                    <div
                      className="fixed top-0 left-0 z-10 w-screen h-screen"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute flex flex-col right-[4px] top-[40px] border border-black rounded-[10px] overflow-hidden divide-y divide-black z-20">
                      {_.map(features, (feature) => (
                        <div
                          className="w-[128px] bg-white"
                          onClick={() => {
                            router.push(feature.route);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <p className="body py-[4px] px-[8px]">
                            {feature.name}
                          </p>
                        </div>
                      ))}
                      {authContext.me ? (
                        <div
                          className="w-[128px] bg-white"
                          onClick={() => {
                            modal.openModal(
                              t("modal_logout_title"),
                              t("modal_logout_message"),
                              () => {
                                authContext.logout();
                                setIsDropdownOpen(false);
                              }
                            );
                          }}
                        >
                          <p className="body py-[4px] px-[8px]">
                            {props.noTranslation
                              ? "logout"
                              : t("navbar_logout_button")}
                          </p>
                        </div>
                      ) : (
                        <div
                          className="w-[128px] bg-white"
                          onClick={() => {
                            router.push(
                              `https://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=dEV6F8Xb&redirect_uri=${publicRuntimeConfig.FRONTEND_URI}/redirect&state=1234`
                            );
                            setIsDropdownOpen(false);
                          }}
                        >
                          <p className="body py-[4px] px-[8px]">
                            {props.noTranslation
                              ? "login"
                              : t("navbar_login_button")}
                          </p>
                        </div>
                      )}
                    </div>
                  </Fragment>
                )}
              </div>

              <div className="hidden laptop:block">
                {authContext.me ? (
                  <Button
                    onClick={() => {
                      modal.openModal(
                        t("modal_logout_title"),
                        t("modal_logout_message"),
                        () => {
                          authContext.logout();
                        }
                      );
                    }}
                    title={
                      props.noTranslation ? "logout" : t("navbar_logout_button")
                    }
                    widthCss="w-[137px]"
                  ></Button>
                ) : (
                  <Button
                    onClick={() => {
                      router.push(
                        "https://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=dEV6F8Xb&redirect_uri=http://localhost:3000/redirect&state=1234"
                      );
                    }}
                    title={
                      props.noTranslation ? "login" : t("navbar_login_button")
                    }
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
