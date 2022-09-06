import getConfig from "next/config";
import { appAxios, appAxiosMulipart } from "../../libs/axios";
const { publicRuntimeConfig } = getConfig();

export const postUploadFile = (formData: FormData) => {
  return appAxiosMulipart().post(
    `${publicRuntimeConfig.BACKEND_API}/uploadFile`,
    formData
  );
};

export const postNews = (body: any) => {
  return appAxios().post(`${publicRuntimeConfig.BACKEND_API}/addNews`, body);
};
