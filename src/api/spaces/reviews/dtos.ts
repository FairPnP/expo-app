// ======================================================================
// SpaceReview Entity

export interface SpaceReview {
  id: number;
  space_id: string;
  user_id: string;
  message: string;
  stars: number;
  created_at: Date;
}

// ======================================================================
// SpaceReview DTOs

export interface CreateSpaceReviewRequest {
  space_id: number;
  message: string;
  stars: number;
}

export interface CreateSpaceReviewResponse {
  space_review: SpaceReview;
}

export interface ListSpaceReviewsParams {
  offset_id?: number;
  limit?: number;
}

export interface ListSpaceReviewsResponse {
  space_reviews: SpaceReview[];
  next_offset_id?: number;
  limit: number;
}
