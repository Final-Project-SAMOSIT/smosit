import React, { Fragment, useContext, useEffect, useRef } from "react";
import { Observer } from "mobx-react-lite";
import { TextInput } from "../../../core/components/input/text_input.component";
import { useFormik } from "formik";
import { userInitValue, userValidateSchema } from "../form/user.form";
import _ from "lodash";
import { userFormContext } from "../contexts/user_form.context";
import { ModalContext } from "../../../core/context/modal.context";
import { Dropdown } from "../../../core/components/input/dropdown_input";
import { positionMap, UserInfo } from "../types/user";
import { useTranslation } from "next-i18next";
import { Button } from "../../../core/components/input/button.component";
import classNames from "classnames";
import Loading from "../../../core/components/utility/loading";

interface UserFormModalProps {
  userInfo?: { userId: string; unionId: string; unionYear: number };
  positionOptions: Array<{ name: string; value: string }>;
  onClose: () => void;
  onSave: (value: typeof userInitValue) => void;
  onRefetch: () => void;
}

export const UserFormModal = (props: UserFormModalProps) => {
  //---------------------
  //   i18n
  //---------------------
  const { i18n } = useTranslation("news");

  //---------------------
  //   FORMIK
  //---------------------
  const formik = useFormik({
    initialValues: userInitValue,
    validationSchema: userValidateSchema,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    onSubmit: async (e) => {
      modal.openModal(
        `${context.isEdit ? "Edit" : "Create"} user`,
        `Are you sure to ${context.isEdit ? "Edit" : "Create"} user`,
        async () => {
          if (context.isEdit) {
            await context.onUpdate(e, props.userInfo);
            props.onRefetch();
          } else {
            await context.onCreate(e);
          }

          if (!props.userInfo?.unionId) {
            props.onSave(e);
          }
          props.onClose();
        }
      );
    },
  });

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(userFormContext);
  const modal = useContext(ModalContext);

  //---------------------
  //   REF
  //---------------------
  const fileInputRef = useRef<HTMLInputElement>(null);

  //---------------------
  //   HANDLED
  //---------------------
  function onSetFormik(value: UserInfo) {
    formik.setFieldValue("std_fname_en", value.std_fname_en);
    formik.setFieldValue("std_fname_th", value.std_fname_th);
    formik.setFieldValue("std_id", value.std_id);
    formik.setFieldValue("std_img", value.std_img);
    formik.setFieldValue("std_lname_en", value.std_lname_en);
    formik.setFieldValue("std_lname_th", value.std_lname_th);
    formik.setFieldValue("position_id", "");
  }

  useEffect(() => {
    context.modal = modal;
    if (props.userInfo) {
      context.prepareUser(props.userInfo.userId, onSetFormik);
    }
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="fixed top-0 left-0 z-30 flex justify-center w-screen h-screen bg-black bg-opacity-60">
          <div className="bg-white mt-0 tablet:mt-[24px] py-[24px] px-[32px] h-full overflow-y-auto tablet:overflow-y-visible tablet:h-max w-[480px] flex flex-col items-center space-y-[12px]">
            <p className="title">
              {context.isEdit ? "Edit" : "Create"} Information
            </p>
            <TextInput
              placeholder="Student ID"
              value={formik.values.std_id}
              height={40}
              onChange={(e) => {
                formik.setFieldValue("std_id", e.target.value);
                context.isEdit = false;
                if (e.target.value.length === 11) {
                  context.prepareUser(e.target.value, onSetFormik);
                }
              }}
              error={formik.errors.std_id}
              disabled={props.userInfo?.userId ? true : false}
              hide-error-text
              type="number"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target?.files) {
                  context.onUploadImage(e.target?.files[0], (url) => {
                    formik.setFieldValue("std_img", url);
                  });
                }
              }}
              ref={fileInputRef}
            />
            {context.isLoading ? (
              <Loading text="text-4xl" />
            ) : (
              <Fragment>
                {formik.values.std_img ? (
                  <img
                    src={formik.values.std_img}
                    className="my-[8px] w-[121px] aspect-square rounded-full object-cover"
                    onClick={() => {
                      fileInputRef?.current?.click();
                    }}
                  />
                ) : (
                  <div
                    className={classNames(
                      "my-[8px] flex w-[121px] aspect-square rounded-full border border-dashed justify-center items-center cursor-pointer",
                      {
                        "border-gray-40": !formik.errors.std_img,
                        "border-error": formik.errors.std_img,
                      }
                    )}
                    onClick={() => fileInputRef?.current?.click()}
                  >
                    <i className="fas fa-file-image text-[64px] text-gray-40" />
                  </div>
                )}
                <div className="flex space-x-[12px]">
                  <TextInput
                    placeholder="ชื่อจริง"
                    value={formik.values.std_fname_th}
                    height={40}
                    onChange={(e) => {
                      formik.setFieldValue("std_fname_th", e.target.value);
                    }}
                    error={formik.errors.std_fname_th}
                    hide-error-text
                  />
                  <TextInput
                    placeholder="นามสกุล"
                    value={formik.values.std_lname_th}
                    height={40}
                    onChange={(e) => {
                      formik.setFieldValue("std_lname_th", e.target.value);
                    }}
                    error={formik.errors.std_lname_th}
                    hide-error-text
                  />
                </div>
                <div className="flex space-x-[12px]">
                  <TextInput
                    placeholder="Firstname"
                    value={formik.values.std_fname_en}
                    height={40}
                    onChange={(e) => {
                      formik.setFieldValue("std_fname_en", e.target.value);
                    }}
                    error={formik.errors.std_fname_en}
                    hide-error-text
                  />
                  <TextInput
                    placeholder="Lastname"
                    value={formik.values.std_lname_en}
                    height={40}
                    onChange={(e) => {
                      formik.setFieldValue("std_lname_en", e.target.value);
                    }}
                    error={formik.errors.std_lname_en}
                    hide-error-text
                  />
                </div>
                <Dropdown
                  options={_.map(props.positionOptions, (option) => ({
                    value: option.value,
                    name: _.get(
                      positionMap,
                      `${_.replace(option.name, / /g, "")}.${i18n.language}`
                    ),
                  }))}
                  value={formik.values.position_id}
                  onChange={(e) => {
                    formik.setFieldValue("position_id", e);
                    formik.setFieldValue(
                      "position_name",
                      _.find(
                        props.positionOptions,
                        (option) => option.value === e
                      )?.name
                    );
                  }}
                  error={formik.errors.position_id}
                  hide-error-text
                  placeholder="Position"
                />
                <div className="flex justify-between space-x-[8px]">
                  <Button
                    onClick={props.onClose}
                    title="cancel"
                    heightCss="h-[40px]"
                    widthCss="tablet:w-[132px] w-[122px]"
                  />
                  <Button
                    onClick={() => formik.submitForm()}
                    title={context.isEdit ? "save" : "create"}
                    heightCss="h-[40px]"
                    widthCss="tablet:w-[132px] w-[122px]"
                  />
                </div>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Observer>
  );
};
