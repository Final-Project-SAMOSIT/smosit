import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { ModalContextClass } from "../../../core/context/modal.context";
import { getNewsList } from "../../../core/service/news/get_news";
import { AxiosResponse } from "axios";
import { News } from "../types/news";

class HomeContext {
  newsList: Array<News>;
  isNewsLoading: boolean;
  modal?: ModalContextClass;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.newsList = [];
    this.isNewsLoading = false;

    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  async newsPreparation() {
    try {
      const resp: AxiosResponse<{ data: Array<News> }> = await getNewsList();
      if (resp.status !== 204) {
        this.newsList = resp.data.data;
      }
    } catch (err: any) {
      this.modal?.openModal("มีปัญหาในการเตรียมข่าว", err.message);
    }
  }
}
export const homeContext = createContext(new HomeContext());
