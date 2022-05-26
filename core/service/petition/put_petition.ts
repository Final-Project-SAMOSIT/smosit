import getConfig from "next/config";
import { appAxios } from "../../libs/axios";

const { publicRuntimeConfig } = getConfig();

export const updatePetition = (id: string, body: any) => {
  return appAxios().put(
    `${publicRuntimeConfig.BACKEND_API}/editStatusPet/${id}`,
    body
  );
};
