import React from "react";
import { Observer } from "mobx-react-lite";
import { TextInput } from "../../../core/components/input/text_input.component";
import { Button } from "../../../core/components/input/button.component";
import { Router, useRouter } from "next/router";

export const LoginPage = () => {
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
        <div className="max-w-[1200px] h-[100vh] mx-auto flex justify-between items-center">
          <div
            className="absolute top-[24px] left-[32px] w-[64px] flex items-center space-x-[8px] cursor-pointer"
            onClick={() => router.push("/")}
          >
            <i className="fa-solid fa-angle-left"></i>
            <p className="button">back</p>
          </div> 
          <div className="w-1/2 mobile:hidden laptop:block">
            <img src="/images/login_graphic.svg" className="w-full" />
          </div>
          <div className="w-[1px] h-[652px] bg-black mx-[48px] mobile:hidden laptop:block" />
          <div className="flex flex-col items-center justify-center mobile:w-full laptop:w-1/2 space-y-[26px] mobile:px-[32px] laptop:px-0 mobile:max-w-[500px] mx-auto">
            <img src="/images/logo.svg" className="w-[214px] mb-[30px]" />
            <TextInput title="Email" />
            <TextInput title="Password" />
            <Button
              title="login"
              onClick={() => null}
              height={70}
              width={137}
            />
          </div>
        </div>
      )}
    </Observer>
  );
};
