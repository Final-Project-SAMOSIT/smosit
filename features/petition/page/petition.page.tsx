import React, { useContext, useEffect } from "react";
import { Observer } from "mobx-react-lite";
import { MainLayout } from "../../../core/components/layout/main_layout";
import { Button } from "../../../core/components/input/button.component";
import { Dropdown } from "../../../core/components/input/dropdown_input";
import { petitionContext } from "../context/petition.context";
import { TextArea } from "../../../core/components/input/text_area_input.component";
import { TextInput } from "../../../core/components/input/text_input.component";
import { useFormik } from "formik";
import { petitionFormInit, petitionValidate } from "../form/petition.form";
import { PetitionTable } from "../component/petition_table";
import { AuthContext } from "../../../core/context/auth.context";
import { useRouter } from "next/router";

export const PetitionPage = () => {
  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(petitionContext);
  const authContext = useContext(AuthContext);

  //---------------------
  //   FORMIK
  //---------------------
  const formik = useFormik({
    initialValues: petitionFormInit,
    validationSchema: petitionValidate,
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
    onSubmit: (value) => {
      context.onCreate(value, formik, authContext.me?.user_id || "");
    },
  });

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   EFFECT
  //---------------------
  useEffect(() => {
    if (!authContext.isPermission(["Users"])) {
      router.push("/401");
    } else {
      context.preparationForm();
      context.preparationPetition(authContext.me?.user_id || "");
    }
  }, []);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <MainLayout>
          <div className="pt-[32px] pb-[210px] flex flex-col">
            <div className="flex justify-between space-x-[48px] ">
              <div className="w-1/2 pb-[53px] pt-[42px] flex flex-col justify-between">
                <p className="border border-black rounded-full pt-[6px] pb-[5px] px-[17px] w-max button select-none">
                  Request Petition
                </p>
                <p className="heading1">What is Request Petition</p>
                <p className="body">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  tortor quam nunc, sit ullamcorper consequat risus. Lorem est
                  varius aliquet gravida habitasse aliquet amet a. Nisi porta id
                  sit maecenas. Eros morbi blandit accumsan adipiscing diam
                  cursus sed.
                </p>
              </div>
              <div className="w-1/2">
                <img src="/images/petition_graphic.svg" className="" />
              </div>
            </div>

            <div className="w-full bg-gray-10 mt-[83px] pt-[24px] pb-[24px] px-[93px] flex flex-col space-y-[16px]">
              <div className="flex justify-center w-full">
                <p className="pb-[8px] px-[24.5px] border-b border-black title">
                  Form for petition
                </p>
              </div>

              <div className="space-y-[12px] w-full">
                <p className="heading6">Topic</p>
                <TextInput
                  onChange={(e) => {
                    formik.setFieldValue("pet_topic", e.target.value);
                  }}
                  value={formik.values.pet_topic}
                  error={formik.errors.pet_topic}
                  height={40}
                />
              </div>

              <div className="w-[512px]">
                <Dropdown
                  onChange={(e) => formik.setFieldValue("type_id", e)}
                  options={context.petitionType}
                  value={formik.values.type_id}
                  topic="Type"
                  error={formik.errors.type_id}
                />
              </div>

              <div className="w-full">
                <TextArea
                  onChange={(e) =>
                    formik.setFieldValue("pet_details", e.target.value)
                  }
                  value={formik.values.pet_details}
                  title="detail"
                  height={160}
                  limitText={500}
                  error={formik.errors.pet_details}
                  showLimit
                />
              </div>
              <div className="flex justify-center w-full">
                <Button
                  onClick={() => formik.submitForm()}
                  title="submit"
                  width={137}
                  height={52}
                  custom="bg-gray-10 hover:bg-black hover:text-white rounded-[10px] border border-black"
                />
              </div>
            </div>

            <div className="mt-[170px]">
              <PetitionTable data={context.petitionList || []} />
            </div>
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
