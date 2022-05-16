import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { Router } from "next/router";
import Cookies from "js-cookie";

class AuthContextClass {
  mockIsLogin: boolean;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.mockIsLogin = false;
    console.log("asd");
    makeAutoObservable(this);
  }

  me() {
    const token = Cookies.get("mockToken");
    if (token) {
      this.mockIsLogin = true;
    } else {
      this.mockIsLogin = false;
    }
  }

  login() {
    Router.prototype.push("/");
    Cookies.set("mockToken", "true", { expires: 1 / 1440 });
  }

  logout() {
    Cookies.remove("mockToken");
    this.me();
  }
}
export const AuthContext = createContext(new AuthContextClass());
