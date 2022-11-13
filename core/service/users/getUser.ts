import getConfig from "next/config";
import { appAxios } from "../../libs/axios";

const { publicRuntimeConfig } = getConfig();

export const getUserList = () => {
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/getUsers`);
};

export const getRoleList = () => {
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/allRole`);
};
