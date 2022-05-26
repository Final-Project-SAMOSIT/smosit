import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import {
  getAllPetition,
  getPetition,
} from "../../../core/service/petition/get_petition";
import { Petition, PetitionStatus } from "../types/petetion_type";
import { updatePetition } from "../../../core/service/petition/put_petition";
import { deletePetition } from "../../../core/service/petition/delete_petition";

class PetitionManageContext {
  petitionList: Array<Petition>;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.petitionList = [];
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
      alert(`${err.message} \n มีปีญหาในการเตรียมข้อมูล`);
    }
  }

  async onStatusChange(status: PetitionStatus, id: string) {
    try {
      await updatePetition(id, { status: status });
      await this.preparation();
    } catch (err: any) {
      console.log(err);
      alert(`${err.message} \n มีปีญหาในการแก้ไขข้อมูล`);
    }
  }

  async onDelete(id: string) {
    try {
      await deletePetition(id);
      await this.preparation();
    } catch (err: any) {
      console.log(err);
      alert(`${err.message} \n มีปีญหาในการลบข้อมูล`);
    }
  }
}
export const petitionManageContext = createContext(new PetitionManageContext());
