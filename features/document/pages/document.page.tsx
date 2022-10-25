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
              <div className="space-y-[8px] tablet:space-y-[16px] flex flex-col items-center">
                <p className="text-center title">แบบบันทึกแผนโครงการ</p>
                <div className="h-[1px] w-[160px] tablet:w-[350px] bg-black" />
              </div>
              <div className="flex flex-col items-center justify-around space-y-[24px] tablet:space-y-0 tablet:flex-row">
                {_.map(documentMetaData, (document) => (
                  <a href={`document/${document.name}`}>
                    <div
                      className="w-[240px] laptop:w-[420px] ratio-[8.27/11.69] py-[32px] flex flex-col items-center justify-around bg-white rounded-[10px] transform hover:scale-[1.1] duration-300 cursor-pointer border border-black"
                      onClick={() => null}
                    >
                      <div className="w-[85%] ratio-[8.27/11.69]">
                        <img
                          className="w-full h-full"
                          src={`/images/${document.name}.jpg`}
                        />
                      </div>
                      <p className="underline heading5">{document.label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-[24px] flex flex-col items-center">
              <p className="title">My History</p>
              <div className="flex flex-col items-center w-full">
                <div className="h-[50px] py-[14px] border-b-[1.5px] border-gray-40 flex w-full">
                  <p className="heading6 w-[96px] tablet:w-[320px]">DATE</p>
                  <p className="heading6">TOPIC</p>
                </div>
                {_.map(context.documentList, (document) => (
                  <div className="h-[50px] py-[14px] border-b-[1.5px] border-gray-40 flex w-full">
                    <p className="text-body w-[96px] tablet:w-[320px]">
                      {dayjs(document.created_date)
                        .locale(i18n.language)
                        .add(i18n.language === "th" ? 543 : 0, "year")
                        .format("D/M/YYYY")}
                    </p>
                    <div className="flex justify-between flex-grow">
                      <a
                        href={`document/${document.form_type}/${
                          document.form_info_id
                        }/${
                          document.form_type === "proposal"
                            ? document.request_info[0]?.request_info_id
                            : document.project_approved[0]?.project_id
                        }`}
                      >
                        <p className="truncate cursor-pointer select-none text-body max-w-[158px] tablet:max-w-[264px]">
                          {document.solution || ""}
                        </p>
                      </a>

                      <p
                        className="underline text-body w-[56px] text-right cursor-pointer select-none break-all truncate"
                        onClick={() => null}
                      >
                        delete
                      </p>
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
