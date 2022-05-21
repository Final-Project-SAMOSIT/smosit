import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { getPetitionType } from "../../../core/service/petition/get_petition";
import _ from "lodash";
import { postPetition } from "../../../core/service/petition/post_petition";
import { FormikProps } from "formik";

class PetitionContext {
  topic: string;
  type: string | string[];
  detail: string;

  petitionType: Array<{ name: string; value: any; disabled?: boolean }>;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.topic = "";
    this.type = "";
    this.petitionType = [];
    this.detail = "";
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  async preparation() {
    try {
      const resp = await getPetitionType();
      if (resp.status === 200) {
        this.petitionType = _.map(resp.data.data, (type) => ({
          name: type.pet_type_name,
          value: type.pet_type_id,
        }));
      } else {
        this.petitionType = [];
      }
    } catch (err: any) {
      console.log(err);
      alert(`${err.message} \n มีปัญหาในการเตรียมข้อมูล`);
    }
  }

  async onCreate(value: any, formik: FormikProps<any>) {
    try {
      const resp = await postPetition(value);
      if (resp.status === 200) {
        formik.resetForm();
      }
    } catch (err: any) {
      console.log(err);
      alert(`${err.message} \n มีปัญหาในการส่งข้อมูล`);
    }
  }
}
export const petitionContext = createContext(new PetitionContext());
