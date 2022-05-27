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
import { ModalContextClass } from "../../../core/context/modal.context";

class PetitionContext {
  topic: string;
  type: string | string[];
  detail: string;

  petitionType: Array<{ name: string; value: any; disabled?: boolean }>;
  petitionList: Array<Petition>;

  modal: ModalContextClass | null;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.topic = "";
    this.type = "";
    this.petitionType = [];
    this.detail = "";
    this.petitionList = [];
    this.modal = null;
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
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูล", err.message);
    }
  }

  async preparationPetition(id: string) {
    try {
      const resp = await getPetition(id);
      if (resp.status !== 204) {
        this.petitionList = resp.data.data;
      } else {
        this.petitionList = [];
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูล", err.message);
    }
  }

  async onCreate(value: any, callback: () => void, id: string) {
    try {
      const resp = await postPetition(value);
      if (resp.status === 200) {
        callback();
        this.preparationPetition(id);
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(`มีปัญหาในการส่งข้อมูล`, err.message);
    }
  }
}
export const petitionContext = createContext(new PetitionContext());
