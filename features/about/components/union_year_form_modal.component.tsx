import React, { useContext, useEffect, useRef, useState } from "react";
import { Observer } from "mobx-react-lite";
import { MainLayout } from "../../../core/components/layout/main_layout";
import _ from "lodash";
import { ModalContext } from "../../../core/context/modal.context";
import { aboutContext } from "../contexts/about.context";
import { Dropdown } from "../../../core/components/input/dropdown_input";
import { string } from "yup";
import { useFormik } from "formik";
import { unionYearInit, unionYearValidation } from "../form/union_year.form";
import { Button } from "../../../core/components/input/button.component";

export const UnionYearFormModal = () => {
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
        "Create year",
        "Are you sure you want to create year?",
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
            <p className="title">Create Student Union</p>
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
              placeholder="Select Year"
            />
            <div className="flex justify-center w-full space-x-[8px]">
              <Button
                onClick={() => {
                  context.isCreateYearModalOpen = false;
                }}
                title="cancel"
                heightCss="h-[40px]"
                widthCss="tablet:w-[132px] w-[122px]"
              />
              <Button
                onClick={() => formik.submitForm()}
                title="create"
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
