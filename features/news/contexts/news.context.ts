import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";
import { getNewsList } from "../../../core/service/news/get_news";
import { ModalContextClass } from "../../../core/context/modal.context";
import { News } from "../../../core/types/news";
import { TFunction } from "next-i18next";

class NewsContext {
  currentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 6;
  newsList: Array<News> = [];
  isLoading: boolean = false;
  modal?: ModalContextClass;

  t: TFunction = (t: string) => t;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  async newsPreparation() {
    try {
      this.isLoading = true;
      const resp: AxiosResponse<{ data: Array<News>; allItem: number }> =
        await getNewsList({
          skip: (this.currentPage - 1) * this.perPage,
          take: this.perPage,
        });
      if (resp.status !== 204) {
        this.newsList = resp.data.data;
        this.totalPage = Math.ceil(resp.data.allItem / this.perPage);
      }
    } catch (err: any) {
      this.modal?.openModal(this.t("modal_news_page_news_list_preparation_fail"), err.message);F
    } finally {
      this.isLoading = false;
    }
  }
}
export const newsContext = createContext(new NewsContext());
