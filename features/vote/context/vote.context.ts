import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { Position, User } from "../../about/types/user";
import { Axios, AxiosResponse } from "axios";
import {
  getPosition,
  getStudentUnion,
  getYears,
} from "../../../core/service/about/get_about";
import { ModalContextClass } from "../../../core/context/modal.context";
import { TFunction } from "next-i18next";
import _ from "lodash";
import {
  postStudentUnion,
  postUnionYear,
} from "../../../core/service/about/post_about";
import {
  getAllUnionYearVote,
  getAllVoteCount,
  getUserVote,
  getVoteCount,
  getVotingDetail,
} from "../../../core/service/vote/get_vote";
import { unionYearVotingInitValue } from "../form/union_year_voting.form";
import { postCreateVote, postVote } from "../../../core/service/vote/post_vote";
import dayjs from "dayjs";
import { Vote } from "../types/vote.types";
import { patchUnion } from "../../../core/service/vote/patch_vote";
import { Router } from "next/router";
import { deleteUnionYear } from "../../../core/service/vote/delete_vote";

class VoteContext {
  studentList: Array<User> = [];
  addedUser: Array<User> = [];
  isStudentLoading: boolean = false;
  positionPoint: Map<Position, number>;
  year: number = 9999;
  yearList: Array<number> = [];
  isEditMode: boolean = false;
  isCreateYearModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  editingUser: {
    unionId: string;
    userId: string;
    unionYear: number;
  } = {
    unionId: "",
    userId: "",
    unionYear: 0,
  };
  positionOptions: Array<{ name: string; value: string }> = [];
  unAcceptedYearOption: Array<{ name: string; value: string }> = [];
  voteStatus: "open" | "close" | "prepare" = "prepare";
  voteDetail: {
    voteCount?: number;
    accept?: number;
    reject?: number;
    noVote?: number;
  } = {};
  isVotable: boolean = false;

