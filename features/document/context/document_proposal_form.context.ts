import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { ModalContextClass } from "../../../core/context/modal.context";
import { proposalInitvalue } from "../form/document_proposal.form";
import {
  getActivityType,
  getSubActivityType,
} from "../../../core/service/document/get_document";
import { AxiosResponse } from "axios";
import { Activity, SubActivity } from "../types/document.type";
import _ from "lodash";
import { postProposal } from "../../../core/service/document/post_document";

class DocumentProposalFormContext {
  modal?: ModalContextClass;

  subActivityList: Array<SubActivity> = [];
  activityList: Array<Activity> = [];

  isEdit: boolean = false;
  isPrinting: boolean = false;

  //-------------------
  // CONSTUCTOR
  //-------------------
  constructor() {
    makeAutoObservable(this);
  }

  async preparation() {
    try {
      const subActivityResp: AxiosResponse<{ data: Array<SubActivity> }> =
        await getSubActivityType();
      this.subActivityList = subActivityResp.data.data;
      const activityResp: AxiosResponse<{ data: Array<Activity> }> =
        await getActivityType();
      this.activityList = activityResp.data.data;
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการเตรียมข้อมูล", err.message);
    }
  }

  get subActivityOptions() {
    return _.map(
      _.filter(
        this.subActivityList,
        (subActivity) => subActivity.activity_id === "2"
      ),
      (item) => ({
        name: item.sub_activity_type,
        value: item.sub_activity_id,
      })
    );
  }

  async onCreate(value: typeof proposalInitvalue) {
    try {
      const resp = await postProposal({
        ...value,
        request_info: {
          ...value.request_info,
          cost: Number(value.request_info.cost),
        },
        sub_activity:
          value.activity_type === "hour_count"
            ? _.filter(
                value.sub_activity,
                (item) =>
                  item.sub_activity_id !== "" && item.activity_hour !== 0
              )
            : [
                {
                  ..._.find(
                    this.subActivityList,
                    (subActivity) =>
                      subActivity.activity_id ===
                      _.find(
                        this.activityList,
                        (activity) =>
                          activity.activity_type === "hour_not_count"
                      )?.activity_id
                  ),
                  activity_hour: 0,
                },
              ],
      });
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการสร้างเอกสาร", err.message);
    }
  }

  async FormPreparation(
    id: string,
    setInitValue: (value: typeof proposalInitvalue) => void
  ) {
    try {
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal(
        "มีปัญหาในการเตรียทข้อมูลข้อมูลเอกสาร",
        err.message
      );
    }
  }
  async onUpdate(
    value: typeof proposalInitvalue,
    form_id: string,
    project_id: string
  ) {
    try {
    } catch (err: any) {
      console.log(err);
      this.modal?.openModal("มีปัญหาในการแก้ไขข้อมูล", err.message);
    }
  }

  onPrint() {
    this.isPrinting = true;
  }
}
export const documentProposalFormContext = createContext(
  new DocumentProposalFormContext()
);
