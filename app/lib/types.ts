export type Folder = {
  folder_id: number;
  user_id: string;
  parent_folder_id: number | null;
  folder_name: string;
  updated_at: string;
};

export type Set = {
  set_id: number;
  user_id: string;
  folder_id: number | null;
  set_name: string;
  is_public: boolean;
  creation_date: string;
  updated_at: string;
};

export type Card = {
  card_id: number;
  set_id: number;
  front_text: string;
  back_text: string;
  updated_at: string;
};

export type Progress = {
  user_id: string;
  card_id: number;
  last_correct: boolean | null;
  total_count: number;
  correct_count: number;
  updated_at: string;
};