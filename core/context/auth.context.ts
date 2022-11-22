import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { Router } from "next/router";
import Cookies from "js-cookie";
import { getMe } from "../service/auth/get_auth";
import { postAuth } from "../service/auth/post_auth";
import { meProps, Role } from "../types/auth_types";
import _ from "lodash";
import { ModalContextClass } from "./modal.context";

class AuthContextClass {
  mockIsLogin: boolean;
  modal: ModalContextClass | null;
  t: any;

  me: meProps | null;

  isLoading: boolean;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.mockIsLogin = false;
    this.me = null;
    this.isLoading = true;
    this.modal = null;
    makeAutoObservable(this);
  }

  async Me() {
    try {
      this.isLoading = true;
      const token = Cookies.get("SMOSIT_TOKEN");
      if (token) {
        const resp = await getMe();
        if (resp.status === 200) {
          this.me = resp.data.userDetail;
        } else {
          this.me = null;
        }
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }

  async getUser(code: string | string[]) {
    try {
      const resp: any = await postAuth(code);

      if (resp.status === 200) {
        Cookies.set("SMOSIT_TOKEN", resp.data?.data?.token?.token, {
          expires: 3,
        });
        Router.prototype.push("/en");
      } else {
        Router.prototype.push("/en/403");
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        this.t("modal_login_error_title"),
        err.message,
        () => Router.prototype.push("/en/403")
      );
    }
  }

  logout() {
    Cookies.remove("SMOSIT_TOKEN");
    Router.prototype.push("/en");
  }

  isPermission(roles: Array<Role>): boolean {
    return _.includes(roles, this.me?.roles?.role_name);
  }
}
export const AuthContext = createContext(new AuthContextClass());
