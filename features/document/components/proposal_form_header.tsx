import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { TextInput } from "../../../core/components/input/text_input.component";
import { FormikProps } from "formik";
import classNames from "classnames";
import { proposalInitvalue } from "../form/document_proposal.form";

interface ProposalFormHeaderProps {
  formik: FormikProps<typeof proposalInitvalue>;
}

export const ProposalFormHeader = (props: ProposalFormHeaderProps) => {
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
            height: isOpen ? contentRef.current?.clientHeight : 67,
          }}
          ref={containertRef}
        >
          <div
            className="pt-[16px] px-[24px] pb-[32px] space-y-[18px]"
            ref={contentRef}
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
                <p className="w-[168px] body">เลขที่หนังสือ / คำร้องขอ</p>
                <div>
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.form_info?.form_no || ""}
                    onChange={(e) =>
                      formik.setFieldValue("form_info.form_no", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex space-x-[24px]">
                <p className="w-[168px] body">หน่วยงาน</p>
                <div className="flex-grow">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.form_info?.institution || ""}
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
                <p className="w-[168px] body">หัวข้อเรื่องที่ขออนุมัติ</p>
                <div className="flex-grow">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.form_info?.solution || ""}
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
