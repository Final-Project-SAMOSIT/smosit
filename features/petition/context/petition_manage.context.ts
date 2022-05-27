import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import {
  getAllPetition,
  getPetition,
} from "../../../core/service/petition/get_petition";
import { Petition, PetitionStatus } from "../types/petetion_type";
import { updatePetition } from "../../../core/service/petition/put_petition";
import { deletePetition } from "../../../core/service/petition/delete_petition";
import { ModalContextClass } from "../../../core/context/modal.context";

class PetitionManageContext {
  petitionList: Array<Petition>;

  modal: ModalContextClass | null;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.petitionList = [];
    this.modal = null;
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  async preparation() {
    try {
      const resp = await getAllPetition();
      if (resp.status !== 204) {
        this.petitionList = resp.data.data;
      } else {
        this.petitionList = [];
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปีญหาในการเตรียมข้อมูล", err.message);
    }
  }

  async onStatusChange(status: PetitionStatus, id: string) {
    try {
      await updatePetition(id, { status: status });
      await this.preparation();
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปีญหาในการแก้ไขข้อมูล", err.message);
    }
  }

  async onDelete(id: string) {
    try {
      await deletePetition(id);
      await this.preparation();
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปีญหาในการลบข้อมูล", err.message);
    }
  }
}
export const petitionManageContext = createContext(new PetitionManageContext());
