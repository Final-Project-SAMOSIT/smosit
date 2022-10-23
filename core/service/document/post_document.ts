import getConfig from "next/config";
import { documentInitvalue } from "../../../features/document/form/document_document.form";
import { appAxios } from "../../libs/axios";
const { publicRuntimeConfig } = getConfig();

export const postDocument = (body: any) => {
  return appAxios().post(
    `${publicRuntimeConfig.BACKEND_API}/createProjectApproved`,
    body
  );
};
