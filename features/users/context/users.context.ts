import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { ModalContextClass } from "../../../core/context/modal.context";
import { meProps, Role } from "../../../core/types/auth_types";
import { getRoleList, getUserList } from "../../../core/service/users/getUser";
import { AxiosResponse } from "axios";
import _ from "lodash";
import { patchUserRole } from "../../../core/service/users/patchUser";
import { Router } from "next/router";

class UsersContextInstance {
  modal?: ModalContextClass;

  isLoading: boolean = false;
  userList: Array<meProps> = [];
  roleList: Array<{ role_id: string; role_name: Role }> = [];

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  async userPreparation() {
    try {
      this.isLoading = true;
      const resp: AxiosResponse<{ data: Array<meProps> }> = await getUserList();
      if (resp.status !== 204) {
        this.userList = resp.data.data;
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูลผู้ใช้งาน", err.message);
    } finally {
      this.isLoading = false;
    }
  }

  async rolePreparation() {
    try {
      const resp: AxiosResponse<{
        data: Array<{ role_id: string; role_name: Role }>;
      }> = await getRoleList();
      if (resp.status !== 204) {
        this.roleList = resp.data.data;
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        "มีปัญหาในการเตรียมข้อมูลสิทธิ์ผู้ใช้งาน",
        err.message
      );
    }
  }

  async onChangeUserRole(userId: string, roleId: string) {
    try {
      await patchUserRole(userId, { role_id: roleId });
      this.userPreparation();
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        "มีปัญหาในการเปลี่ยนแปลงสิทธิ์ผู้ใช้งาน",
        err.message
      );
    }
  }

  get RoleOptionList() {
    return _.map(this.roleList, (role) => ({
      name: role.role_name,
      value: role.role_id,
    }));
  }
}
export const UsersContext = createContext(new UsersContextInstance());
