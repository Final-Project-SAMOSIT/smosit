import React, { Fragment, useContext, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { FormikProps } from "formik";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { documentProposalFormContext } from "../context/document_proposal_form.context";
import { proposalInitvalue } from "../form/document_proposal.form";
import classNames from "classnames";
import _ from "lodash";

interface ProposalPDFProps {
  formik: FormikProps<typeof proposalInitvalue>;
}

export const ProposalPDF = (props: ProposalPDFProps) => {
  //---------------------
  //   FORMIK
  //---------------------
  const { formik } = props;

  //---------------------
  //   I18n
  //---------------------
  const { t, i18n } = useTranslation();

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(documentProposalFormContext);

  //---------------------
  //   HANDLED
  //---------------------
  function getDate() {
    return "1-2";
  }

  function getMonth() {
    return "ตุลาคม";
  }

  function getYear() {
    return "2565";
  }

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    setTimeout(() => {
      window.print();
      context.isPrinting = false;
    }, 300);
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="relative text-[2.2vw] text-pdf font-medium">
          <img src="/images/proposal.jpg" className="w-full" alt="" />
          <p className="absolute top-[7.5%] left-[10.8%] w-[13.5%] text-center">
            {formik.values.form_info.form_no}
          </p>
          <p className="absolute top-[7.5%] left-[64.7%] w-[25.1%]">
            {formik.values.form_info.institution}
          </p>
          <p className="absolute top-[9.3%] left-[61%] w-[4.3%] text-center">
            {dayjs(new Date()).locale("th").add(543, "year").format("D")}
          </p>
          <p className="absolute top-[9.3%] left-[69.5%] w-[11%] text-center">
            {dayjs(new Date()).locale("th").add(543, "year").format("MMMM")}
          </p>
          <p className="absolute top-[9.3%] left-[83.6%] w-[6.6%] text-center">
            {dayjs(new Date()).locale("th").add(543, "year").format("YYYY")}
          </p>
          <p className="absolute top-[11%] left-[26.5%] w-[27%]">
            {formik.values.form_info.solution}
          </p>
          <p className="absolute top-[15.3%] left-[21.3%] w-[24%] text-center leading-[1.2vw] h-0">
            {formik.values.request_info.project_due_to}
          </p>
          <p className="absolute top-[14.5%] left-[53%] w-[33%] ">
            {formik.values.request_info.project_name}
          </p>
          <p className="absolute top-[16.3%] left-[17.3%] w-[10.7%] text-center">
            {getDate()}
          </p>
          <p className="absolute top-[16.3%] left-[32.4%] w-[12%] text-center">
            {getMonth()}
          </p>
          <p className="absolute top-[16.3%] left-[48.2%] w-[7%] text-center">
            {getYear()}
          </p>
          <p className="absolute top-[16.3%] left-[57.4%] w-[28.7%]">
            {formik.values.request_info.location}
          </p>
          <p className="absolute top-[18%] left-[31.7%] w-[7%] text-center">
            {formik.values.request_info.cost}
          </p>
          <p className="absolute top-[18%] left-[43.7%] w-[27%] text-center">
            {formik.values.request_info.cost_des_th}
          </p>
          <i
            className={classNames(
              "fas fa-check absolute top-[22%] text-[1.5vw]",
              {
                "left-[40.5%]": formik.values.activity_type_id === "2",
                "left-[9.8%]": formik.values.activity_type_id === "1",
                "opacity-0": formik.values.activity_type_id === "",
              }
            )}
          ></i>
          {formik.values.activity_type_id === "2" && (
            <Fragment>
              <p className="absolute top-[23.35%] left-[80.7%] w-[4%] text-center">
                {_.find(
                  formik.values.sub_activity,
                  (subActivity) => subActivity.sub_activity_id === "1"
                )?.activity_hour || 0}
              </p>
              <p className="absolute top-[25.05%] left-[80.7%] w-[4%] text-center">
                {_.find(
                  formik.values.sub_activity,
                  (subActivity) => subActivity.sub_activity_id === "2"
                )?.activity_hour || 0}
              </p>
              <p className="absolute top-[26.8%] left-[80.7%] w-[4%] text-center">
                {_.find(
                  formik.values.sub_activity,
                  (subActivity) => subActivity.sub_activity_id === "3"
                )?.activity_hour || 0}
              </p>
              <p className="absolute top-[28.5%] left-[80.7%] w-[4%] text-center">
                {_.find(
                  formik.values.sub_activity,
                  (subActivity) => subActivity.sub_activity_id === "4"
                )?.activity_hour || 0}
              </p>
              <p className="absolute top-[30.3%] left-[80.7%] w-[4%] text-center">
                {_.find(
                  formik.values.sub_activity,
                  (subActivity) => subActivity.sub_activity_id === "5"
                )?.activity_hour || 0}
              </p>
              <p className="absolute top-[32%] left-[80.7%] w-[4%] text-center">
                {_.find(
                  formik.values.sub_activity,
                  (subActivity) => subActivity.sub_activity_id === "6"
                )?.activity_hour || 0}
              </p>
            </Fragment>
          )}
          <p className="absolute top-[80.3%] left-[74.5%] w-[14%] text-center">
            {formik.values.form_info.contact}
          </p>
        </div>
      )}
    </Observer>
  );
};
