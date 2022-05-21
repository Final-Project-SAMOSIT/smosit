import { i18n } from "next-i18next";
import * as Yup from "yup";

export const petitionFormInit = {
  pet_topic: "",
  pet_details: "",
  type_id: "",
  status_id: "1",
};

export const petitionValidate = Yup.object().shape({
  pet_topic: Yup.string().required(
    i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
  ),
  pet_details: Yup.string().required(
    i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
  ),
  type_id: Yup.string().required(
    i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
  ),
  status_id: Yup.string(),
});
