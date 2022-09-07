import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
const { publicRuntimeConfig } = getConfig();

export const deleteStudentUnion = (id: string) => {
  return appAxios().delete(
    `${publicRuntimeConfig.BACKEND_API}/deleteStudentUnion/${id}`
  );
};
