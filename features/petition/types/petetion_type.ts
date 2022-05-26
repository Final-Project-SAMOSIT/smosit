export interface Petition {
  pet_date: string;
  pet_details: string;
  pet_id: string;
  pet_topic: string;
  status_id: string;
  type_id: string;
  user_id: string;
  status: {
    status_id: string;
    status_name: PetitionStatus;
    status_description: string;
  };
  pet_types: {
    pet_type_id: string;
    pet_type_name: PetitionType;
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
