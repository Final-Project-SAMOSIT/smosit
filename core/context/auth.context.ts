import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { Router } from "next/router";
import Cookies from "js-cookie";
import { getMe } from "../service/auth/get_auth";
import { postAuth } from "../service/auth/post_auth";

class AuthContextClass {
  mockIsLogin: boolean;

  me: any;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.mockIsLogin = false;
    this.me = null;
    makeAutoObservable(this);
  }

  async Me() {
    try {
      const token = Cookies.get("SMOSIT_TOKEN");
      if (token) {
        const resp = await getMe();
        if (resp.status === 200) {
          this.me = resp.data.userDetail;
          console.log("success");
        } else {
          this.me = null;
        }
      }
    } catch (err: any) {
      console.log(err);
    }
  }

  async getUser(code: string | string[]) {
    try {
      const resp: any = await postAuth(code);

      if (resp.status === 200) {
        Cookies.set("SMOSIT_TOKEN", resp.data?.data?.token?.token);
        Router.prototype.push("/");
      } else {
        Router.prototype.push("/403");
      }
    } catch (err: any) {
      console.log(err);
      alert(`${err.message} \n มีปัญหาในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง`);
      Router.prototype.push("/403");
    }
  }

  logout() {
    Cookies.remove("SMOSIT_TOKEN");
    this.me = null;
    this.Me();
  }
}
export const AuthContext = createContext(new AuthContextClass());
