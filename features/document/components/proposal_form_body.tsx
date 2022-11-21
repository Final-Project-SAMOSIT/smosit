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
import _ from "lodash";
import { documentProposalFormContext } from "../context/document_proposal_form.context";
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
                  {t("document_proposal_proposal_name")}
                </p>
                <div className="flex-grow flex space-x-0 space-y-[4px] laptop:space-y-0 laptop:space-x-[8px] items-start laptop:items-center laptop:flex-row flex-col">
                  <div className="laptop:w-[620px] w-full">
                    <TextInput
                      height={30}
                      radius={6}
                      value={formik.values.request_info?.project_name}
                      error={formik.errors.request_info?.project_name}
                      hide-error-text
                      onChange={(e) => {
                        if (mesureText(e.target.value) <= 340) {
                          formik.setFieldValue(
                            "request_info.project_name",
                            e.target.value
                          );
                          formik.setFieldError("request_info.project_name", "");
                        } else {
                          formik.setFieldError(
                            "request_info.project_name",
                            t("document_document_error_too_long_text")
                          );
                        }
                      }}
                    />
                  </div>
                  <p className="caption2 text-error">
                    {formik.errors.request_info?.project_name}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">
                  {t("document_proposal_brief_purpose")}
                </p>
                <div className="flex flex-grow items-center space-x-[8px]">
                  <div className="w-[440px]">
                    <TextInput
                      height={30}
                      radius={6}
                      value={formik.values.request_info?.project_due_to || ""}
                      error={formik.errors.request_info?.project_due_to}
                      hide-error-text
                      onChange={(e) => {
                        if (mesureText(e.target.value) <= 210) {
                          formik.setFieldValue(
                            "request_info.project_due_to",
                            e.target.value
                          );
                          formik.setFieldError(
                            "request_info.project_due_to",
                            ""
                          );
                        } else {
                          formik.setFieldError(
                            "request_info.project_due_to",
                            t("document_document_error_too_long_text")
                          );
                        }
                      }}
                    />
                  </div>
                  <p className="text-error caption2 laptop:w-[121px] w-auto">
                    {formik.errors.request_info?.project_due_to}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">
                  {t("document_proposal_organize_date")}
                </p>
                <div className="flex-grow flex laptop:flex-row flex-col items-stretch laptop:space-y-0 space-y-[8px] laptop:items-center space-x-0 laptop:space-x-[24px]">
                  <div className="space-x-[8px] flex items-center">
                    <p className="body w-[34px] tablet:w-[48px]">
                      {t("document_proposal_organize_start_date")}
                    </p>
                    <TextInput
                      height={30}
                      width={160}
                      radius={6}
                      value={dayjs(
                        formik.values.request_info?.start_date
                      ).format("DD/MM/YYYY")}
                      onChange={() => null}
                    />
                    <Calendar
                      value={formik.values.request_info?.start_date}
                      onChange={(e) =>
                        formik.setFieldValue("request_info.start_date", e)
                      }
                    />
                  </div>
                  <div className="space-x-[8px] flex items-center">
                    <p className="body w-[34px] tablet:w-[48px]">
                      {t("document_proposal_organize_end_date")}
                    </p>
                    <TextInput
                      height={30}
                      width={160}
                      radius={6}
                      value={dayjs(formik.values.request_info?.end_date).format(
                        "DD/MM/YYYY"
                      )}
                      onChange={() => null}
                    />
                    <Calendar
                      value={formik.values.request_info?.end_date}
                      onChange={(e) =>
                        formik.setFieldValue("request_info.end_date", e)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">{t("document_proposal_place")}</p>
                <div className="flex-grow flex space-x-0 space-y-[4px] laptop:space-y-0 laptop:space-x-[8px] items-start laptop:items-center laptop:flex-row flex-col">
                  <div className="laptop:w-[620px] w-full">
                    <TextInput
                      height={30}
                      radius={6}
                      value={formik.values.request_info?.location}
                      error={formik.errors.request_info?.location}
                      hide-error-text
                      onChange={(e) => {
                        if (mesureText(e.target.value) <= 315) {
                          formik.setFieldValue(
                            "request_info.location",
                            e.target.value
                          );
                          formik.setFieldError("request_info.location", "");
                        } else {
                          formik.setFieldError(
                            "request_info.location",
                            t("document_document_error_too_long_text")
                          );
                        }
                      }}
                    />
                  </div>
                  <p className="text-error caption2 laptop:w-[121px] w-auto">
                    {formik.errors.request_info?.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
                <p className="w-[192px] body">{t("document_proposal_cost")}</p>
                <div className="flex items-center space-x-[8px]">
                  <TextInput
                    height={30}
                    width={149}
                    radius={6}
                    value={formik.values.request_info?.cost.toString() || ""}
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
                  <p className="body">{t("document_proposal_cost_unit")}</p>
                  <p className="body">
                    {formik.values.request_info?.cost_des_th}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch laptop:flex-row laptop:items-center">
              <p className="w-[192px] body">{t("document_proposal_tel_no")}</p>
              <div>
                <TextInput
                  height={30}
                  width={239}
                  radius={6}
                  value={formik.values.form_info?.contact || ""}
                  onChange={(e) =>
                    formik.setFieldValue("form_info.contact", e.target.value)
                  }
                  type="number"
                />
              </div>
            </div>
            <div className="space-y-[14px]">
              <p className="subtitle">
                {t("document_proposal_proposal_type_title")}
              </p>
              <div className="flex laptop:flex-row flex-col space-x-0 laptop:space-x-[32px]">
                {_.map(context.activityList, (activity) => (
                  <div className="flex flex-col space-y-[14px] last:flex-grow">
                    <div className="flex space-x-[8px] items-center">
                      <div
                        className="w-[16px] h-[16px] border border-black flex items-center justify-center"
                        onClick={() => {
                          formik.setFieldValue(
                            "activity_type_id",
                            formik.values.activity_type_id ===
                              activity.activity_id
                              ? ""
                              : activity.activity_id
                          );
                          formik.setFieldValue("sub_activity", []);
                        }}
                      >
                        {formik.values.activity_type_id ===
                          activity.activity_id && (
                          <i className="fas fa-check text-[12px]" />
                        )}
                      </div>
                      <p className="body">
                        {activity.activity_type === "hour_count"
                          ? t("document_proposal_count_hour_type")
                          : t("document_proposal_uncount_type")}
                      </p>
                    </div>
                    {activity.activity_type === "hour_count" &&
                      formik.values.activity_type_id === "2" && (
                        <Fragment>
                          {_.map(
                            formik.values.sub_activity,
                            (subActivity, index) => (
                              <div className="flex laptop:flex-row flex-col space-y-[8px] laptop:space-y-0 space-x-0 laptop:space-x-[14px] items-start laptop:items-center">
                                <div className="laptop:w-[340px] w-full flex space-x-[16px] items-stretch laptop:items-center">
                                  <div className="laptop:w-full tablet:w-full w-[204px]">
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
                                              sub.sub_activity_id ===
                                              option.value
                                          ) === undefined ||
                                          option.value ===
                                            subActivity.sub_activity_id
                                      )}
                                      value={
                                        formik.values.sub_activity[index]
                                          .sub_activity_id
                                      }
                                      placeholder={t(
                                        "document_proposal_hour_type_placeholder"
                                      )}
                                    />
                                  </div>
                                  <div
                                    className="flex items-center justify-center rounded-full cursor-pointer laptop:hidden"
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
                                    <div className="w-[16px] h-[16px] border border-black rounded-full flex items-center justify-center">
                                      <i className="fas fa-minus text-[8px] pl-[1px] pt-[1px]"></i>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex space-x-[14px] items-center">
                                  <p className="body">
                                    {t("document_proposal_hour")}
                                  </p>
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
                                  <p className="body">
                                    {t("document_proposal_hour_unit")}
                                  </p>
                                </div>
                                <div
                                  className="items-center justify-center w-[16px] h-[16px] rounded-full border border-black cursor-pointer laptop:flex hidden"
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
