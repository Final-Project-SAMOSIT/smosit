import React from "react";
import { Observer } from "mobx-react-lite";
import { Navbar } from "./navbar";
import { Router } from "next/router";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;
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
          >
            <div className="min-h-[calc(100%-320px)] max-w-[1200px] mx-auto">
              {children}
            </div>
            <div className="h-[320px] bg-dark-50 w-screen">
              <div className="max-w-[1200px] mx-auto pt-[83px] pb-[31px] flex flex-col">
                <div className="flex items-center justify-between">
                  <img src="/images/logo_white.svg" className="h-[103px]" />
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
                <div className="h-[1px] bg-white w-full mt-[50px] mb-[28px]" />
                <p className="text-white text-body">
                  © 2022 All Right Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};
