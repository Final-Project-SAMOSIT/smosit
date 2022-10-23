import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { ModalContextClass } from "../../../core/context/modal.context";
import { proposalInitvalue } from "../form/document_proposal.form";

class DocumentProposalFormContext {
  modal?: ModalContextClass;

  isEdit: boolean = false;
  isPrinting: boolean = false;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  async onCreate(value: typeof proposalInitvalue) {
    try {
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการสร้างเอกสาร", err.message);
    }
  }

  async FormPreparation(
    id: string,
    setInitValue: (value: typeof proposalInitvalue) => void
  ) {
    try {
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        "มีปัญหาในการเตรียทข้อมูลข้อมูลเอกสาร",
        err.message
      );
    }
  }
  async onUpdate(
    value: typeof proposalInitvalue,
    form_id: string,
    project_id: string
  ) {
    try {
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการแก้ไขข้อมูล", err.message);
    }
  }

  onPrint() {
    this.isPrinting = true;
  }
}
export const documentProposalFormContext = createContext(
  new DocumentProposalFormContext()
);
