import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { ModalContextClass } from "../../../core/context/modal.context";
import { documentInitvalue } from "../form/document_document.form";
import { postDocument } from "../../../core/service/document/post_document";
import dayjs from "dayjs";

class DocumentDocumentFormContext {
  modal?: ModalContextClass;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  async onCreate(value: typeof documentInitvalue) {
    try {
      await postDocument({
        form_info: {
          form_no: value.form_info.form_no || " ",
          institution: value.form_info.institution || " ",
          solution: value.form_info.solution || " ",
          contact: value.form_info.contact || " ",
          tel: value.form_info.tel || " ",
          form_type: "document",
        },
        project_name: value.project_name || " ",
        club_name: value.club_name || " ",
        start_date: dayjs(value.start_date).format("YYYY-MM-DDT00:00:00.000Z"),
        end_date: dayjs(value.end_date).format("YYYY-MM-DDT00:00:00.000Z"),
        location: value.location || " ",
        project_purpose: value.project_purpose || " ",
        about_project: value.about_project || " ",
        cost: Number(value.cost),
        cost_des_th: value.cost_des_th || " ",
      });
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการสร้างเอกสาร", err.message);
    }
  }
}
export const documentDocumentFormContext = createContext(
  new DocumentDocumentFormContext()
);
