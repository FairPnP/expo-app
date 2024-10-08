import { useQuery } from '@tanstack/react-query';
import { SPACE_QUERY_KEY, SUMMARIES_QUERY_KEY } from './consts';
import { SpaceSummaryAPI } from '@/api';

export const useSpaceSummary = (space_id: string) => {
  return useQuery({
    queryKey: [SPACE_QUERY_KEY, space_id, SUMMARIES_QUERY_KEY],
    queryFn: async () => {
      const response = await SpaceSummaryAPI.get(space_id, {
        404: () => null,
      });
      return response.space_summary;
    },
    enabled: !!space_id,
  });
};
