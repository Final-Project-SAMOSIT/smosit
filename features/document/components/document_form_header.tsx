import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { TextInput } from "../../../core/components/input/text_input.component";
import { FormikProps } from "formik";
import { documentInitvalue } from "../form/document_document.form";
import classNames from "classnames";

interface DocumentFormHeaderProps {
  formik: FormikProps<typeof documentInitvalue>;
}

export const DocumentFormHeader = (props: DocumentFormHeaderProps) => {
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
              <p className="topic2">ข้อมูลส่วนหัวเรื่อง</p>
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
              <div className="flex laptop:flex-row flex-col space-x-0 laptop:space-x-[24px]">
                <p className="w-[168px] body">ส่วนงานที่รับผิดชอบ</p>
                <div className="flex-grow flex space-x-0 space-y-[4px] laptop:space-y-0 laptop:space-x-[8px] items-start laptop:items-center laptop:flex-row flex-col">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.form_info.institution || ""}
                    error={formik.errors.form_info?.institution}
                    hide-error-text
                    onChange={(e) => {
                      if (mesureText(e.target.value) <= 196) {
                        formik.setFieldValue(
                          "form_info.institution",
                          e.target.value
                        );
                        formik.setFieldError("form_info.institution", "");
                      } else {
                        formik.setFieldError(
                          "form_info.institution",
                          "ข้อความยาวเกินไป"
                        );
                      }
                    }}
                  />
                  <p className="text-error caption2 laptop:w-[121px] w-auto">
                    {formik.errors.form_info?.institution}
                  </p>
                </div>
              </div>
              <div className="flex laptop:flex-row flex-col space-x-0 laptop:space-x-[24px]">
                <p className="w-[168px] body">หมายเลขโทรหน่วยงาน</p>
                <div>
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.form_info.tel}
                    onChange={(e) =>
                      formik.setFieldValue("form_info.tel", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex laptop:flex-row flex-col space-x-0 laptop:space-x-[24px]">
                <p className="w-[168px] body">เลขที่หนังสือ / คำร้องขอ</p>
                <div>
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.form_info.form_no}
                    onChange={(e) =>
                      formik.setFieldValue("form_info.form_no", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex laptop:flex-row flex-col space-x-0 laptop:space-x-[24px]">
                <p className="w-[168px] body">หัวข้อเรื่องที่ขออนุมัติ</p>
                <div className="flex-grow flex space-x-0 space-y-[4px] laptop:space-y-0 laptop:space-x-[8px] items-start laptop:items-center laptop:flex-row flex-col">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.form_info.solution}
                    error={formik.errors.form_info?.solution}
                    hide-error-text
                    onChange={(e) => {
                      if (mesureText(e.target.value) <= 162) {
                        formik.setFieldValue(
                          "form_info.solution",
                          e.target.value
                        );
                        formik.setFieldError("form_info.solution", "");
                      } else {
                        formik.setFieldError(
                          "form_info.solution",
                          "ข้อความยาวเกินไป"
                        );
                      }
                    }}
                  />
                  <p className="text-error caption2 laptop:w-[121px] w-auto">
                    {formik.errors.form_info?.solution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};
