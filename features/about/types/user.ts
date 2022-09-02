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

export interface Experience {
  news_caption_img: string;
  news_created_at: string;
  news_details: string;
  news_id: string;
  news_img: string;
  news_title: string;
  news_type_id: string;
  news_updated_at: string;
  union_year: number;
  user_id: string;
}
