import {ErrorHandler, api} from '../../api';
import {
  GetSpaceSummaryResponse,
  ListSpaceSummariesParams,
  ListSpaceSummariesResponse,
  SpaceSummary,
} from './dtos';

const basePath = '/space_summaries/v1';

// const toSpaceSummary = (res: any): SpaceSummary => ({
//   ...res,
//   created_at: new Date(res.created_at + 'Z'),
// });
const toSpaceSummary = (res: any): SpaceSummary => res as SpaceSummary;

const getSpaceSummary = async (
  space_id: number,
  onError?: ErrorHandler,
): Promise<GetSpaceSummaryResponse> => {
  const res = await api<GetSpaceSummaryResponse>({
    endpoint: `${basePath}/${space_id}`,
    method: 'GET',
    onError,
  });

  return {
    space_summary: toSpaceSummary(res.space_summary),
  };
};

const listSpaceSummaries = async (
  params: ListSpaceSummariesParams,
  onError?: ErrorHandler,
): Promise<ListSpaceSummariesResponse> => {
  Object.keys(params).forEach(
    key => params[key] === undefined && delete params[key],
  );
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : `${basePath}`;
  const res = await api<ListSpaceSummariesResponse>({
    endpoint,
    method: 'GET',
    onError,
  });

  const space_summaries = res.space_summaries.map(toSpaceSummary);

  return {
    space_summaries: space_summaries,
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};

export const SpaceSummaryAPI = {
  get: getSpaceSummary,
  list: listSpaceSummaries,
};
