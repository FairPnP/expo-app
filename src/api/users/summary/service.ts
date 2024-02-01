import {ErrorHandler, api} from '../../api';
import {
  ListUserSummarysParams,
  ListUserSummarysResponse,
  UserSummary,
} from './dtos';

const basePath = '/user_summarys/v1';

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

const listUserSummarys = async (
  params: ListUserSummarysParams,
  onError?: ErrorHandler,
): Promise<ListUserSummarysResponse> => {
  Object.keys(params).forEach(
    key => params[key] === undefined && delete params[key],
  );
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : `${basePath}`;
  const res = await api<ListUserSummarysResponse>({
    endpoint,
    method: 'GET',
    onError,
  });

  const user_summarys = res.user_summarys.map(toUserSummary);

  return {
    user_summarys: user_summarys,
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};
