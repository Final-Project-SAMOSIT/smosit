import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
const { publicRuntimeConfig } = getConfig();

export const patchStudent = (body: any, id: string) => {
  return appAxios().patch(
    `${publicRuntimeConfig.BACKEND_API}/editStudentUnionInfo/${id}`,
    body
  );
};

export const patchStudentUnion = (body: any, id: string) => {
  return appAxios().patch(
    `${publicRuntimeConfig.BACKEND_API}/editStudentUnion/${id}`,
    body
  );
};
