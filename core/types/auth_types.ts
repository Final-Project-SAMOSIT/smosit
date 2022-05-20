export interface meProps {
  user_id: string;
  user_group_id: any;
  user_type: string;
  name_th: string;
  name_en: string;
  email: string;
  created_at: string;
  updated_at: string;
  role: {
    id: string;
    name: "User" | "Admin" | "Publisher";
  };
}
