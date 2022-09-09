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
  t: any;

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
          name: type.petition_type_name,
          value: type.petition_type_id,
        }));
      } else {
        this.petitionType = [];
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        this.t("petition_modal_error_data_preparation"),
        err.message
      );
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
      this.modal?.openModal(
        this.t("petition_modal_error_data_preparation"),
        err.message
      );
    }
  }

  async onCreate(value: any, callback: () => void, id: string) {
    try {
      const resp = await postPetition({
        ...value,
        petition_type_id: value.type_id,
      });
      if (resp.status === 200) {
        callback();
        this.preparationPetition(id);
      }
    } catch (err: any) {
      console.log(err);

      if (err.response.status === 403) {
        this.modal?.openModal(
          this.t("petition_modal_error_petition_limit"),
          err.message
        );
      } else {
        this.modal?.openModal(
          this.t("petition_modal_error_petition_create"),
          err.message
        );
      }
    }
  }
}
export const petitionContext = createContext(new PetitionContext());
