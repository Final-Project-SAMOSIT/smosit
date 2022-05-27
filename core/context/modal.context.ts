import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class ModalContextClass {
  isModalOpen: boolean;
  title: string;
  message: string;
  onOk: () => void;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.isModalOpen = false;
    this.title = "";
    this.message = "";
    this.onOk = () => null;
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  openModal(title: string, message: string, onOk: () => void) {
    this.isModalOpen = true;
    this.title = title;
    this.message = message;
    this.onOk = onOk;
  }
}
export const ModalContext = createContext(new ModalContextClass());
