import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import {
  getPetition,
  getPetitionType,
} from "../../../core/service/petition/get_petition";
import _ from "lodash";
import { postPetition } from "../../../core/service/petition/post_petition";
import { FormikProps } from "formik";
import { Petition } from "../types/petetion_type";

class PetitionContext {
  topic: string;
  type: string | string[];
  detail: string;

  petitionType: Array<{ name: string; value: any; disabled?: boolean }>;
  petitionList: Array<Petition>;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.topic = "";
    this.type = "";
    this.petitionType = [];
    this.detail = "";
    this.petitionList = [];
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  async preparationForm() {
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

  async preparationPetition() {
    try {
      const resp = await getPetition();
      this.petitionList = resp.data.data;
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
        this.preparationPetition();
      }
    } catch (err: any) {
      console.log(err);
      alert(`${err.message} \n มีปัญหาในการส่งข้อมูล`);
    }
  }
}
export const petitionContext = createContext(new PetitionContext());
