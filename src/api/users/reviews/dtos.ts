// ======================================================================
// UserReview Entity

export interface UserReview {
  id: string;
  from_user_id: string;
  to_user_id: string;
  message: string;
  stars: number;
  created_at: Date;
}

// ======================================================================
// UserReview DTOs

export interface CreateUserReviewRequest {
  user_id: string;
  message: string;
  stars: number;
}

export interface CreateUserReviewResponse {
  user_review: UserReview;
}

export interface ListUserReviewsParams {
  user_id: string;
  offset_id?: number;
  limit?: number;
}

export interface ListUserReviewsResponse {
  user_reviews: UserReview[];
  next_offset_id?: number;
  limit: number;
}
