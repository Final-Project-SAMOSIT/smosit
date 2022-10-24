import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { documentProposalFormContext } from "../context/document_proposal_form.context";
import { ModalContext } from "../../../core/context/modal.context";
import { AuthContext } from "../../../core/context/auth.context";
import { Button } from "../../../core/components/input/button.component";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import {
  proposalInitvalue,
  proposalValidationSchema,
} from "../form/document_proposal.form";
import { MainLayout } from "../../../core/components/layout/main_layout";
import { DocumentFormHeader } from "../components/document_form_header";
import { ProposalPDF } from "../components/proposal_pdf";
import { ProposalFormHeader } from "../components/proposal_form_header";
import { ProposalFormBody } from "../components/proposal_form_body";

export const DocumentProposalFormPage = () => {
  //---------------------
  //   I18n
  //---------------------
  const { t, i18n } = useTranslation();

  //---------------------
  //   STATE
  //---------------------
  const [initValue, setInitValue] = useState(proposalInitvalue);

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
    validationSchema: proposalValidationSchema,
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
  const context = useContext(documentProposalFormContext);
  const modal = useContext(ModalContext);
  const authContext = useContext(AuthContext);

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    context.modal = modal;
    if (!authContext.isPermission(["Publisher", "Users"])) {
      router.push("401");
    } else {
      context.preparation();
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
              <div className="bg-gray-10 pt-[32px] pb-[48px] flex flex-col items-stretch space-y-[48px] px-[86px]">
                <div className="space-y-[16px] flex flex-col items-center">
                  <p className="title text-center">
                    แบบขออนุมัติโครงการและงบประมาณ
                  </p>
                  <div className="h-[1px] w-[350px] bg-black" />
                </div>
                <div className="space-y-[24px]">
                  <ProposalFormHeader formik={formik} />
                  <ProposalFormBody formik={formik} />
                </div>
                <div className="justify-center space-x-[24px] flex">
                  <Button
                    onClick={() => formik.submitForm()}
                    title="Save Draft"
                    widthCss="w-[137px]"
                    heightCss="h-[52px]"
                  ></Button>
                  <Button
                    onClick={() => context.onPrint()}
                    title="Export"
                    widthCss="w-[137px]"
                    heightCss="h-[52px]"
                  ></Button>
                </div>
              </div>
            </div>
          </MainLayout>
        ) : (
          <ProposalPDF formik={formik} />
        )
      }
    </Observer>
  );
};
