import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { Experience } from "../types/user";
import { ModalContextClass } from "../../../core/context/modal.context";
import {
  getExperience,
  getExperiences,
} from "../../../core/service/about/get_about";
import { AxiosResponse } from "axios";
import _ from "lodash";
import { deleteNews } from "../../../core/service/news/delete_news";
import { Router } from "next/router";

class ExperienceDetailContext {
  experience?: Experience;
  isLoading: boolean = false;
  experienceList: Array<Experience> = [];

  modal?: ModalContextClass;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  async preparation(id: string | number) {
    try {
      this.isLoading = true;
      const resp: AxiosResponse<{ data: Experience }> = await getExperience(id);
      if (resp.status !== 204) {
        this.experience = resp.data.data;
      }

      this.preparationExperienceList();
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูลประสบการณ์", err.message);
    } finally {
      this.isLoading = false;
    }
  }

  async preparationExperienceList() {
    try {
      this.isLoading = true;
      const resp: AxiosResponse<{ data: Array<Experience> }> =
        await getExperiences({
          union_year: Number(this.experience?.union_year),
        });
      if (resp.status !== 204) {
        this.experienceList = resp.data.data;
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูลประสบการณ์", err.message);
    } finally {
      this.isLoading = false;
    }
  }

  async onDelete(id: string | number) {
    try {
      await deleteNews(id);
      Router.prototype.push("/about");
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการลบข่าว", err.message);
    }
  }
}
export const experienceDetailContext = createContext(
  new ExperienceDetailContext()
);
