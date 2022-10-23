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
  const ContentRef = useRef<HTMLDivElement>(null);
  const ContainertRef = useRef<HTMLDivElement>(null);

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
        ContainertRef.current?.style.setProperty("overflow", "unset");
      }, 200);
    } else {
      ContainertRef.current?.style.setProperty("overflow", "hidden");
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
            height: isOpen ? ContentRef.current?.clientHeight : 67,
          }}
          ref={ContainertRef}
        >
          <div
            className="pt-[16px] px-[24px] pb-[32px] space-y-[18px]"
            ref={ContentRef}
          >
            <div
              className="flex justify-between cursor-pointer items-center"
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
              <div className="flex space-x-[24px]">
                <p className="w-[168px] body">ส่วนงานที่รับผิดชอบ</p>
                <div className="flex-grow">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.form_info.institution || ""}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "form_info.institution",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex space-x-[24px]">
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
              <div className="flex space-x-[24px]">
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
              <div className="flex space-x-[24px]">
                <p className="w-[168px] body">หัวข้อเรื่องที่ขออนุมัติ</p>
                <div className="flex-grow">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.form_info.solution}
                    onChange={(e) =>
                      formik.setFieldValue("form_info.solution", e.target.value)
                    }
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
