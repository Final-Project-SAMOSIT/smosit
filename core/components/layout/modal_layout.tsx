import React, { Fragment, useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { ModalContext } from "../../context/modal.context";
import { Button } from "../input/button.component";
import { useTranslation } from "next-i18next";

interface ModalLayoutProps {
  children: React.ReactNode;
}

export const ModalLayout = (props: ModalLayoutProps) => {
  //---------------------
  //   i18n
  //---------------------
  const { t } = useTranslation("common");

  //---------------------
  //   CONTEXT
  //---------------------
  const modal = useContext(ModalContext);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <Fragment>
          {modal.isModalOpen && (
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex justify-center pt-[72px] z-50">
              <div className="bg-white rounded-[5px] laptop:w-[512px] w-[300px] h-max flex flex-col items-center laptop:pt-[48px] pt-[16px] pb-[24px] px-[16px] laptop:space-y-[16px] space-y-[8px]">
                <p className="text-center heading2">{modal.title}</p>
                <p className="text-center heading5">{modal.message}</p>
                <div className="flex space-x-[16px] pt-[24px]">
                  <Button
                    onClick={() => (modal.isModalOpen = false)}
                    title={t("modal_cancel_button")}
                    heightCss="laptop:h-[40px] h-[32px]"
                    widthCss="laptop:w-[112px] w-[72px]"
                  ></Button>
                  <Button
                    onClick={() => {
                      modal.onOk();
                      modal.isModalOpen = false;
                    }}
                    title={t("modal_ok_button")}
                    heightCss="laptop:h-[40px] h-[32px]"
                    widthCss="laptop:w-[112px] w-[72px]"
                  ></Button>
                </div>
              </div>
            </div>
          )}
          {props.children}
        </Fragment>
      )}
    </Observer>
  );
};
