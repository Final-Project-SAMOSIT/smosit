import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { User } from "../types/user";
import { ModalContextClass } from "../../../core/context/modal.context";
import {
  getStudentUnion,
  getYears,
} from "../../../core/service/about/get_about";
import { AxiosResponse } from "axios";
import _ from "lodash";

class AboutContext {
  studentList: Array<User>;
  yearList: Array<number>;
  year: number;
  modal?: ModalContextClass;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.studentList = [];
    this.yearList = [];
    this.year = new Date().getFullYear();
    makeAutoObservable(this);
  }

  async preparationStudentUnion() {
    try {
      const resp: AxiosResponse<{ data: Array<User> }> = await getStudentUnion({
        union_year: this.year,
      });
      if (resp.status !== 204) {
        this.studentList = [];
        this.studentList = resp.data.data;
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูล", err.message);
    }
  }

  async preparationYear() {
    try {
      const resp: AxiosResponse<{ data: Array<{ union_year: number }> }> =
        await getYears();
      if (resp.status !== 204) {
        this.yearList = [];
        this.yearList = _.map(resp.data.data, (year) => year.union_year);
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูล", err.message);
    }
  }
}
export const aboutContext = createContext(new AboutContext());
