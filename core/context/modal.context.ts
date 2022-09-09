import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export class ModalContextClass {
  isModalOpen: boolean;
  title: string;
  message: string;
  onOk?: (() => void) | null = null;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.isModalOpen = false;
    this.title = "";
    this.message = "";
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  openModal(title: string, message: string, onOk?: () => void) {
    this.isModalOpen = true;
    this.title = title;
    this.message = message;
    this.onOk = onOk || null;
  }
}
export const ModalContext = createContext(new ModalContextClass());
