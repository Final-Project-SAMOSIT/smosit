import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";
import { postUploadFile } from "../../../core/service/news/post_news";
import { ModalContextClass } from "../../../core/context/modal.context";
import { postStudent } from "../../../core/service/about/post_about";
import { userInitValue } from "../form/user.form";
import { getStudent } from "../../../core/service/about/get_about";
import { UserInfo } from "../types/user";
import {
  patchStudent,
  patchStudentUnion,
} from "../../../core/service/about/patch_about";
import { TFunction } from "next-i18next";

class UserFormContext {
  modal?: ModalContextClass;
  t: TFunction = (t: string) => t;

  isEdit: boolean = false;
  isLoading: boolean = false;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
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
      this.modal?.openModal(this.t("modal_user_form_upload_fail"), err.message);
    }
  }

  async onCreate(value: typeof userInitValue) {
    try {
      await postStudent(value);
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(this.t("modal_user_form_upload_fail"), err.message);
    }
  }

  async prepareUser(id: string, onPrepared: (user: UserInfo) => void) {
    try {
      this.isLoading = true;
      const resp: AxiosResponse<{ data: UserInfo }> = await getStudent(id);
      if (resp.status !== 204) {
        this.isEdit = true;
        onPrepared(resp.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }

  async onUpdate(
    value: typeof userInitValue,
    userInfo?: { userId: string; unionId: string; unionYear: number }
  ) {
    try {
      await patchStudent(value, value.std_id);
      if (userInfo?.unionId) {
        await patchStudentUnion(
          {
            std_id: value.std_id,
            position_id: value.position_id,
            union_year: userInfo.unionYear,
          },
          userInfo.unionId
        );
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(this.t("modal_user_form_upload_fail"), err.message);
    }
  }
}
export const userFormContext = createContext(new UserFormContext());
