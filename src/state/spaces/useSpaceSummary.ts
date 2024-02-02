import {useQuery} from '@tanstack/react-query';
import {SPACE_QUERY_KEY} from './consts';
import {SpaceSummaryAPI} from '@/api';

export const useSpaceSummary = (space_id: number) => {
  return useQuery({
    queryKey: [SPACE_QUERY_KEY, space_id],
    queryFn: async () => {
      const response = await SpaceSummaryAPI.get(space_id);
      return response.space_summary;
    },
    enabled: !!space_id,
  });
};
