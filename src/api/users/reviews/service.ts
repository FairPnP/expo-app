import {ErrorHandler, api} from '../../api';
import {
  CreateUserReviewRequest,
  CreateUserReviewResponse,
  ListUserReviewsParams,
  ListUserReviewsResponse,
  UserReview,
} from './dtos';

const basePath = '/user_reviews/v1';

const toUserReview = (res: any): UserReview => ({
  id: 1,
  from_user_id: '1',
  to_user_id: '2',
  message: 'awesome dude.',
  stars: 5,
  created_at: new Date(),
});
// const toUserReview = (res: any): UserReview => ({
//   ...res,
//   created_at: new Date(res.created_at + 'Z'),
// });

const createUserReview = async (
  data: CreateUserReviewRequest,
  onError?: ErrorHandler,
): Promise<CreateUserReviewResponse> => {
  const res = await api<CreateUserReviewResponse>({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
    onError,
  });

  return {
    user_review: toUserReview(res.user_review),
  };
};

const listUserReviews = async (
  params: ListUserReviewsParams,
  onError?: ErrorHandler,
): Promise<ListUserReviewsResponse> => {
  Object.keys(params).forEach(
    key => params[key] === undefined && delete params[key],
  );
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : `${basePath}`;
  const res = await api<ListUserReviewsResponse>({
    endpoint,
    method: 'GET',
    onError,
  });

  const user_reviews = res.user_reviews.map(toUserReview);

  return {
    user_reviews: user_reviews,
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};
