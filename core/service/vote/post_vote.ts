import getConfig from "next/config";
import { appAxios } from "../../libs/axios";
import querystring from "query-string";
import { Vote } from "../../../features/vote/types/vote.types";

const { publicRuntimeConfig } = getConfig();

export const postCreateVote = (
  year: number,
  body: { open_date: string; end_date: string; union_year: number }
) => {
  const qs = querystring.stringify({ year });
  return appAxios().post(
    `${publicRuntimeConfig.BACKEND_API}/createVoting?${qs}`,
    body
  );
};

export const postVote = (body: { vote_result: Vote }) => {
  return appAxios().post(
    `${publicRuntimeConfig.BACKEND_API}/createVoteResult`,
    body
  );
};
