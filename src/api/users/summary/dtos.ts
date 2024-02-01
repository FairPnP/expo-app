// ======================================================================
// UserSummary Entity

export interface UserSummary {
  user_id: string;
  total_reviews: number;
  average_stars: number;
}

// ======================================================================
// UserSummary DTOs

export interface GetUserSummaryResponse {
  user_summary: UserSummary;
}

export interface ListUserSummarysParams {
  offset_id?: number;
  limit?: number;
}

export interface ListUserSummarysResponse {
  user_summarys: UserSummary[];
  next_offset_id?: number;
  limit: number;
}
