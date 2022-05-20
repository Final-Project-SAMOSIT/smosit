import axios from "axios";
import Cookies from "js-cookie";

export const appAxios = () => {
  const token = Cookies.get("SMOSIT_TOKEN");
  return axios.create({
    timeout: 30000,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
