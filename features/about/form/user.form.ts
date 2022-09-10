import { i18n } from "next-i18next";
import * as Yup from "yup";

export const userInitValue = {
  std_id: "",
  std_fname_th: "",
  std_lname_th: "",
  std_fname_en: "",
  std_lname_en: "",
  std_img: "",
  position_id: "",
  position_name: "",
};

export const userValidateSchema = Yup.object().shape({
  std_id: Yup.string()
    .length(
      11,
      i18n?.language === "th"
        ? "กรุณากรอกข้อมูลให้ถูกต้อง"
        : "Please fill in the correct form"
    )
    .required(
      i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
    ),
  std_fname_th: Yup.string().required(
    i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
  ),
  std_lname_th: Yup.string().required(
    i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
  ),
  std_fname_en: Yup.string().required(
    i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
  ),
  std_lname_en: Yup.string().required(
    i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
  ),
  std_img: Yup.string().required(
    i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
  ),
  position_id: Yup.string().required(
    i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
  ),
});
