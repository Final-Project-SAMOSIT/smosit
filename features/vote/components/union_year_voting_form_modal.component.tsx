import React, { useContext } from "react";
import { useTranslation } from "next-i18next";
import { Observer } from "mobx-react-lite";
import { Dropdown } from "../../../core/components/input/dropdown_input";
import { Button } from "../../../core/components/input/button.component";
import { voteContext } from "../context/vote.context";
import { TextInput } from "../../../core/components/input/text_input.component";
import { useFormik } from "formik";
import {
  unionYearVotingInitValue,
  unionYearVotingValidate,
} from "../form/union_year_voting.form";
import _ from "lodash";
import { Calendar } from "../../../core/components/input/calendar.component";
import dayjs from "dayjs";

export const UnionYearVotingFormSection = () => {
  //---------------------
  //   I18n
  //---------------------
  const { t, i18n } = useTranslation();

  //---------------------
  //   FORMIK
  //---------------------
  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
    initialValues: unionYearVotingInitValue,
    validationSchema: unionYearVotingValidate,
    onSubmit: (value) => {
      context.onCreateVote(value, () => {
        context.isCreateYearModalOpen = false;
      });
    },
  });

  //---------------------
  //   CONTEXT
  //---------------------
  const context = useContext(voteContext);

  //---------------------
  //   RENDER
  //---------------------
  return (
    <Observer>
      {() => (
        <div className="space-y-[48px]">
          <div className="my-[24px]">
            <Dropdown
              onChange={(e) => formik.setFieldValue("union_year", Number(e))}
              options={context.creatableYearOptions}
              value={formik.values.union_year.toString()}
              placeholder="Please select year"
              disabled
            />
          </div>
          <div className="h-[52px] flex space-x-[48px] mb-[56px]">
            <div className="flex items-center">
              <p className="button mr-[8px]">Start:</p>
              <div className="mr-[16px]">
                <TextInput
                  height={40}
                  width={124}
                  value={formik.values.open_date}
                  onChange={(e) => {
                    if (e.target.value.length > 10) return;

                    let formattedDate = _.replace(e.target.value, /\D|\//g, "");
                    if (formattedDate.length >= 2) {
                      const date = formattedDate.slice(0, 2);

                      formattedDate = `${
                        Number(date) > 31 ? 31 : date
                      }/${formattedDate.slice(2)}`;
                    }

                    if (formattedDate.length >= 5) {
                      const month = Number(formattedDate.slice(3, 5));
                      formattedDate = `${formattedDate.slice(0, 2)}/${
                        month > 12 ? 12 : month
                      }/${formattedDate.slice(5)}`;
                    }

                    formik.setFieldValue("open_date", formattedDate);
                  }}
                />
              </div>
              <Calendar
                onChange={(date) =>
                  formik.setFieldValue(
                    "open_date",
                    dayjs(date).format("DD/MM/YYYY")
                  )
                }
                value={dayjs(formik.values.open_date, "DD/MM/YYYY").toDate()}
              />
            </div>
            <div className="flex items-center">
              <p className="button mr-[8px]">End:</p>
              <div className="mr-[16px]">
                <TextInput
                  height={40}
                  width={124}
                  value={formik.values.end_date}
                  onChange={(e) => {
                    if (e.target.value.length > 10) return;

                    let formattedDate = _.replace(e.target.value, /\D|\//g, "");
                    if (formattedDate.length >= 2) {
                      const date = formattedDate.slice(0, 2);

                      formattedDate = `${
                        Number(date) > 31 ? 31 : date
                      }/${formattedDate.slice(2)}`;
                    }

                    if (formattedDate.length >= 5) {
                      const month = Number(formattedDate.slice(3, 5));
                      formattedDate = `${formattedDate.slice(0, 2)}/${
                        month > 12 ? 12 : month
                      }/${formattedDate.slice(5)}`;
                    }

                    formik.setFieldValue("end_date", formattedDate);
                  }}
                />
              </div>
              <Calendar
                onChange={(date) =>
                  formik.setFieldValue(
                    "end_date",
                    dayjs(date).format("DD/MM/YYYY")
                  )
                }
                value={dayjs(formik.values.end_date, "DD/MM/YYYY").toDate()}
              />
            </div>
          </div>
          <div className="flex justify-center space-x-[12px]">
            <Button
              onClick={() => formik.submitForm()}
              title="Create"
              widthCss="w-[137px]"
              heightCss="h-[52px]"
            ></Button>
          </div>
        </div>
      )}
    </Observer>
  );
};
