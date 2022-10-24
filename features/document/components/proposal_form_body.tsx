import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { TextInput } from "../../../core/components/input/text_input.component";
import { FormikProps } from "formik";
import classNames from "classnames";
import { proposalInitvalue } from "../form/document_proposal.form";
import dayjs from "dayjs";
import { Calendar } from "../../../core/components/input/calendar.component";
import _, { map } from "lodash";
import { documentProposalFormContext } from "../context/document_proposal_form.context";
import { Activity, SubActivity } from "../types/document.type";
import { Dropdown } from "../../../core/components/input/dropdown_input";
const THBText = require("thai-baht-text");

interface ProposalFormBodyProps {
  formik: FormikProps<typeof proposalInitvalue>;
}

export const ProposalFormBody = (props: ProposalFormBodyProps) => {
  //---------------------
  //   PROPS
  //---------------------
  const { formik } = props;

  //---------------------
  //   STATE
  //---------------------
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);

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
  //   CONTEXT
  //---------------------
  const context = useContext(documentProposalFormContext);

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

  useEffect(() => {
    setToggle(!toggle);
  }, [formik.values.sub_activity]);

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
              <div className="flex items-center space-x-[24px]">
                <p className="w-[168px] body">ชื่อโครงการ</p>
                <div className="flex-grow">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.request_info.project_name}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "request_info.project_name",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex items-center">
                <p className="w-[192px] body">จุดประสงค์ (โดยสังเขป)</p>
                <div className="flex-grow">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.request_info.project_due_to || ""}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "request_info.project_due_to",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex items-center space-x-[24px]">
                <p className="w-[168px] body">วัน/เดือน/ปี ที่จัดโครงการ</p>
                <div className="flex-grow flex items-center space-x-[24px]">
                  <div className="space-x-[8px] flex items-center">
                    <p className="body">เริ่ม</p>
                    <TextInput
                      height={30}
                      width={160}
                      radius={6}
                      value={dayjs(
                        formik.values.request_info.start_date
                      ).format("DD/MM/YYYY")}
                      onChange={() => null}
                    />
                    <Calendar
                      value={formik.values.request_info.start_date}
                      onChange={(e) =>
                        formik.setFieldValue("request_info.start_date", e)
                      }
                    />
                  </div>
                  <div className="space-x-[8px] flex items-center">
                    <p className="body">สิ้นสุด</p>
                    <TextInput
                      height={30}
                      width={160}
                      radius={6}
                      value={dayjs(formik.values.request_info.end_date).format(
                        "DD/MM/YYYY"
                      )}
                      onChange={() => null}
                    />
                    <Calendar
                      value={formik.values.request_info.end_date}
                      onChange={(e) =>
                        formik.setFieldValue("request_info.end_date", e)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-[24px]">
                <p className="w-[168px] body">สถานที่จัดโครงการ</p>
                <div className="flex-grow">
                  <TextInput
                    height={30}
                    radius={6}
                    value={formik.values.request_info.location}
                    onChange={(e) =>
                      formik.setFieldValue(
                        "request_info.location",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex items-center">
                <p className="w-[192px] body">ค่าใช้จ่ายในโครงการ</p>
                <div className="flex items-center space-x-[8px]">
                  <TextInput
                    height={30}
                    width={149}
                    radius={6}
                    value={formik.values.request_info.cost.toString() || ""}
                    onChange={(e) => {
                      if (Number(e.target.value) >= 0) {
                        formik.setFieldValue(
                          "request_info.cost",
                          e.target.value
                        );
                        formik.setFieldValue(
                          "request_info.cost_des_th",
                          THBText(Number(e.target.value))
                        );
                      }
                    }}
                  />
                  <p className="body">บาท</p>
                  <p className="body">
                    {formik.values.request_info.cost_des_th}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center">
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
            <div className="space-y-[14px]">
              <p className="subtitle">ประเภทของโครงการในการนับชั่วโมงกิจกรรม</p>
              <div className="flex space-x-[32px]">
                {_.map(context.activityList, (activity) => (
                  <div className="flex flex-col space-y-[14px] last:flex-grow">
                    <div className="flex space-x-[8px] items-center">
                      <div
                        className="w-[16px] h-[16px] border border-black flex items-center justify-center"
                        onClick={() => {
                          formik.setFieldValue(
                            "activity_type",
                            formik.values.activity_type ===
                              activity.activity_type
                              ? ""
                              : activity.activity_type
                          );
                          formik.setFieldValue("sub_activity", []);
                        }}
                      >
                        {formik.values.activity_type ===
                          activity.activity_type && (
                          <i className="fas fa-check text-[12px]" />
                        )}
                      </div>
                      <p className="body">
                        {activity.activity_type === "hour_count"
                          ? "กิจกรรมเลือกเข้าร่วม"
                          : "กิจกรรมที่ไม่นับหน่วยชั่วโมง"}
                      </p>
                    </div>
                    {activity.activity_type === "hour_count" &&
                      formik.values.activity_type === "hour_count" && (
                        <Fragment>
                          {_.map(
                            formik.values.sub_activity,
                            (subActivity, index) => (
                              <div className="flex space-x-[14px] items-center">
                                <div className="w-[340px]">
                                  <Dropdown
                                    onChange={(e) =>
                                      formik.setFieldValue(
                                        `sub_activity[${index}].sub_activity_id`,
                                        e
                                      )
                                    }
                                    height={30}
                                    options={_.filter(
                                      context.subActivityOptions,
                                      (option) =>
                                        _.find(
                                          formik.values.sub_activity,
                                          (sub) =>
                                            sub.sub_activity_id === option.value
                                        ) === undefined ||
                                        option.value ===
                                          subActivity.sub_activity_id
                                    )}
                                    value={
                                      formik.values.sub_activity[index]
                                        .sub_activity_id
                                    }
                                    placeholder="ประเภทของกิจกรรม"
                                  />
                                </div>
                                <p className="body">จำนวน</p>
                                <TextInput
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      `sub_activity.${index}.activity_hour`,
                                      Number(e.target.value)
                                    );
                                  }}
                                  height={30}
                                  width={86}
                                  radius={8}
                                  value={subActivity.activity_hour.toString()}
                                />
                                <p className="body">หน่วยชั่วโมง</p>
                                <div
                                  className="flex items-center justify-center w-[16px] h-[16px] rounded-full border border-black cursor-pointer"
                                  onClick={() =>
                                    formik.setFieldValue(
                                      "sub_activity",
                                      _.filter(
                                        formik.values.sub_activity,
                                        (_s, subActivityIndex) =>
                                          index !== subActivityIndex
                                      )
                                    )
                                  }
                                >
                                  <i className="fas fa-minus text-[8px]"></i>
                                </div>
                              </div>
                            )
                          )}
                          {formik.values.sub_activity.length < 6 && (
                            <div
                              className="w-full h-[24px] flex justify-center items-center cursor-pointer"
                              onClick={() =>
                                formik.setFieldValue("sub_activity", [
                                  ...formik.values.sub_activity,
                                  { sub_activity_id: "", activity_hour: 0 },
                                ])
                              }
                            >
                              <div className="h-[1px] flex-grow bg-gray-10" />
                              <i className="fas fa-plus rounded-full mx-[8px] text-gray-50"></i>
                              <div className="h-[1px] flex-grow bg-gray-10" />
                            </div>
                          )}
                        </Fragment>
                      )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden">{toggle}</div>
        </div>
      )}
    </Observer>
  );
};
