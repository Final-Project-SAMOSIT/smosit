import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { ModalContextClass } from "../../../core/context/modal.context";
import { documentInitvalue } from "../form/document_document.form";
import { postDocument } from "../../../core/service/document/post_document";
import dayjs from "dayjs";
import { Router } from "next/router";
import { getDocument } from "../../../core/service/document/get_document";
import { AxiosResponse } from "axios";
import { patchDocument } from "../../../core/service/document/patch_document";

class DocumentDocumentFormContext {
  modal?: ModalContextClass;

  isEdit: boolean = false;
  isPrinting: boolean = false;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  async onCreate(value: typeof documentInitvalue) {
    try {
      const resp = await postDocument({
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

      if (resp.status === 200) {
        Router.prototype.push(`document/document/${resp.data.data.project_id}`);
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการสร้างเอกสาร", err.message);
    }
  }

  async FormPreparation(
    id: string,
    setInitValue: (value: typeof documentInitvalue) => void
  ) {
    try {
      const resp: AxiosResponse<{ data: typeof documentInitvalue }> =
        await getDocument(id);

      setInitValue({
        ...resp.data.data,
        form_info: {
          ...resp.data.data.form_info,
          tel: (resp.data.data.form_info as any).Tel,
        },
      });
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมเอกสาร", err.message);
    }
  }

  async onUpdate(
    value: typeof documentInitvalue,
    form_id: string,
    project_id: string
  ) {
    try {
      const resp = await patchDocument(
        {
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
          start_date: dayjs(value.start_date).format(
            "YYYY-MM-DDT00:00:00.000Z"
          ),
          end_date: dayjs(value.end_date).format("YYYY-MM-DDT00:00:00.000Z"),
          location: value.location || " ",
          project_purpose: value.project_purpose || " ",
          about_project: value.about_project || " ",
          cost: Number(value.cost),
          cost_des_th: value.cost_des_th || " ",
        },
        form_id,
        project_id
      );
      console.log(resp.data);
      if (resp.status === 200) {
        Router.prototype.push(`document/document/${form_id}/${project_id}`);
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการแก้ไขเอกสาร", err.message);
    }
  }

  onPrint() {
    this.isPrinting = true;
  }
}
export const documentDocumentFormContext = createContext(
  new DocumentDocumentFormContext()
);
