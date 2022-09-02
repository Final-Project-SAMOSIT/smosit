import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";
import { getNewsList } from "../../../core/service/news/get_news";
import { ModalContextClass } from "../../../core/context/modal.context";
import { News } from "../../../core/types/news";

class NewsContext {
  currentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 6;
  newsList: Array<News> = [];
  modal?: ModalContextClass;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  async newsPreparation() {
    try {
      const resp: AxiosResponse<{ data: Array<News>; allItem: number }> =
        await getNewsList({
          skip: this.currentPage - 1,
          take: this.perPage,
        });
      if (resp.status !== 204) {
        this.newsList = resp.data.data;
        this.totalPage = Math.ceil(resp.data.allItem / this.perPage);
      }
    } catch (err: any) {
      this.modal?.openModal("มีปัญหาในการเตรียมข่าว", err.message);
    }
  }
}
export const newsContext = createContext(new NewsContext());
