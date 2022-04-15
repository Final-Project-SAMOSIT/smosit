import { createContext } from "react";
import { makeAutoObservable } from "mobx";

class LoginContext {
  username: string;
  password: string;
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.username = "";
    this.password = "";
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
}
export const loginContext = createContext(new LoginContext());
