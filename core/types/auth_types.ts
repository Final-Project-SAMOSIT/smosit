export interface meProps {
  user_id: string;
  user_group_id: any;
  user_type: string;
  name_th: string;
  name_en: string;
  email: string;
  created_at: string;
  updated_at: string;
  role_id: string;
  roles: {
    role_id: string;
    role_name: Role;
  };
}

export type Role = "Users" | "Admin" | "Publisher";
