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
              : window.innerWidth <= 720
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
              <p className="topic2">ข้อมูลส่วนเนื้อหาโครงการ</p>
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
                <p className="w-[192px] body">ชื่อโครงการ</p>
                <div className="flex-grow">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.project_name || ""}
                    onChange={(e) =>
                      formik.setFieldValue("project_name", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">ชื่อชมรม</p>
                <div className="flex-grow">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.club_name || ""}
                    onChange={(e) =>
                      formik.setFieldValue("club_name", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex laptop:flex-row flex-col space-x-0 laptop:space-x-[24px] items-stretch laptop:items-center">
                <p className="w-[192px] body">วัน/เดือน/ปี ที่จัดโครงการ</p>
                <div className="flex-grow flex laptop:flex-row flex-col items-stretch laptop:space-y-0 space-y-[8px] laptop:items-center space-x-0 laptop:space-x-[24px]">
                  <div className="space-x-[8px] flex items-center">
                    <p className="body w-[34px]">เริ่ม</p>
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
                    <p className="body w-[34px]">สิ้นสุด</p>
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
                <p className="w-[192px] body">สถานที่</p>
                <div className="flex-grow">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.location || ""}
                    onChange={(e) =>
                      formik.setFieldValue("location", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">จุดประสงค์ (โดยสังเขป)</p>
                <div className="flex-grow">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.project_purpose || ""}
                    onChange={(e) =>
                      formik.setFieldValue("project_purpose", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">ลักษณะกิจกรรม (โดยสังเขป)</p>
                <div className="flex-grow">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.about_project || ""}
                    onChange={(e) =>
                      formik.setFieldValue("about_project", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">ค่าใช้จ่ายในโครงการ</p>
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
                  <p className="body">บาท</p>
                  <p className="body">{formik.values.cost_des_th}</p>
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">หมายเลขโทรศัพท์ติดต่อ</p>
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
