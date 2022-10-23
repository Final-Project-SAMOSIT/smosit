import * as Yup from "yup";

export const documentInitvalue = {
  form_info: {
    form_no: "",
    institution: "",
    solution: "",
    contact: "",
    tel: "",
    form_type: "",
  },
  project_name: "",
  club_name: "",
  start_date: new Date(),
  end_date: new Date(),
  location: "",
  project_purpose: "",
  about_project: "",
  cost: 0,
  cost_des_th: "",
};

export const documentValidationSchema = Yup.object().shape({});
