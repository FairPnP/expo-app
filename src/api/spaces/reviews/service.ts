import {ErrorHandler, api} from '../../api';
import {
  CreateSpaceReviewRequest,
  CreateSpaceReviewResponse,
  ListSpaceReviewsParams,
  ListSpaceReviewsResponse,
  SpaceReview,
} from './dtos';

const basePath = '/space_reviews/v1';

const toSpaceReview = (res: any): SpaceReview => ({
  id: 1,
  space_id: '1',
  user_id: '1',
  message: 'awesome space.',
  stars: 5,
  created_at: new Date(),
});
// const toSpaceReview = (res: any): SpaceReview => ({
//   ...res,
//   created_at: new Date(res.created_at + 'Z'),
// });

const createSpaceReview = async (
  data: CreateSpaceReviewRequest,
  onError?: ErrorHandler,
): Promise<CreateSpaceReviewResponse> => {
  const res = await api<CreateSpaceReviewResponse>({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
    onError,
  });

  return {
    space_review: toSpaceReview(res.space_review),
  };
};

const listSpaceReviews = async (
  params: ListSpaceReviewsParams,
  onError?: ErrorHandler,
): Promise<ListSpaceReviewsResponse> => {
  Object.keys(params).forEach(
    key => params[key] === undefined && delete params[key],
  );
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : `${basePath}`;
  const res = await api<ListSpaceReviewsResponse>({
    endpoint,
    method: 'GET',
    onError,
  });

  const space_reviews = res.space_reviews.map(toSpaceReview);

  return {
    space_reviews: space_reviews,
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};
