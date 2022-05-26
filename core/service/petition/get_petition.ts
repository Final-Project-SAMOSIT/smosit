import getConfig from "next/config";
import { appAxios } from "../../libs/axios";

const { publicRuntimeConfig } = getConfig();

export const getPetitionType = () => {
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/getPetType`);
};

export const getPetition = (id: string) => {
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/getPetition/${id}`);
};

export const getAllPetition = () => {
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/getPetition`);
};
