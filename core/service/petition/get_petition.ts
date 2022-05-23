import getConfig from "next/config";
import { appAxios } from "../../libs/axios";

const { publicRuntimeConfig } = getConfig();

export const getPetitionType = () => {
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/getPetType`);
};

export const getPetition = () => {
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/getPetition`);
};
