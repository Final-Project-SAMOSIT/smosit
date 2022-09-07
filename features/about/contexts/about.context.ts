import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { Experience, Position, User } from "../types/user";
import { ModalContextClass } from "../../../core/context/modal.context";
import {
  getExperiences,
  getStudentUnion,
  getYears,
} from "../../../core/service/about/get_about";
import { AxiosResponse } from "axios";
import _ from "lodash";

class AboutContext {
  studentList: Array<User> = [];
  yearList: Array<number> = [];
  experienceList: Array<Experience> = [];
  isFetchingExperience: boolean = false;
  isOutofContent: boolean = false;
  year: number = new Date().getFullYear();
  isStudentLoading: boolean = false;
  modal?: ModalContextClass;
  positionPoint: Map<Position, number>;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.positionPoint = new Map<Position, number>();
    this.positionPoint.set("President", 1);
    this.positionPoint.set("Vice President", 2);
    this.positionPoint.set("Secretary", 3);
    this.positionPoint.set("Board", 4);
    makeAutoObservable(this);
  }

  async preparationStudentUnion() {
    try {
      this.isStudentLoading = true;
      const resp: AxiosResponse<{ data: Array<User> }> = await getStudentUnion({
        union_year: this.year,
      });
      if (resp.status !== 204) {
        this.studentList = [];
        this.studentList = resp.data.data.sort(
          (a, b) =>
            (this.positionPoint.get(a.std_position.position_name) || 9999) -
            (this.positionPoint.get(b.std_position.position_name) || 0)
        );
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูลสมาชิก", err.message);
    } finally {
      this.isStudentLoading = false;
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
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูลปี", err.message);
    }
  }

  async preparationExperience() {
    try {
      this.isFetchingExperience = true;
      const resp: AxiosResponse<{ data: Array<Experience> }> =
        await getExperiences({
          union_year: this.year,
          take: 3,
          skip: _.size(this.experienceList),
        });
      if (resp.status !== 204) {
        this.experienceList = [...this.experienceList, ...resp.data.data];
        this.experienceList = _.uniqBy(this.experienceList, "news_id");
        if (_.size(resp.data.data) === 0) {
          this.isOutofContent = true;
        }
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูลประสบการณ์", err.message);
    } finally {
      this.isFetchingExperience = false;
    }
  }
}
export const aboutContext = createContext(new AboutContext());
