import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";
import { getNewsList } from "../../../core/service/news/get_news";
import { ModalContextClass } from "../../../core/context/modal.context";
import { News } from "../../../core/types/news";

class NewsContext {
  currentPage: number;
  totalPage: number;
  newsList: Array<News>;
  modal?: ModalContextClass;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.currentPage = 1;
    this.totalPage = 9;
    this.newsList = [];
    makeAutoObservable(this);
  }

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
export const newsContext = createContext(new NewsContext());
