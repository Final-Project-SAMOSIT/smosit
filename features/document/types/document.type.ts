export type Document = {
  form_info_id: string;
  form_no: string;
  institution: string;
  solution: string;
  created_date: string;
  contact: string;
  Tel: string;
  form_type: FormType;
  request_info: Array<ProposalDocument>;
  project_approved: Array<DocumentDocument>;
};

export type ProposalDocument = {
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
};

export type DocumentDocument = {
  about_project: string;
  club_name: string;
  cost: number;
  cost_des_th: string;
  end_date: string;
  form_info_id: string;
  location: string;
  project_id: string;
  project_name: string;
  project_purpose: string;
  start_date: string;
  user_id: string;
};

export type FormType = "proposal" | "document";
