import { createContext } from "react";
import { makeAutoObservable } from "mobx";
import { ModalContextClass } from "../../../core/context/modal.context";
import { proposalInitvalue } from "../form/document_proposal.form";
import {
  getActivityType,
  getProposal,
  getSubActivityType,
} from "../../../core/service/document/get_document";
import { AxiosResponse } from "axios";
import { Activity, SubActivity } from "../types/document.type";
import _ from "lodash";
import { postProposal } from "../../../core/service/document/post_document";
import { Router } from "next/router";
import { patchProposal } from "../../../core/service/document/patch_document";

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

  getProposalBody(value: typeof proposalInitvalue) {
    return {
      ...value,
      request_info: {
        ...value.request_info,
        cost: Number(value.request_info.cost),
      },
      sub_activity:
        value.activity_type_id === ""
          ? []
          : value.activity_type_id === "2"
          ? _.filter(
              value.sub_activity,
              (item) => item.sub_activity_id !== "" && item.activity_hour !== 0
            )
          : [
              {
                ..._.find(
                  this.subActivityList,
                  (subActivity) =>
                    subActivity.activity_id ===
                    _.find(
                      this.activityList,
                      (activity) => activity.activity_type === "hour_not_count"
                    )?.activity_id
                ),
                activity_hour: 0,
              },
            ],
    };
  }

  async onCreate(value: typeof proposalInitvalue) {
    try {
      const resp: AxiosResponse<{
        data: Array<{
          sub_activity_id: string;
          request_info: {
            form_info: {
              form_info_id: string;
            };
            request_info_id: string;
          };
        }>;
      }> = await postProposal(this.getProposalBody(value));
      Router.prototype.push(`/document`);
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
      const resp: AxiosResponse<{
        data: {
          requestApproved: Array<{
            sub_activity_id: string;
            activity_hour: number;
          }>;
          requestInfo: {
            cost: number;
            cost_des_th: string;
            end_date: string;
            form_info_id: string;
            location: string;
            project_due_to: string;
            project_name: string;
            request_info_id: string;
            start_date: string;
            user_id: string;
            form_info: {
              Tel: string;
              contact: string;
              created_date: string;
              form_info_id: string;
              form_no: string;
              form_type: "proposal" | "document";
              institution: string;
              solution: string;
            };
          };
        };
      }> = await getProposal(id);

      setInitValue({
        form_info: resp.data.data.requestInfo.form_info,
        request_info: {
          ...resp.data.data.requestInfo,
          start_date: new Date(resp.data.data.requestInfo.start_date),
          end_date: new Date(resp.data.data.requestInfo.end_date),
        },
        sub_activity: resp.data.data.requestApproved,
        activity_type_id: resp.data.data.requestApproved[0]?.sub_activity_id
          ? resp.data.data.requestApproved[0]?.sub_activity_id === "7"
            ? "1"
            : "2"
          : "0",
      });
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
    request_info_id: string
  ) {
    try {
      const resp = await patchProposal(
        this.getProposalBody(value),
        form_id,
        request_info_id
      );
      if (resp.status === 200) {
        Router.prototype.push(
          `/document/proposal/${form_id}/${request_info_id}`
        );
      }
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
