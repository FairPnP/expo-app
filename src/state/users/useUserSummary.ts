import {useQuery} from '@tanstack/react-query';
import {USER_QUERY_KEY} from './consts';
import {UserSummaryAPI} from '@/api';

export const useUserSummary = (user_id: string) => {
  return useQuery({
    queryKey: [USER_QUERY_KEY, user_id],
    queryFn: async () => {
      const response = await UserSummaryAPI.get(user_id);
      return response.user_summary;
    },
    enabled: !!user_id,
  });
};
