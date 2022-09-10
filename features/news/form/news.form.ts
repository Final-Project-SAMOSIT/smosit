import { EditorState } from "draft-js";
import { i18n } from "next-i18next";
import * as yup from "yup";

export const newsFormInitValue = {
  news_title: "",
  news_details: EditorState.createEmpty(),
  news_details_text: "",
  news_img: "",
  news_caption_img: "",
  union_year: 9999,
  news_type_id: "",
};

export const newsFormValidate = yup.object().shape({
  news_title: yup
    .string()
    .required(
      i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
    ),
  news_details_text: yup
    .string()
    .required(
      i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
    ),
  news_img: yup
    .string()
    .required(
      i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
    ),
  news_caption_img: yup.string(),
  union_year: yup
    .number()
    .required(
      i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
    ),
  news_type_id: yup
    .string()
    .required(
      i18n?.language === "th" ? "กรุณากรอกข้อมูล" : "This field is required"
    ),
});
