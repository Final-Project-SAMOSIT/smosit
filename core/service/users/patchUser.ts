import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
const { publicRuntimeConfig } = getConfig();

export const patchUserRole = (id: string | number, body: any) => {
  return appAxios().patch(
    `${publicRuntimeConfig.BACKEND_API}/updateUser/${id}`,
    body
  );
};
