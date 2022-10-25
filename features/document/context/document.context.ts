import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { ModalContextClass } from "../../../core/context/modal.context";
import { getDocumentList } from "../../../core/service/document/get_document";
import { AxiosResponse } from "axios";
import { Document } from "../types/document.type";
import { deleteDocument } from "../../../core/service/document/delete_document";

class DocumentContextClass {
  modal?: ModalContextClass;

  documentList: Array<Document> = [];

  currentPage: number = 1;
  totalPage: number = 1;
  perPage: number = 6;

  isLoading: boolean = false;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  async documentPreparation(userId: string | string[]) {
    try {
      this.isLoading = true;
      const resp: AxiosResponse<{ data: Array<Document> }> =
        await getDocumentList({
          user_id: userId.toString(),
          skip: (this.currentPage - 1) * this.perPage,
          take: this.perPage,
        });

      if (resp.status !== 204) {
        this.documentList = resp.data.data;
      } else {
        this.documentList = [];
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูลเอกสาร", err.message);
    } finally {
      this.isLoading = false;
    }
  }

  async onDelete(id: string, userId: string) {
    try {
      await deleteDocument(id);
      this.documentPreparation(userId);
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการลบเอกสาร", err.message);
    }
  }
}
export const documentContext = createContext(new DocumentContextClass());
