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

export interface ListUserSummariesParams {
  offset_id?: number;
  limit?: number;
}

export interface ListUserSummariesResponse {
  user_summaries: UserSummary[];
  next_offset_id?: number;
  limit: number;
}
