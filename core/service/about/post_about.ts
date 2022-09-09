import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
const { publicRuntimeConfig } = getConfig();

export const postStudent = (body: any) => {
  return appAxios().post(
    `${publicRuntimeConfig.BACKEND_API}/createStudentUnionInfo`,
    body
  );
};

export const postStudentUnion = (body: any) => {
  return appAxios().post(
    `${publicRuntimeConfig.BACKEND_API}/createStudentUnion`,
    body
  );
};

export const postUnionYear = (body: any) => {
  return appAxios().post(
    `${publicRuntimeConfig.BACKEND_API}/createUnionYear`,
    body
  );
};
