import axios from "axios";
import Cookies from "js-cookie";

export const defaultAppAxiosConfigs = () => {
  const token = Cookies.get("SMOSIT_TOKEN");

  return {
    timeout: 30000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const appAxios = () => {
  const token = Cookies.get("SMOSIT_TOKEN");
  return axios.create(defaultAppAxiosConfigs());
};

export const appAxiosMulipart = () => {
  const token = Cookies.get("SMOSIT_TOKEN");
  return axios.create({
    ...defaultAppAxiosConfigs(),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "multipart/form-data",
    },
  });
};
