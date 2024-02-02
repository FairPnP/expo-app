// ======================================================================
// SpaceReview Entity

export interface SpaceReview {
  id: number;
  user_id: string;
  space_id: number;
  message: string;
  stars: number;
  created_at: Date;
  last_modified: Date;
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
  space_id: number;
  offset_id?: number;
  limit?: number;
}

export interface ListSpaceReviewsResponse {
  space_reviews: SpaceReview[];
  next_offset_id?: number;
  limit: number;
}
