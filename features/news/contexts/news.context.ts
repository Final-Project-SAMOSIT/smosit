import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { News } from "../types/News.type";

class NewsContext {
  currentPage: number;
  totalPage: number;
  news: Array<News>;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.currentPage = 1;
    this.totalPage = 1;
    this.news = [];
    makeAutoObservable(this);
  }
}
export const newsContext = createContext(new NewsContext());
