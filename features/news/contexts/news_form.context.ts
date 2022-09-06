import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";
import { getNewsList, getNewsType } from "../../../core/service/news/get_news";
import { ModalContextClass } from "../../../core/context/modal.context";
import { News } from "../../../core/types/news";
import { newsFormInitValue } from "../form/news.form";
import { postNews, postUploadFile } from "../../../core/service/news/post_news";
import { NewsType } from "../types/newsType";
import { convertToRaw } from "draft-js";
import { Router } from "next/router";

class NewsFormContext {
  modal?: ModalContextClass;
  newsTypeList: Array<NewsType> = [];

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  async preparation() {
    try {
      const resp: AxiosResponse<{ data: Array<NewsType> }> =
        await getNewsType();

      this.newsTypeList = resp.data.data;
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูลประเภทโพสต์", err.message);
    }
  }

  async onUploadImage(file: File, onUploaded: (url: string) => void) {
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const resp: AxiosResponse<{ data: string }> = await postUploadFile(
        formData
      );
      onUploaded(resp.data.data);
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการอัพโหลดรูปภาพ", err.message);
    }
  }

  async onCreate(value: typeof newsFormInitValue) {
    try {
      const body = {
        ...value,
        news_details: JSON.stringify(
          convertToRaw(value.news_details.getCurrentContent())
        ),
      };

      const resp: AxiosResponse<{ data: News }> = await postNews(body);

      const typeName = this.newsTypeList.find(
        (type) => type.news_type_id === resp.data.data.news_type_id
      )?.news_type_name;

      if (typeName === "News") {
        Router.prototype.push(`/news/${resp.data.data.news_id}`);
      } else if (typeName === "Experience") {
        Router.prototype.push(`/about/${resp.data.data.news_id}`);
      } else {
        Router.prototype.back();
      }
    } catch (err: any) {
      this.modal?.openModal("มีปัญหาในการสร้าง", err.message);
    }
  }
}
export const newsFormContext = createContext(new NewsFormContext());
