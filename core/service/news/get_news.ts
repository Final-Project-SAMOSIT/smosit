import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
const { publicRuntimeConfig } = getConfig();

export const getNewsList = () => {
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/getNews`);
};
