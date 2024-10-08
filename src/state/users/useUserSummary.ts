import { useQuery } from '@tanstack/react-query';
import { SUMMARIES_QUERY_KEY, USER_QUERY_KEY } from './consts';
import { UserSummaryAPI } from '@/api';

export const useUserSummary = (userId: string) => {
  return useQuery({
    queryKey: [USER_QUERY_KEY, userId, SUMMARIES_QUERY_KEY],
    queryFn: async () => {
      const response = await UserSummaryAPI.get(userId, {
        404: () => null,
      });

      if (!response) {
        return null;
      }

      return response.user_summary;
    },
    enabled: !!userId,
  });
};
