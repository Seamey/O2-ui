export type FeedbackType = {
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  created_at: string;
};


// feedback in user profile
export type FeedbackData = {
  uuid: string;
  message: string;
};

export type FeedbackResponse = {
  date: string;
  code: number;
  message: string;
  data: FeedbackData;
};
