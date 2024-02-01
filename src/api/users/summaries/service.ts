import {ErrorHandler, api} from '../../api';
import {
  ListUserSummariesParams,
  ListUserSummariesResponse,
  UserSummary,
} from './dtos';

const basePath = '/user_summaries/v1';

const toUserSummary = (res: any): UserSummary => ({
  user_id: '1',
  total_reviews: 1,
  average_stars: 5,
});
// const toUserSummary = (res: any): UserSummary => ({
//   ...res,
//   created_at: new Date(res.created_at + 'Z'),
// });

const getUserSummary = async (
  user_id: string,
  onError?: ErrorHandler,
): Promise<UserSummary> => {
  const res = await api<UserSummary>({
    endpoint: `${basePath}/${user_id}`,
    method: 'GET',
    onError,
  });

  return toUserSummary(res);
};

const listUserSummaries = async (
  params: ListUserSummariesParams,
  onError?: ErrorHandler,
): Promise<ListUserSummariesResponse> => {
  Object.keys(params).forEach(
    key => params[key] === undefined && delete params[key],
  );
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : `${basePath}`;
  const res = await api<ListUserSummariesResponse>({
    endpoint,
    method: 'GET',
    onError,
  });

  const user_summaries = res.user_summaries.map(toUserSummary);

  return {
    user_summaries: user_summaries,
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};
