import { i18n } from "next-i18next";
import * as Yup from "yup";

export const unionYearInit = {
  union_year: "",
};

export const unionYearValidation = Yup.object().shape({
  union_year: Yup.number().required(
    i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
  ),
});
