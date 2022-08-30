import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
import querystring from "query-string";
const { publicRuntimeConfig } = getConfig();

export const getNewsList = (options?: {
  take?: number | string;
  skip?: number | string;
}) => {
  const qs = querystring.stringify(options || {});
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/getNews?${qs}`);
};

export const getNews = (id: string | number) => {
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/getNews/${id}`);
};
