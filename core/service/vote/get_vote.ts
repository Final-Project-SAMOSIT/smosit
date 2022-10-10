import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
import queryString from "query-string";

const { publicRuntimeConfig } = getConfig();

export const getAllUnionYearVote = () => {
  return appAxios().get(
    `${publicRuntimeConfig.BACKEND_API}/getAllUnionYearVote`
  );
};

export const getVotingDetail = (options: { year: number }) => {
  const qs = queryString.stringify(options);
  return appAxios().get(`${publicRuntimeConfig.BACKEND_API}/getVoting?${qs}`);
};

export const getAllVoteCount = (options: { year: number }) => {
  const qs = queryString.stringify(options);
  return appAxios().get(
    `${publicRuntimeConfig.BACKEND_API}/getAllResult?${qs}`
  );
};

export const getVoteCount = (options: { year: number }) => {
  const qs = queryString.stringify(options);
  return appAxios().get(
    `${publicRuntimeConfig.BACKEND_API}/getSumVoteResult?${qs}`
  );
};

export const getUserVote = (options: { year: number }) => {
  const qs = queryString.stringify(options);
  return appAxios().get(
    `${publicRuntimeConfig.BACKEND_API}/getUserVoteResult?${qs}`
  );
};
