import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { documentInitvalue } from "../form/document_document.form";
import { FormikProps } from "formik";
import classNames from "classnames";
import { TextInput } from "../../../core/components/input/text_input.component";
import dayjs from "dayjs";
import { Calendar } from "../../../core/components/input/calendar.component";
const THBText = require("thai-baht-text");

interface DocumentFormBodyProps {
  formik: FormikProps<typeof documentInitvalue>;
}

export const DocumentFormBody = (props: DocumentFormBodyProps) => {
  //---------------------
  //   PROPS
  //---------------------
  const { formik } = props;

  //---------------------
  //   STATE
  //---------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);

  //---------------------
  //   REF
  //---------------------
  const contentRef = useRef<HTMLDivElement>(null);
  const containertRef = useRef<HTMLDivElement>(null);

  //---------------------
  //   I18n
  //---------------------
  const { t, i18n } = useTranslation("document");

  //---------------------
  //   HANDLED
  //---------------------
  function mesureText(text: string): number {
    const p = document.createElement("p");
    p.className = "text-pdf w-max";
    p.innerHTML = text;
    p.id = "mesureText";

    document.body.appendChild(p);
    const elem = document.getElementById("mesureText");
    const width = elem?.offsetWidth || 0;
    console.log(width);
    document.body.removeChild(p);
    return width;
  }

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        containertRef.current?.style.setProperty("overflow", "unset");
      }, 200);
    } else {
      containertRef.current?.style.setProperty("overflow", "hidden");
    }
  }, [isOpen]);
  /* TOOD: เพิ่ม return ถ้า formik ไม่เซฟ ขึ้น modal แล้วเซฟ formik ไว้ยิง save */

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div
          className="bg-white border border-black rounded-[10px] overflow-y-hidden transform duration-200"
          style={{
            height: isOpen
              ? contentRef.current?.clientHeight
              : window.innerWidth <= 768
              ? 56
              : 67,
          }}
          ref={containertRef}
        >
          <div
            className="pt-[16px] px-[24px] pb-[32px] space-y-[18px]"
            ref={contentRef}
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <p className="topic2">{t("document_body_topic")}</p>
              <i
                className={classNames(
                  "fas fa-caret-down text-[22px] transform duration-200",
                  {
                    "rotate-0": isOpen,
                    "-rotate-90": !isOpen,
                  }
                )}
              />
            </div>
            <div className="space-y-[14px]">
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">
                  {t("document_document_proposal_name")}
                </p>
                <div className="flex-grow flex space-x-0 space-y-[4px] laptop:space-y-0 laptop:space-x-[8px] items-start laptop:items-center laptop:flex-row flex-col">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.project_name || ""}
                    error={formik.errors.project_name}
                    hide-error-text
                    onChange={(e) => {
                      if (mesureText(e.target.value) <= 179) {
                        formik.setFieldValue("project_name", e.target.value);
                        formik.setFieldError("project_name", "");
                      } else {
                        formik.setFieldError(
                          "project_name",
                          t("document_document_error_too_long_text")
                        );
                      }
                    }}
                  />
                  <p className="text-error caption2 laptop:w-[121px] w-auto">
                    {formik.errors.project_name}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">
                  {t("document_document_club_name")}
                </p>
                <div className="flex-grow flex space-x-0 space-y-[4px] laptop:space-y-0 laptop:space-x-[8px] items-start laptop:items-center laptop:flex-row flex-col">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.club_name || ""}
                    error={formik.errors.club_name}
                    hide-error-text
                    onChange={(e) => {
                      if (mesureText(e.target.value) <= 192) {
                        formik.setFieldValue("club_name", e.target.value);
                        formik.setFieldError("club_name", "");
                      } else {
                        formik.setFieldError(
                          "club_name",
                          t("document_document_error_too_long_text")
                        );
                      }
                    }}
                  />
                  <p className="text-error caption2 laptop:w-[121px] w-auto">
                    {formik.errors.club_name}
                  </p>
                </div>
              </div>
              <div className="flex laptop:flex-row flex-col items-stretch laptop:items-center">
                <p className="w-[192px] body">
                  {t("document_document_organize_date")}
                </p>
                <div className="flex-grow flex laptop:flex-row flex-col items-stretch laptop:space-y-0 space-y-[8px] laptop:items-center space-x-0 laptop:space-x-[24px]">
                  <div className="space-x-[8px] flex items-center">
                    <p className="body laptop:w-[48px] w-[34px]">
                      {t("document_document_organize_start_date")}
                    </p>
                    <TextInput
                      height={30}
                      width={160}
                      radius={6}
                      value={dayjs(formik.values.start_date).format(
                        "DD/MM/YYYY"
                      )}
                      onChange={() => null}
                    />
                    <Calendar
                      value={formik.values.start_date}
                      onChange={(e) => formik.setFieldValue("start_date", e)}
                    />
                  </div>
                  <div className="space-x-[8px] flex items-center">
                    <p className="body laptop:w-[48px] w-[34px]">
                      {t("document_document_organize_end_date")}
                    </p>
                    <TextInput
                      height={30}
                      width={160}
                      radius={6}
                      value={dayjs(formik.values.end_date).format("DD/MM/YYYY")}
                      onChange={() => null}
                    />
                    <Calendar
                      value={formik.values.end_date}
                      onChange={(e) => formik.setFieldValue("end_date", e)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">{t("document_document_place")}</p>
                <div className="flex-grow flex space-x-0 space-y-[4px] laptop:space-y-0 laptop:space-x-[8px] items-start laptop:items-center laptop:flex-row flex-col">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.location || ""}
                    error={formik.errors.location}
                    hide-error-text
                    onChange={(e) => {
                      if (mesureText(e.target.value) <= 119) {
                        formik.setFieldValue("location", e.target.value);
                        formik.setFieldError("location", "");
                      } else {
                        formik.setFieldError(
                          "location",
                          t("document_document_error_too_long_text")
                        );
                      }
                    }}
                  />
                  <p className="text-error caption2 laptop:w-[121px] w-auto">
                    {formik.errors.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">
                  {t("document_document_brief_purpose")}
                </p>
                <div className="flex-grow flex space-x-0 space-y-[4px] laptop:space-y-0 laptop:space-x-[8px] items-start laptop:items-center laptop:flex-row flex-col">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.project_purpose || ""}
                    error={formik.errors.project_purpose}
                    hide-error-text
                    onChange={(e) => {
                      if (mesureText(e.target.value) <= 179) {
                        formik.setFieldValue("project_purpose", e.target.value);
                        formik.setFieldError("project_purpose", "");
                      } else {
                        formik.setFieldError(
                          "project_purpose",
                          t("document_document_error_too_long_text")
                        );
                      }
                    }}
                  />
                  <p className="text-error caption2 laptop:w-[121px] w-auto">
                    {formik.errors.project_purpose}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">
                  {t("document_document_brief_activity_detail")}
                </p>
                <div className="flex-grow flex space-x-0 space-y-[4px] laptop:space-y-0 laptop:space-x-[8px] items-start laptop:items-center laptop:flex-row flex-col">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.about_project || ""}
                    error={formik.errors.about_project}
                    hide-error-text
                    onChange={(e) => {
                      if (mesureText(e.target.value) <= 230) {
                        formik.setFieldValue("about_project", e.target.value);
                        formik.setFieldError("about_project", "");
                      } else {
                        formik.setFieldError(
                          "about_project",
                          t("document_document_error_too_long_text")
                        );
                      }
                    }}
                  />
                  <p className="text-error caption2 laptop:w-[121px] w-auto">
                    {formik.errors.about_project}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">{t("document_document_cost")}</p>
                <div className="flex items-center space-x-[8px]">
                  <TextInput
                    height={30}
                    width={149}
                    radius={6}
                    value={formik.values.cost.toString() || ""}
                    onChange={(e) => {
                      if (Number(e.target.value) >= 0) {
                        formik.setFieldValue("cost", e.target.value);
                        formik.setFieldValue(
                          "cost_des_th",
                          THBText(Number(e.target.value))
                        );
                      }
                    }}
                  />
                  <p className="body">{t("document_document_cost_unit")}</p>
                  <p className="body">{formik.values.cost_des_th}</p>
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">
                  {t("document_document_contact_no")}
                </p>
                <div>
                  <TextInput
                    height={30}
                    width={239}
                    radius={6}
                    value={formik.values.form_info.contact || ""}
                    onChange={(e) =>
                      formik.setFieldValue("form_info.contact", e.target.value)
                    }
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};
