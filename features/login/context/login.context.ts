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
  submit() {
    console.log("username");
    console.log("password");
  }
}
export const loginContext = createContext(new LoginContext());
