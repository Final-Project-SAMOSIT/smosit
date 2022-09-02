import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
import querystring from "query-string";
const { publicRuntimeConfig } = getConfig();

export const getStudentUnion = (options: { union_year: number }) => {
  const qs = querystring.stringify(options);
  return appAxios().get(
    `${publicRuntimeConfig.BACKEND_API}/getStudentUnion?${qs}`
  );
};

export const getYears = () => {
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/getAllUnionYear`);
};

export const getExperiences = (options: { union_year: number }) => {
  const qs = querystring.stringify(options);
  return appAxios().get(
    `${publicRuntimeConfig.BACKEND_API}/getExperiences?${qs}`
  );
};

export const getExperience = (id: string | number) => {
  return appAxios().get(
    `${publicRuntimeConfig.BACKEND_API}/getExperiences/${id}`
  );
};
