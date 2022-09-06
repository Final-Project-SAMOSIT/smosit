import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { ModalContextClass } from "../../../core/context/modal.context";
import { News } from "../../../core/types/news";
import { getNews, getNewsList } from "../../../core/service/news/get_news";
import { AxiosResponse } from "axios";
import { Router } from "next/router";
import { deleteNews } from "../../../core/service/news/delete_news";

class NewsDetailContext {
  news?: News;
  isLoading: boolean;
  newsList: Array<News>;

  modal?: ModalContextClass;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.isLoading = false;
    this.newsList = [];
    makeAutoObservable(this);
  }

  async newsPreparation(id: number | string) {
    try {
      this.isLoading = true;
      const resp: AxiosResponse<{ data: News }> = await getNews(id);
      this.news = resp.data.data;
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข่าว", err.message);
    } finally {
      this.isLoading = false;
    }
  }

  async newsSuggestionPreparation() {
    try {
      const resp: AxiosResponse<{ data: Array<News> }> = await getNewsList();
      if (resp.status !== 204) {
        this.newsList = resp.data.data;
      }
    } catch (err: any) {
      this.modal?.openModal("มีปัญหาในการเตรียมข่าว", err.message);
    }
  }

  async onDelete(id: string | number) {
    try {
      await deleteNews(id);
      Router.prototype.push("/news");
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการลบข่าว", err.message);
    }
  }
}
export const newsDetailContext = createContext(new NewsDetailContext());
