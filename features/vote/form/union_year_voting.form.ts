import * as Yup from "yup";

export const unionYearVotingInitValue = {
  open_date: "",
  end_date: "",
  union_year: new Date().getFullYear(),
};
export const unionYearVotingValidate = Yup.object().shape({
  open_date: Yup.string().required("กรุณากรอกข้อมูล"),
  end_date: Yup.string().required("กรุณากรอกข้อมูล"),
  union_year: Yup.number(),
});
