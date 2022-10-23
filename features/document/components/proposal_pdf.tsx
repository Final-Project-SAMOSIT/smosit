import React, { useContext, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { FormikProps } from "formik";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { documentProposalFormContext } from "../context/document_proposal_form.context";
import { proposalInitvalue } from "../form/document_proposal.form";

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
  //   CONTEXT
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
        </div>
      )}
    </Observer>
  );
};
