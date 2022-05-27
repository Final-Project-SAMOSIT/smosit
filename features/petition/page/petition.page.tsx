import React, { useContext, useEffect, useRef, useState } from "react";
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
import classNames from "classnames";
import _ from "lodash";

export const PetitionPage = () => {
  //---------------------
  //   STATE
  //---------------------
  const [filterType, setFilterType] = useState("Pending");

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(petitionContext);
  const authContext = useContext(AuthContext);

  //---------------------
  //   REF
  //---------------------
  const petitionListRef = useRef<HTMLDivElement>(null);

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
      window.scrollTo({
        top: petitionListRef?.current?.offsetTop,
      });
    },
  });

  //---------------------
  //   ROUTER
  //---------------------
  const router = useRouter();

  //---------------------
  //   HANDLED
  //---------------------
  function getShowPetition() {
    return _.filter(context.petitionList, (petition) =>
      filterType === "Completed"
        ? petition.status.status_name === "Done"
        : petition.status.status_name !== "Done"
    );
  }

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
              <div className="laptop:w-1/2 w-full pb-[53px] pt-[42px] flex flex-col justify-between laptop:space-y-0 space-y-[32px]">
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
              <div className="hidden w-1/2 laptop:block">
                <img src="/images/petition_graphic.svg" className="" />
              </div>
            </div>

            <div className="w-full bg-gray-10 laptop:mt-[83px] mt-0 pt-[24px] pb-[24px] laptop:px-[93px] px-[24px] flex flex-col space-y-[16px]">
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

              <div className="laptop:w-[512px] w-full">
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
                  widthCss="laptop:w-[137px] w-[86px]"
                  heightCss="laptop:h-[52px] h-[36px]"
                  custom="bg-gray-10 hover:bg-black hover:text-white rounded-[10px] border border-black"
                />
              </div>
            </div>

            <div className="laptop:mt-[170px] mt-[48px] flex flex-col items-center w-full space-y-[70px]">
              <p className="title pb-[15px] border-b border-black px-[12px]">
                Status
              </p>
              <div className="flex flex-col laptop:w-[360px] w-[300px] justify-center space-y-[16px]">
                <div className="flex w-full">
                  <div
                    className="flex justify-center w-1/2 cursor-pointer select-none"
                    onClick={() => setFilterType("Pending")}
                  >
                    <p className="heading6">pending</p>
                  </div>
                  <div
                    className="flex justify-center w-1/2 cursor-pointer select-none"
                    onClick={() => setFilterType("Completed")}
                  >
                    <p className="heading6">completed</p>
                  </div>
                </div>
                <div className="laptop:w-[360px] w-[300px] h-[2px] bg-gray-20">
                  <div
                    className={classNames(
                      "w-1/2 h-full bg-gray-50 transition-all duration-200",
                      {
                        "ml-[150px] laptop:ml-[180px]":
                          filterType === "Completed",
                      }
                    )}
                  />
                </div>
              </div>
              <div ref={petitionListRef}>
                <PetitionTable data={getShowPetition()} />
              </div>
            </div>
          </div>
        </MainLayout>
      )}
    </Observer>
  );
};
