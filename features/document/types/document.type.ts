export type Document = {
  form_info_id: string;
  form_no: string;
  institution: string;
  solution: string;
  created_date: string;
  contact: string;
  Tel: string;
  form_type: FormType;
};

export type FormType = "proposal" | "document";
