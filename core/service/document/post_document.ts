import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
const { publicRuntimeConfig } = getConfig();

export const postDocument = (body: any) => {
  return appAxios().post(
    `${publicRuntimeConfig.BACKEND_API}/createProjectApproved`,
    body
  );
};

export const postProposal = (body: any) => {
  return appAxios().post(
    `${publicRuntimeConfig.BACKEND_API}/createRequestApproved`,
    body
  );
};
