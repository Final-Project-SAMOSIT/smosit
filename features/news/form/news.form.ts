import { EditorState } from "draft-js";
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
  news_title: yup.string().required("กรุณากรอกข้อมูล"),
  news_details_text: yup.string().required("กรุณากรอกข้อมูล"),
  news_caption_img: yup.string(),
  union_year: yup.number().required("กรุณากรอกข้อมูล"),
  news_type_id: yup.string().required("กรุณากรอกข้อมูล"),
});
