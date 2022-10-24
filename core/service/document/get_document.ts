import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
import querystring from "query-string";
const { publicRuntimeConfig } = getConfig();

export const getDocumentList = (options?: {
  take?: number | string;
  skip?: number | string;
  user_id?: string;
}) => {
  const qs = querystring.stringify(options || {});
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/allDocument?${qs}`);
};

export const getDocument = (id: string) => {
  return appAxios().get(
    `${publicRuntimeConfig.BACKEND_API}/getProjectApproved/${id}`
  );
};

export const getSubActivityType = () => {
  return appAxios().get(
    `${publicRuntimeConfig.BACKEND_API}/getSubActivityTypes`
  );
};

export const getActivityType = () => {
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/getActivityTypes`);
};
