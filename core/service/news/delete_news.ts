import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
const { publicRuntimeConfig } = getConfig();

export const deleteNews = (id: string | number) => {
  return appAxios().delete(`${publicRuntimeConfig.BACKEND_API}/deleteNews/${id}`);
};
