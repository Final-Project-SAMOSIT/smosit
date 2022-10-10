import getConfig from "next/config";
import { appAxios } from "../../libs/axios";

const { publicRuntimeConfig } = getConfig();

export const deleteUnionYear = (year: number) => {
  return appAxios().delete(
    `${publicRuntimeConfig.BACKEND_API}/deleteUnionYear/${year}`
  );
};
