import getConfig from "next/config";
import { appAxios } from "../../libs/axios";

const { publicRuntimeConfig } = getConfig();

export const deletePetition = (id: string) => {
  return appAxios().delete(
    `${publicRuntimeConfig.BACKEND_API}/deletePet/${id}`
  );
};
