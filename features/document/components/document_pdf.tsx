import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { FormikProps } from "formik";
import { documentInitvalue } from "../form/document_document.form";
import { documentDocumentFormContext } from "../context/document_document_form.context";
import dayjs from "dayjs";
import "dayjs/locale/th";

interface DocumentPDFProps {
  formik: FormikProps<typeof documentInitvalue>;
}

export const DocumentPDF = (props: DocumentPDFProps) => {
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
  const context = useContext(documentDocumentFormContext);

  //---------------------
  //   CONTEXT
  //---------------------
  useEffect(() => {
    setTimeout(() => {
      window.print();
      context.isPrinting = false;
    }, 500);
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="relative text-[2.2vw] text-pdf font-medium">
          <img src="/images/document.jpg" className="w-full" alt="" />
          <p className="absolute top-[17.2%] left-[20.6%] text-center w-[26.6%]">
            {formik.values.form_info.institution}
          </p>
          <p className="absolute top-[17.2%] left-[52.7%] text-center w-[14%]">
            {formik.values.form_info.tel}
          </p>
          <p className="absolute top-[19.6%] left-[15.1%] text-center w-[10.2%]">
            {formik.values.form_info.form_no}
          </p>
          <p className="absolute top-[19.6%] left-[59.7%] text-center w-[12%]">
            {dayjs(new Date())
              .locale("th")
              .add(543, "year")
              .format("DD MMMM YYYY")}
          </p>
          <p className="absolute top-[22.1%] left-[31.1%] text-center w-[22.8%]">
            {formik.values.form_info.solution}
          </p>
          <p className="absolute top-[29.7%] left-[31.1%] text-center">
            {formik.values.project_name}
          </p>
          <p className="absolute top-[34.7%] left-[28.8%] text-center w-[13.8%]">
            {formik.values.club_name}
          </p>
          <p className="absolute top-[34.7%] left-[51.3%] text-center w-[24.3%]">
            {formik.values.project_name}
          </p>
          <p className="absolute top-[37.3%] left-[12.2%] text-center w-[21.6%]">
            {dayjs(formik.values.start_date)
              .locale("th")
              .add(543, "year")
              .format("DD MMM YYYY")}{" "}
            ถึง{" "}
            {dayjs(formik.values.end_date)
              .locale("th")
              .add(543, "year")
              .format("DD MMM YYYY")}
          </p>
          <p className="absolute top-[37.3%] left-[36.4%] text-center w-[16%]">
            {formik.values.location}
          </p>
          <p className="absolute top-[37.3%] left-[67%] text-center w-[20.5%]">
            {formik.values.project_purpose}
          </p>
          <p className="absolute top-[39.8%] left-[26.6%] text-center w-[31.5%]">
            {formik.values.about_project}
          </p>
          <p className="absolute top-[42.3%] left-[36%] text-center w-[6.5%]">
            {formik.values.cost}
          </p>
          <p className="absolute top-[42.3%] left-[49%] text-center w-[20.5%]">
            {formik.values.cost_des_th}
          </p>
          <p className="absolute top-[49.6%] left-[65.3%] w-[19.2%] text-center">
            {formik.values.cost}
          </p>
          <p className="absolute top-[52.1%] left-[13%] text-center w-[21.5%]">
            {formik.values.cost_des_th}
          </p>
          <p className="absolute top-[86.7%] left-[18.7%] text-center w-[23.5%]">
            {formik.values.club_name}
          </p>
          <p className="absolute top-[86.7%] left-[61.3%] text-center w-[21.5%]">
            {formik.values.form_info.contact}
          </p>
        </div>
      )}
    </Observer>
  );
};
