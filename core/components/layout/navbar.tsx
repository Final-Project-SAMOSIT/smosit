import React, { useContext, useState, Fragment, useRef } from "react";
import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import _ from "lodash";
import classNames from "classnames";
import { Button } from "../input/button.component";
import { useTranslation } from "next-i18next";
import { AuthContext } from "../../context/auth.context";
import getConfig from "next/config";
import { ModalContext } from "../../context/modal.context";
import { useClickOutside } from "../../libs/click_detector";

interface NavbarProps {
  noTranslation?: boolean;
}

export const Navbar = (props: NavbarProps) => {
  //---------------------
  //   i18n
  //---------------------
  const { t, i18n } = useTranslation("common");

  //---------------------
  //   STATE
  //---------------------
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //---------------------
  //   REF
  //---------------------
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navBarRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  //---------------------
  //   HANDLED
  //---------------------
  function getFeatures() {
    return [
      {
        name: props.noTranslation ? "About" : t("navbar_feature_home_about"),
        route: "/about",
      },
      {
        name: props.noTranslation ? "Vote" : t("navbar_feature_home_vote"),
        route: "/vote",
      },
      {
        name: props.noTranslation ? "News" : t("navbar_feature_home_news"),
        route: "/news",
      },
      {
        name: props.noTranslation
          ? "Request Petition"
          : t("navbar_feature_home_petition"),
        route:
          authContext.me?.roles.role_name === "Publisher"
            ? "/manage/petition"
            : "/petition",
      },
      {
        name: props.noTranslation
          ? "Project Form"
          : t("navbar_feature_home_project"),
        route: "/document",
      },
    ];
  }

  const { publicRuntimeConfig } = getConfig();

  //---------------------
  //   CONTEXT
  //---------------------
  const authContext = useContext(AuthContext);
  const modal = useContext(ModalContext);

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
          <div
            className="laptop:max-w-[1200px] laptop:mx-auto h-full flex justify-between items-center laptop:p-0 px-[8px]"
            ref={navBarRef}
          >
            <img
              src="/images/logo.svg"
              className="laptop:h-[60px] h-[36px] mobile:mt-[8px] m-0 cursor-pointer"
              onClick={() => router.push("/")}
            />
            <div className="laptop:flex space-x-[32px] hidden">
              <div
                className="cursor-pointer w-max flex flex-col space-y-[8px] group"
                onClick={() => router.push("/")}
                key={`nav_home_link_button`}
              >
                <p className="heading5">
                  {props.noTranslation ? "Home" : t("navbar_feature_home_name")}
                </p>
                <div
                  className={classNames([
                    "group-hover:w-[calc(100%-12px)] mx-[6px] h-[1px] bg-black transition-all duration-300",
                    {
                      "w-[calc(100%-12px)]": router.asPath === "/",
                    },
                    {
                      "w-0": router.asPath !== "/",
                    },
                  ])}
                ></div>
              </div>

              {_.map(getFeatures(), (feature) => (
                <div
                  className="cursor-pointer w-max flex flex-col space-y-[8px] group"
                  onClick={() => router.push(feature.route)}
                  key={`nav_${feature.name}_link_button`}
                >
                  <p className="heading5">{feature.name}</p>
                  <div
                    className={classNames([
                      "group-hover:w-[calc(100%-12px)] mx-[6px] h-[1px] bg-black transition-all duration-300",
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
              <div className="flex space-x-[4px] body laptop:heading6">
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
                  onClick={() =>
                    setTimeout(() => {
                      setIsDropdownOpen(!isDropdownOpen);
                    }, 150)
                  }
                >
                  <i className="fas fa-bars"></i>
                </div>

                <div
                  className={classNames(
                    "fixed flex flex-col left-0 bg-white w-screen overflow-hidden divide-y z-20 divide-black duration-300 transform",
                    {
                      "h-[240px] border-black shadow-lg border-y":
                        isDropdownOpen,
                      "h-0": !isDropdownOpen,
                    }
                  )}
                  style={{ top: `${navBarRef.current?.clientHeight}px` }}
                  ref={dropdownRef}
                >
                  <div
                    className="w-[128px] bg-white"
                    onClick={() => {
                      router.push("/");
                      setIsDropdownOpen(false);
                    }}
                  >
                    <p className="body py-[6px] px-[8px]">
                      {props.noTranslation
                        ? "Home"
                        : t("navbar_feature_home_name")}
                    </p>
                  </div>
                  {_.map(getFeatures(), (feature) => (
                    <div
                      className="w-full bg-white"
                      onClick={() => {
                        router.push(feature.route);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <p className="body py-[6px] px-[8px]">{feature.name}</p>
                    </div>
                  ))}
                  {authContext.me ? (
                    <div
                      className="w-full bg-white"
                      onClick={() => {
                        modal.openModal(
                          "logout",
                          "Are you sure you want to logout?",
                          () => {
                            authContext.logout();
                            setIsDropdownOpen(false);
                          }
                        );
                      }}
                    >
                      <p className="body py-[6px] px-[8px]">
                        {props.noTranslation
                          ? "logout"
                          : t("navbar_logout_button")}
                      </p>
                    </div>
                  ) : (
                    <div
                      className="w-full bg-white"
                      onClick={() => {
                        router.push(
                          `https://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=dEV6F8Xb&redirect_uri=${publicRuntimeConfig.FRONTEND_URI}/redirect&state=1234`
                        );
                        setIsDropdownOpen(false);
                      }}
                    >
                      <p className="body py-[6px] px-[8px]">
                        {props.noTranslation
                          ? "login"
                          : t("navbar_login_button")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="hidden laptop:block">
                {authContext.me ? (
                  <div className="flex items-center divide-x-[1.5px] divide-black">
                    <div className="px-[8px] flex items-center space-x-[8px]">
                      <i className="fas fa-user text-[21px]" />
                      <p className="button">{authContext.me.user_id}</p>
                    </div>
                    <div className="px-[8px]">
                      <p
                        className="cursor-pointer button"
                        onClick={() =>
                          modal.openModal(
                            "logout",
                            "Are you sure you want to logout?",
                            () => {
                              authContext.logout();
                              setIsDropdownOpen(false);
                            }
                          )
                        }
                      >
                        {props.noTranslation
                          ? "logout"
                          : t("navbar_logout_button")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      router.push(
                        `https://std-sso-fe.sit.kmutt.ac.th/login?response_type=code&client_id=dEV6F8Xb&redirect_uri=${publicRuntimeConfig.FRONTEND_URI}/redirect&state=1234`
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
