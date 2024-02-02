import {ErrorHandler, api} from '../../api';
import {
  GetUserSummaryResponse,
  ListUserSummariesParams,
  ListUserSummariesResponse,
  UserSummary,
} from './dtos';

const basePath = '/user_summaries/v1';

// const toUserSummary = (res: any): UserSummary => ({
//   ...res,
//   created_at: new Date(res.created_at + 'Z'),
// });
const toUserSummary = (res: any): UserSummary => res as UserSummary;

const getUserSummary = async (
  user_id: string,
  onError?: ErrorHandler,
): Promise<GetUserSummaryResponse> => {
  const res = await api<GetUserSummaryResponse>({
    endpoint: `${basePath}/${user_id}`,
    method: 'GET',
    onError,
  });

  return {
    user_summary: toUserSummary(res.user_summary),
  };
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

export const UserSummaryAPI = {
  get: getUserSummary,
  list: listUserSummaries,
};
