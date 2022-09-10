import React, { useContext } from "react";
import { Observer } from "mobx-react-lite";
import _ from "lodash";
import { ModalContext } from "../../../core/context/modal.context";
import { aboutContext } from "../contexts/about.context";
import { Dropdown } from "../../../core/components/input/dropdown_input";
import { useFormik } from "formik";
import { unionYearInit, unionYearValidation } from "../form/union_year.form";
import { Button } from "../../../core/components/input/button.component";
import { useTranslation } from "next-i18next";

export const UnionYearFormModal = () => {
  //---------------------
  //   i18n
  //---------------------
  const { i18n, t } = useTranslation("about");

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(aboutContext);
  const modalContext = useContext(ModalContext);

  //---------------------
  //   FORMIK
  //---------------------
  const formik = useFormik({
    initialValues: unionYearInit,
    validationSchema: unionYearValidation,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: (e) => {
      modalContext.openModal(
        t("about_page_student_union_create_year_modal_title"),
        t("about_page_student_union_create_year_modal_message"),
        () => {
          context.onCreateYear(e);
        }
      );
    },
  });

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="fixed top-0 left-0 z-30 flex justify-center w-screen h-screen bg-black bg-opacity-60">
          <div className="bg-white mt-0 tablet:mt-[48px] py-[24px] px-[32px] h-full overflow-y-auto tablet:overflow-y-visible tablet:h-max w-[480px] space-y-[48px]">
            <p className="title">
              {t("about_page_student_union_create_year_modal_title")}
            </p>
            <Dropdown
              onChange={(e) => formik.setFieldValue("union_year", Number(e))}
              options={_.filter(
                context.aroundYearOptions,
                (option) =>
                  !_.find(
                    context.yearOptions,
                    (yearOption) => yearOption.name === option.name
                  )
              )}
              value={formik.values.union_year.toString()}
              error={formik.errors.union_year}
              hide-error-text
              placeholder={t(
                "about_page_student_union_year_dropdown_placeholder"
              )}
            />
            <div className="flex justify-center w-full space-x-[8px]">
              <Button
                onClick={() => {
                  context.isCreateYearModalOpen = false;
                }}
                title={t("about_page_cancel_button")}
                heightCss="h-[40px]"
                widthCss="tablet:w-[132px] w-[122px]"
              />
              <Button
                onClick={() => formik.submitForm()}
                title={t("about_page_create_button")}
                heightCss="h-[40px]"
                widthCss="tablet:w-[132px] w-[122px]"
              />
            </div>
          </div>
        </div>
      )}
    </Observer>
  );
};
