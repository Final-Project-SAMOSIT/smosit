import * as Yup from "yup";

export type ProposalInitvalue = {
  form_info: {
    form_no: string;
    institution: string;
    solution: string;
    contact: string;
    form_type: "proposal" | "document";
  };
  request_info: {
    project_name: string;
    project_due_to: string;
    start_date: Date;
    end_date: Date;
    location: string;
    cost: number;
    cost_des_th: string;
  };
  sub_activity: Array<{ sub_activity_id: string; activity_hour: number }>;
  activity_type: "hour_count" | "hour_not_count" | "";
};

export const proposalInitvalue: ProposalInitvalue = {
  form_info: {
    form_no: "",
    institution: "",
    solution: "",
    contact: "",
    form_type: "proposal",
  },
  request_info: {
    project_name: "",
    project_due_to: "",
    start_date: new Date(),
    end_date: new Date(),
    location: "",
    cost: 0,
    cost_des_th: "",
  },
  sub_activity: [],
  activity_type: "",
};

export const proposalValidationSchema = Yup.object().shape({});
