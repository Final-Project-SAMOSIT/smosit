import getConfig from "next/config";
import axios from "axios";
const { publicRuntimeConfig } = getConfig();

export const postAuth = (code: string | string[]) => {
  return axios.post(`${publicRuntimeConfig.BACKEND_API}/auth`, {
    code,
  });
};
