import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";
import {
  getNews,
  getNewsList,
  getNewsType,
} from "../../../core/service/news/get_news";
import { ModalContextClass } from "../../../core/context/modal.context";
import { News } from "../../../core/types/news";
import { newsFormInitValue } from "../form/news.form";
import { postNews, postUploadFile } from "../../../core/service/news/post_news";
import { NewsType } from "../types/newsType";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Router } from "next/router";
import { FormikProps } from "formik";
import { patchNews } from "../../../core/service/news/patch_news";
import { getExperience } from "../../../core/service/about/get_about";
import { TFunction } from "next-i18next";

class NewsFormContext {
  modal?: ModalContextClass;
  newsTypeList: Array<NewsType> = [];
  isEdit: boolean = false;
  t: TFunction = (t: string) => t;

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
      this.modal?.openModal(
        this.t("modal_news_form_type_preparation_fail"),
        err.message
      );
    }
  }

  async preparationForm(
    id: string | number,
    formik: FormikProps<typeof newsFormInitValue>,
    asExperience?: boolean
  ) {
    try {
      let resp: AxiosResponse<{ data: News }>;
      if (asExperience) {
        resp = await getExperience(id);
      } else {
        resp = await getNews(id);
      }

      const editor = EditorState.createWithContent(
        convertFromRaw(JSON.parse(resp.data.data.news_details))
      );
      formik.setFieldValue("news_caption_img", resp.data.data.news_caption_img);
      formik.setFieldValue("news_details", editor);
      formik.setFieldValue(
        "news_details_text",
        editor.getCurrentContent().getPlainText()
      );
      formik.setFieldValue("news_img", resp.data.data.news_img);
      formik.setFieldValue("news_title", resp.data.data.news_title);
      formik.setFieldValue("news_type_id", resp.data.data.news_type_id);
      formik.setFieldValue("union_year", resp.data.data.union_year);
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        this.t("modal_news_form_form_preparation_fail"),
        err.message
      );
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
      this.modal?.openModal(this.t("modal_news_form_upload_fail"), err.message);
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
      this.modal?.openModal(
        this.t("modal_news_form_creating_fail"),
        err.message
      );
    }
  }

  async onUpdate(id: string | number, value: typeof newsFormInitValue) {
    try {
      const { news_details_text, ...otherVal } = value;

      const body = {
        ...otherVal,
        news_details: JSON.stringify(
          convertToRaw(value.news_details.getCurrentContent())
        ),
      };

      const resp: AxiosResponse<{ data: News }> = await patchNews(id, body);

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
      this.modal?.openModal(
        this.t("modal_news_form_editing_fail"),
        err.message
      );
    }
  }
}
export const newsFormContext = createContext(new NewsFormContext());
