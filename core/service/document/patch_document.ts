import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
const { publicRuntimeConfig } = getConfig();

export const patchDocument = (
  body: any,
  form_id: string,
  project_id: string
) => {
  return appAxios().patch(
    `${publicRuntimeConfig.BACKEND_API}/updateProjectApproved/${form_id}/${project_id}`,
    body
  );
};
