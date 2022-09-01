export interface User {
  position_id: string;
  std_id: string;
  std_position: {
    position_id: string;
    position_name: string;
  };
  student_union_info: {
    std_fname_en: string;
    std_fname_th: string;
    std_id: string;
    std_img: string;
    std_lname_en: string;
    std_lname_th: string;
    std_major: string;
  };
  union_id: string;
  union_year: number;
}