  modal?: ModalContextClass;
  t: TFunction = (t: string) => {
    return t;
  };
  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    this.positionPoint = new Map<Position, number>();
    this.positionPoint.set("President", 1);
    this.positionPoint.set("Vice President", 2);
    this.positionPoint.set("Secretary", 3);
    this.positionPoint.set("Board", 4);
    makeAutoObservable(this);
  }

  //-------------------
  // ACTION
  //-------------------
  async preparationStudentUnion() {
    try {
      if (this.year === 9999) return;
      this.isStudentLoading = true;
      const resp: AxiosResponse<{ data: Array<User> }> = await getStudentUnion({
        union_year: this.year,
      });
      if (resp.status !== 204) {
        this.studentList = [];
        this.studentList = resp.data.data.sort(
          (a, b) =>
            (this.positionPoint.get(a.std_position.position_name) || 9999) -
            (this.positionPoint.get(b.std_position.position_name) || 0)
        );
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        this.t("modal_about_page_member_preparation_fail"),
        err.message
      );
    } finally {
      this.isStudentLoading = false;
    }
  }

  async votePreparation() {
    try {
      if (this.year === 9999) return;
      const resp: AxiosResponse<{
        data: Array<{
          end_date: string;
          open_date: string;
          union_year: number;
          vote_id: string;
        }>;
      }> = await getVotingDetail({
        year: this.year,
      });

      if (resp.data.data.length !== 0) {
        const endDate = new Date(resp.data.data[0]?.end_date);
        const startDate = new Date(resp.data.data[0]?.open_date);
        const currentDate = new Date();

        if (currentDate < startDate) {
          this.voteStatus = "prepare";
        } else if (currentDate < endDate) {
          this.voteStatus = "open";
        } else {
          this.voteStatus = "close";
        }
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูล", err.message);
    }
  }

  async voteCountPreparation() {
    try {
      if (this.year === 9999) return;
      if (this.voteStatus !== "prepare") {
        const voteCountResp: AxiosResponse<{
          data: Array<{ Result: string }>;
        }> = await getAllVoteCount({ year: this.year });
        this.voteDetail.voteCount = Number(voteCountResp.data.data[0].Result);
        if (this.voteStatus === "close") {
          const eachVoteCountResp: AxiosResponse<{
            data: Array<{ vote: string; vote_result: Vote }>;
          }> = await getVoteCount({ year: this.year });

          this.voteDetail.accept = Number(
            _.find(
              eachVoteCountResp.data.data,
              (vote) => vote.vote_result === "ACCEPT"
            )?.vote
          );

          this.voteDetail.reject = Number(
            _.find(
              eachVoteCountResp.data.data,
              (vote) => vote.vote_result === "REJECT"
            )?.vote
          );

          this.voteDetail.noVote = Number(
            _.find(
              eachVoteCountResp.data.data,
              (vote) => vote.vote_result === "NO_VOTE"
            )?.vote
          );
        }
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูล", err.message);
    }
  }

  async preparationYear() {
    try {
      const resp: AxiosResponse<{ data: Array<{ union_year: number }> }> =
        await getYears();
      if (resp.status !== 204) {
        this.yearList = [];
        this.yearList = _.map(resp.data.data, (year) => year.union_year);
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        this.t("modal_about_page_year_preparation_fail"),
        err.message
      );
    }
  }

  async preparationUnacceptedYear() {
    try {
      const resp: AxiosResponse<{ data: Array<{ union_year: number }> }> =
        await getAllUnionYearVote();
      this.year = _.get(resp.data.data, "[0].union_year", 9999);
      this.unAcceptedYearOption = _.map(resp.data.data, (year) => ({
        name: year.union_year.toString(),
        value: year.union_year.toString(),
      }));
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูลปี", err.message);
    }
  }

  async preparationPositionOptions() {
    try {
      const resp: AxiosResponse<{
        data: Array<{ position_id: string; position_name: Position }>;
      }> = await getPosition();

      if (resp.status !== 204) {
        this.positionOptions = _.map(resp.data.data, (position) => ({
          name: position.position_name,
          value: position.position_id,
        }));
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        this.t("modal_about_page_position_preparation_fail"),
        err.message
      );
    }
  }

  get creatableYearOptions() {
    const aroundYear = _.range(
      new Date().getFullYear() - 5,
      new Date().getFullYear() + 5
    );
    const filteredYear = _.filter(
      aroundYear,
      (year) => !_.includes(this.yearList, year)
    );

    return _.map(filteredYear, (year) => ({
      name: `${year}`,
      value: `${year}`,
    }));
  }

  async onSaveUnion(onSaved: () => void) {
    try {
      const body = _.map(this.addedUser, (user) => ({
        std_id: user.std_id,
        position_id: user.position_id,
        union_year: this.year,
      }));
      await postStudentUnion(body);
      onSaved();
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        this.t("modal_about_page_save_member_fail"),
        err.message
      );
    }
  }

  async onCreateVote(
    value: typeof unionYearVotingInitValue,
    onSaved: () => void
  ) {
    try {
      await postUnionYear({ union_year: value.union_year });

      await postCreateVote(Number(value.union_year), {
        end_date: dayjs(new Date(value.end_date)).format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
        open_date: dayjs(new Date(value.open_date)).format(
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        ),
        union_year: Number(value.union_year),
      });
      this.preparationYear();
      this.preparationUnacceptedYear();
      this.preparationStudentUnion();
      this.isEditMode = true;
      onSaved();
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการสร้างระบบการลงคะแนน", err.message);
    }
  }

  async onVote(vote: Vote) {
    try {
      await postVote({ vote_result: vote });
      this.isVotable = false;
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการลงคะแนน", err.message);
    }
  }

  async onAcceptUnion() {
    try {
      await patchUnion(this.year);
      Router.prototype.push("/about");
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเพิ่ม", err.message);
    }
  }

  async userVotePreparation() {
    try {
      if (this.voteStatus === "open") {
        const resp: AxiosResponse<{ data: Array<any> }> = await getUserVote({
          year: this.year,
        });

        if (_.size(resp.data.data) === 0) {
          this.isVotable = true;
        }
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูลการโหวต", err.message);
    }
  }

  async deleteCurrentYear() {
    try {
      await deleteUnionYear(this.year);
      this.preparationYear();
      this.preparationUnacceptedYear();
      this.preparationStudentUnion();
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการลบปี", err.message);
    }
  }
}
export const voteContext = createContext(new VoteContext());
