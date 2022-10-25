import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
const { publicRuntimeConfig } = getConfig();

export const deleteDocument = (id: string) => {
  return appAxios().delete(
    `${publicRuntimeConfig.BACKEND_API}/deleteForm/${id}`
  );
};
