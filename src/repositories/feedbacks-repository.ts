export interface FeedbackCreateData  {
  type: string;
  comment: string;
  screenshot?: string;
  name?: string;
  email?: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}
