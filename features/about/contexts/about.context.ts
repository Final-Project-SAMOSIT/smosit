import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { Experience, Position, User } from "../types/user";
import { ModalContextClass } from "../../../core/context/modal.context";
import {
  getAcceptedYear,
  getExperiences,
  getPosition,
  getStudentUnion,
  getYears,
} from "../../../core/service/about/get_about";
import { AxiosResponse } from "axios";
import _ from "lodash";
import {
  postStudentUnion,
  postUnionYear,
} from "../../../core/service/about/post_about";
import { deleteStudentUnion } from "../../../core/service/about/delete_about";
import { unionYearInit } from "../form/union_year.form";
import { TFunction } from "next-i18next";

class AboutContext {
  t: TFunction = (t: string) => {
    return t;
  };

  studentList: Array<User> = [];
  yearList: Array<number> = [];
  experienceList: Array<Experience> = [];
  isFetchingExperience: boolean = false;
  isOutofContent: boolean = false;
  year: number = new Date().getFullYear();
  isStudentLoading: boolean = false;
  modal?: ModalContextClass;
  positionPoint: Map<Position, number>;
  isEditModalOpen: boolean = false;
  isEditMode: boolean = false;
  positionOptions: Array<{ name: string; value: string }> = [];
  editingUser: {
    userId: string;
    unionId: string;
    unionYear: number;
    positionId?: string;
  } = {
    userId: "",
    unionId: "",
    unionYear: 0,
    positionId: "",
  };
  addedUser: Array<User> = [];
  isCreateYearModalOpen: boolean = false;
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

  async preparationStudentUnion() {
    try {
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

  async preparationYear() {
    try {
      const resp: AxiosResponse<{ data: Array<{ union_year: number }> }> =
        await getAcceptedYear();
      if (resp.status !== 204) {
        this.yearList = [];
        this.yearList = _.map(resp.data.data, (year) => year.union_year);
        this.year = resp.data.data[resp.data.data.length - 1].union_year;
      }
      this.preparationStudentUnion();
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        this.t("modal_about_page_year_preparation_fail"),
        err.message
      );
    }
  }

  async preparationExperience(reset?: boolean) {
    try {
      if (reset) {
        this.experienceList = [];
      }
      this.isFetchingExperience = true;
      const resp: AxiosResponse<{ data: Array<Experience> }> =
        await getExperiences({
          union_year: this.year,
          take: 3,
          skip: _.size(this.experienceList),
        });
      if (resp.status !== 204) {
        this.experienceList = [...this.experienceList, ...resp.data.data];
        this.experienceList = _.uniqBy(this.experienceList, "news_id");
        if (_.size(resp.data.data) === 0) {
          this.isOutofContent = true;
        }
      }
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        this.t("modal_about_page_experience_preparation_fail"),
        err.message
      );
    } finally {
      this.isFetchingExperience = false;
    }
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

  async onDelete(union_id: string) {
    try {
      await deleteStudentUnion(union_id);
      this.preparationStudentUnion();
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        this.t("modal_about_page_delete_member_fail"),
        err.message
      );
    }
  }

  get yearOptions() {
    return _.map(this.yearList, (year) => ({
      name: `${this.t(
        "about_page_student_union_year_dropdown_prefix"
      )} ${year}`,
      value: year,
    }));
  }

  get aroundYearOptions() {
    return _.map(
      _.range(new Date().getFullYear() - 5, new Date().getFullYear() + 5),
      (year) => ({
        name: `${this.t(
          "about_page_student_union_year_dropdown_prefix"
        )} ${year}`,
        value: year.toString(),
      })
    );
  }

  async onCreateYear(value: typeof unionYearInit) {
    try {
      await postUnionYear(value);
      this.year = Number(value.union_year);
      this.preparationStudentUnion();
      this.preparationExperience(true);
      this.preparationYear();
      this.isEditMode = true;
      this.isCreateYearModalOpen = false;
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        this.t("modal_about_page_create_year_fail"),
        err.message
      );
    }
  }
}
export const aboutContext = createContext(new AboutContext());
