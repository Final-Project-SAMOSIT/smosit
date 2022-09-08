import * as Yup from "yup";

export const unionYearInit = {
  union_year: '',
};

export const unionYearValidation = Yup.object().shape({
  union_year: Yup.number().required("กรุณากรอกปีการศึกษา"),
});
