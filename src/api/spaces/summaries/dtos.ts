// ======================================================================
// SpaceSummary Entity

export interface SpaceSummary {
  space_id: string;
  total_reviews: number;
  average_stars: number;
}

// ======================================================================
// SpaceSummary DTOs

export interface GetSpaceSummaryResponse {
  space_summary: SpaceSummary;
}

export interface ListSpaceSummariesParams {
  offset_id?: number;
  limit?: number;
}

export interface ListSpaceSummariesResponse {
  space_summaries: SpaceSummary[];
  next_offset_id?: number;
  limit: number;
}
