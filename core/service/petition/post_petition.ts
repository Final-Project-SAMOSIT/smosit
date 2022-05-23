import getConfig from "next/config";
import { appAxios } from "../../libs/axios";

const { publicRuntimeConfig } = getConfig();

export const postPetition = (body: any) => {
  return appAxios().post(
    `${publicRuntimeConfig.BACKEND_API}/addPetition`,
    body
  );
};
