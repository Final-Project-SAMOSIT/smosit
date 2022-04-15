import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class LoginContext {
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  submit() {}
}
export const loginContext = createContext(new LoginContext());
