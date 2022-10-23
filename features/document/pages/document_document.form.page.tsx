import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { MainLayout } from "../../../core/components/layout/main_layout";
import { documentDocumentFormContext } from "../context/document_document_form.context";
import { ModalContext } from "../../../core/context/modal.context";
import { AuthContext } from "../../../core/context/auth.context";
import { useRouter } from "next/router";
import classNames from "classnames";
import { TextInput } from "../../../core/components/input/text_input.component";
import { Calendar } from "../../../core/components/input/calendar.component";
import { useFormik, validateYupSchema } from "formik";
import {
  documentInitvalue,
  documentValidationSchema,
} from "../form/document_document.form";
import { DocumentFormHeader } from "../components/document_form_header";
import { DocumentFormBody } from "../components/document_form_body";
import { Button } from "../../../core/components/input/button.component";

export const DocumentDocumentFormPage = () => {
  //---------------------
  //   I18n
  //---------------------
  const { t, i18n } = useTranslation("document");

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
    initialValues: documentInitvalue,
    validationSchema: documentValidationSchema,
    onSubmit: (value) => {
      context.onCreate(value);
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
    if (!authContext.isPermission(["Publisher", "Users"])) {
      router.push("401");
    }

    context.modal = modal;
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="my-[64px] space-y-[48px]">
            <div className="bg-gray-10 pt-[32px] pb-[48px] flex flex-col items-stretch space-y-[48px] px-[86px]">
              <div className="space-y-[16px] flex flex-col items-center">
                <p className="title text-center">
                  แบบขออนุมัติโครงการและงบประมาณ
                </p>
                <div className="h-[1px] w-[350px] bg-black" />
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
                  heightCss="h-[52px]"
                ></Button>
                <Button
                  onClick={() => null}
                  title="Export"
                  widthCss="w-[137px]"
                  heightCss="h-[52px]"
                ></Button>
              </div>
            </div>
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
