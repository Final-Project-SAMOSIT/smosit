import * as Yup from "yup";

export const userInitValue = {
  std_id: "",
  std_fname_th: "",
  std_lname_th: "",
  std_fname_en: "",
  std_lname_en: "",
  std_img: "",
  position_id: "",
  position_name: ""
};

export const userValidateSchema = Yup.object().shape({
  std_id: Yup.string()
    .length(11, "กรุณากรอกข้อมูลให้ถูกต้อง")
    .required("กรุณากรอกข้อมูล"),
  std_fname_th: Yup.string().required("กรุณากรอกข้อมูล"),
  std_lname_th: Yup.string().required("กรุณากรอกข้อมูล"),
  std_fname_en: Yup.string().required("กรุณากรอกข้อมูล"),
  std_lname_en: Yup.string().required("กรุณากรอกข้อมูล"),
  std_img: Yup.string().required("กรุณากรอกข้อมูล"),
  position_id: Yup.string().required("กรุณากรอกข้อมูล"),
});
