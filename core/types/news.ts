export interface News {
  news_created_at: string;
  news_details: string;
  news_id: number | string;
  news_img: string;
  news_title: string;
  news_types: { news_type_id: string; news_type_name: string };
  news_updated_at: string;
  views?: number;

  news_caption_img?: string;
  news_type_id?: string;
  union_year?: number;
  user_id?: string;
}
