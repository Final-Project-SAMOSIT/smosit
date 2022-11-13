export interface Petition {
  petition_date: string;
  petition_details: string;
  petition_id: string;
  petition_topic: string;
  status_id: string;
  type_id: string;
  user_id: string;
  petition_img: string;
  status: {
    status_id: string;
    status_name: PetitionStatus;
    status_description: string;
  };
  petition_types: {
    petition_type_id: string;
    petition_type_name: PetitionType;
  };
}

export type PetitionStatus =
  | "Sent"
  | "Approve"
  | "In Progress"
  | "Done"
  | "Reject";

export type PetitionType =
  | "Education"
  | "Environment"
  | "Damaged items"
  | "Lost items"
  | "Other";
