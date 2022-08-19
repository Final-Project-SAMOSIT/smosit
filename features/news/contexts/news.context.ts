import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { News } from "../types/news.type";

class NewsContext {
  currentPage: number;
  totalPage: number;
  news: Array<News>;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.currentPage = 1;
    this.totalPage = 9;
    this.news = [];
    makeAutoObservable(this);
  }
}
export const newsContext = createContext(new NewsContext());
