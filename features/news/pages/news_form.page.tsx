import React, { useContext, useEffect, useRef } from "react";
import { Observer } from "mobx-react-lite";
import { MainLayout } from "../../../core/components/layout/main_layout";
import _, { filter } from "lodash";
import { ModalContext } from "../../../core/context/modal.context";
import { TextInput } from "../../../core/components/input/text_input.component";
import { useFormik } from "formik";
import { newsFormInitValue, newsFormValidate } from "../form/news.form";
import RichText from "../../../core/components/input/rich_text";
import classNames from "classnames";
import { Dropdown } from "../../../core/components/input/dropdown_input";
import { Button } from "../../../core/components/input/button.component";
import { AuthContext } from "../../../core/context/auth.context";
import { useRouter } from "next/router";
import { newsFormContext } from "../contexts/news_form.context";

export const NewsFormPage = () => {
  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(newsFormContext);
  const modalContext = useContext(ModalContext);
  const authContext = useContext(AuthContext);

  //---------------------
  //   REF
  //---------------------
  const fileInputRef = useRef<HTMLInputElement>(null);

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   FORMIK
  //---------------------
  const formik = useFormik({
    initialValues: newsFormInitValue,
    validationSchema: newsFormValidate,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: (e) => {
      context.onCreate(e);
    },
  });

  //---------------------
  //   HANDLED
  //---------------------
  function onDeleteImage() {
    formik.setFieldValue("news_img", "");
  }

  function isYearDisabled(): boolean {
    const filteredType = _.filter(context.newsTypeList, (type) =>
      _.includes(type.news_type_name, "Experience")
    );

    const index = _.findIndex(
      filteredType,
      (type) => type.news_type_id === formik.values.news_type_id
    );

    return index === -1;
  }

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    if (!authContext.isPermission(["Publisher"])) {
      router.push("/401");
    } else {
      context.modal = modalContext;
      context.preparation();
    }
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="flex flex-col tablet:mt-[64px] mt-[32px] laptop:mt-[112px] tablet:mb-[64px] mb-[32px] laptop:mb-[96px]">
            <p className="title w-[350px] border-b border-black">Create post</p>
            <div className="heading2 mt-[96px]">
              <TextInput
                placeholder="Title"
                height={72}
                error={formik.errors.news_title}
                onChange={(e) =>
                  formik.setFieldValue("news_title", e.target.value)
                }
                value={formik.values.news_title}
                withoutBorder
              />
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target?.files) {
                  context.onUploadImage(e.target?.files[0], (url) => {
                    formik.setFieldValue("news_img", url);
                  });
                }
              }}
              ref={fileInputRef}
            />
            {formik.values.news_img ? (
              <div className="w-full aspect-[3/1] relative">
                <img
                  src={formik.values.news_img}
                  className="w-full aspect-[3/1] object-contain bg-black mb-[18px]"
                  alt=""
                />
                <i
                  className="absolute bottom-[28px] text-[14px] right-[14px] fas fa-trash-alt text-gray-50 bg-white py-[9px] px-[11px] rounded-[8px] cursor-pointer"
                  onClick={onDeleteImage}
                />
              </div>
            ) : (
              <div
                className="w-full aspect-[3/1] rounded-[10px] border border-dashed border-dark-50 flex flex-col items-center justify-center space-y-[48px] mt-[36px] cursor-pointer"
                onClick={() => fileInputRef?.current?.click()}
              >
                <i className="fa-solid fa-file-image text-gray-40 text-[72px]" />
                <p className="caption2 select-none">Support: jpg, png</p>
              </div>
            )}

            <div className="text-center caption2 mt-[32px] mx-auto w-[220px]">
              <TextInput
                placeholder="Type caption for image(optional)"
                height={24}
                withoutBorder
              />
            </div>
            <div
              className={classNames("mt-[56px]", {
                "text-gray-40": !formik.values.news_details_text,
                "text-black": formik.values.news_details_text,
              })}
            >
              <RichText
                onChange={(e) => {
                  formik.setFieldValue("news_details", e);
                  formik.setFieldValue(
                    "news_details_text",
                    e.getCurrentContent().getPlainText()
                  );
                }}
                value={formik.values.news_details}
                placeholder="Type Detail"
                heightCss="h-[160px]"
                error={formik.errors.news_details_text}
              />
            </div>

            <div className="w-full flex justify-between space-x-[16px] mb-[36px]">
              <Dropdown
                onChange={(e) => {
                  formik.setFieldValue("news_type_id", e);
                }}
                options={_.map(context.newsTypeList, (type) => ({
                  name: type.news_type_name,
                  value: type.news_type_id,
                }))}
                value={formik.values.news_type_id}
                error={formik.errors.news_type_id}
                placeholder="Select type"
                topic="Type"
              />
              <Dropdown
                onChange={(e) => {
                  formik.setFieldValue("union_year", Number(e));
                }}
                options={_.map(
                  _.range(
                    new Date().getFullYear() - 5,
                    new Date().getFullYear() + 5
                  ),
                  (year) => ({
                    name: year.toString(),
                    value: year.toString(),
                  })
                )}
                value={
                  formik.values.union_year === 9999
                    ? ""
                    : formik.values.union_year.toString()
                }
                error={formik.errors.union_year}
                placeholder="Select year"
                topic="year"
                disabled={isYearDisabled()}
              />
            </div>
            <div className="w-full flex justify-center">
              <Button
                onClick={() => formik.submitForm()}
                title="publish"
                heightCss="w-[137px] h-[52px]"
              ></Button>
            </div>
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
