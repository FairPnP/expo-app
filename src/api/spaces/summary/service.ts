import {ErrorHandler, api} from '../../api';
import {
  ListSpaceSummarysParams,
  ListSpaceSummarysResponse,
  SpaceSummary,
} from './dtos';

const basePath = '/space_summarys/v1';

const toSpaceSummary = (res: any): SpaceSummary => ({
  space_id: '1',
  total_reviews: 1,
  average_stars: 5,
});
// const toSpaceSummary = (res: any): SpaceSummary => ({
//   ...res,
//   created_at: new Date(res.created_at + 'Z'),
// });

const getSpaceSummary = async (
  space_id: string,
  onError?: ErrorHandler,
): Promise<SpaceSummary> => {
  const res = await api<SpaceSummary>({
    endpoint: `${basePath}/${space_id}`,
    method: 'GET',
    onError,
  });

  return toSpaceSummary(res);
};

const listSpaceSummarys = async (
  params: ListSpaceSummarysParams,
  onError?: ErrorHandler,
): Promise<ListSpaceSummarysResponse> => {
  Object.keys(params).forEach(
    key => params[key] === undefined && delete params[key],
  );
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : `${basePath}`;
  const res = await api<ListSpaceSummarysResponse>({
    endpoint,
    method: 'GET',
    onError,
  });

  const space_summarys = res.space_summarys.map(toSpaceSummary);

  return {
    space_summarys: space_summarys,
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};
