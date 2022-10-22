import React, { useContext, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { documentContext } from "../context/document.context";
import { ModalContext } from "../../../core/context/modal.context";
import { AuthContext } from "../../../core/context/auth.context";
import { MainLayout } from "../../../core/components/layout/main_layout";
import _ from "lodash";
import dayjs from "dayjs";
import Loading from "../../../core/components/utility/loading";

export const DocumentPage = () => {
  //---------------------
  //   I18n
  //---------------------
  const { t, i18n } = useTranslation("document");

  //---------------------
  //   CONST
  //---------------------
  const documentMetaData = [
    {
      name: "proposal",
      label: "แบบขออนุมัติโครงการ และงบประมาณ",
    },
    {
      name: "document",
      label: "แบบขออนุมัติขอจัดกิจกรรมนักศึกษา",
    },
  ];

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(documentContext);
  const modal = useContext(ModalContext);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    context.modal = modal;

    if (authContext.isPermission(["Publisher", "Users"])) {
      context.documentPreparation(authContext.me?.user_id || "");
    }
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="my-[64px] space-y-[48px]">
            <div className="bg-gray-10 pt-[32px] pb-[48px] flex flex-col items-stretch space-y-[48px]">
              <div className="space-y-[16px] flex flex-col items-center">
                <p className="title text-center">แบบบันทึกแผนโครงการ</p>
                <div className="h-[1px] w-[350px] bg-black" />
              </div>
              <div className="flex justify-around">
                {_.map(documentMetaData, (document) => (
                  <a href={`document/${document.name}`}>
                    <div
                      className="w-[420px] h-[582px] space-y-[32px] py-[32px] flex flex-col items-center bg-white rounded-[10px] transform hover:scale-[1.1] duration-300 cursor-pointer border border-black"
                      onClick={() => null}
                    >
                      <div className="w-[354px] h-[436px]">
                        <img
                          className="w-full h-full"
                          src={`/images/${document.name}.jpg`}
                        />
                      </div>
                      <p className="heading5 underline">{document.label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-[24px] flex flex-col items-center">
              <p className="title">My History</p>
              <div className="flex flex-col w-full items-center">
                <div className="h-[50px] py-[14px] border-b-[1.5px] border-gray-40 flex w-full">
                  <p className="heading6 w-[320px]">DATE</p>
                  <p className="heading6">TOPIC</p>
                </div>
                {_.map(context.documentList, (document) => (
                  <div className="h-[50px] py-[14px] border-b-[1.5px] border-gray-40 flex w-full">
                    <p className="text-body w-[320px]">
                      {dayjs(document.created_date)
                        .locale(i18n.language)
                        .add(i18n.language === "th" ? 543 : 0, "year")
                        .format("D/M/YYYY")}
                    </p>
                    <div className="flex justify-between flex-grow">
                      <p className="text-body">{document.solution || ""}</p>
                      <a
                        href={`document/${document.form_type}/${document.form_info_id}`}
                      >
                        <p className="underline text-body select-none cursor-pointer">
                          see more
                        </p>
                      </a>
                    </div>
                  </div>
                ))}
                {context.isLoading && (
                  <div className="w-max mt-[24px]">
                    <Loading text="text-5xl" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
