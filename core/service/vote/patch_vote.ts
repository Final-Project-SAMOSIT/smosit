import getConfig from "next/config";
import { appAxios } from "../../libs/axios";

const { publicRuntimeConfig } = getConfig();

export const patchUnion = (year: number) => {
  return appAxios().patch(
    `${publicRuntimeConfig.BACKEND_API}/updateUnionYear/${year}`
  );
};
