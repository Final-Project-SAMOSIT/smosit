import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { MainLayout } from "../../../core/components/layout/main_layout";
import { documentDocumentFormContext } from "../context/document_document_form.context";
import { ModalContext } from "../../../core/context/modal.context";
import { AuthContext } from "../../../core/context/auth.context";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import {
  documentInitvalue,
  documentValidationSchema,
} from "../form/document_document.form";
import { DocumentFormHeader } from "../components/document_form_header";
import { DocumentFormBody } from "../components/document_form_body";
import { Button } from "../../../core/components/input/button.component";
import { DocumentPDF } from "../components/document_pdf";

export const DocumentDocumentFormPage = () => {
  //---------------------
  //   I18n
  //---------------------
  const { t, i18n } = useTranslation("document");

  //---------------------
  //   STATE
  //---------------------
  const [initValue, setInitValue] = useState(documentInitvalue);

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   FORMIK
  //---------------------
  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    enableReinitialize: true,
    initialValues: initValue,
    validationSchema: documentValidationSchema,
    onSubmit: (value) => {
      if (context.isEdit) {
        context.onUpdate(
          value,
          router.query.form_id?.toString() || "",
          router.query.project_id?.toString() || ""
        );
      } else {
        context.onCreate(value);
      }
    },
  });

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(documentDocumentFormContext);
  const modal = useContext(ModalContext);
  const authContext = useContext(AuthContext);

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    context.modal = modal;
    if (!authContext.isPermission(["Publisher", "Users"])) {
      router.push("/401");
    } else {
      if (router.query.project_id) {
        context.isEdit = true;
        context.FormPreparation(
          router.query.project_id.toString(),
          setInitValue
        );
      }
    }
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() =>
        !context.isPrinting ? (
          <MainLayout>
            <div className="my-[64px] space-y-[48px]">
              <div className="bg-gray-10 pt-[32px] pb-[48px] flex flex-col items-stretch space-y-[48px] tablet:px-[24px] px-[12px] laptop:px-[86px]">
                <div className="space-y-[16px] flex flex-col items-center">
                  <p className="text-center title">
                    แบบขออนุมัติขอจัดกิจกรรมนักศึกษา
                  </p>
                  <div className="h-[1px] w-[160px] tablet:w-[350px] bg-black" />
                </div>
                <div className="space-y-[24px]">
                  <DocumentFormHeader formik={formik} />
                  <DocumentFormBody formik={formik} />
                </div>
                <div className="justify-center space-x-[24px] flex">
                  <Button
                    onClick={() => formik.submitForm()}
                    title="Save Draft"
                    widthCss="w-[137px]"
                    heightCss="h-[40px] tablet:h-[52px]"
                  ></Button>
                  <Button
                    onClick={() => context.onPrint()}
                    title="Export"
                    widthCss="w-[137px]"
                    heightCss="h-[40px] tablet:h-[52px]"
                  ></Button>
                </div>
              </div>
            </div>
          </MainLayout>
        ) : (
          <DocumentPDF formik={formik} />
        )
      }
    </Observer>
  );
};
