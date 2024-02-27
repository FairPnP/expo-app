import { useQuery } from '@tanstack/react-query';
import { PROFILES_QUERY_KEY, USER_QUERY_KEY } from './consts';
import { UserProfileAPI } from '@/api';

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: [USER_QUERY_KEY, userId, PROFILES_QUERY_KEY],
    queryFn: async () => {
      const response = await UserProfileAPI.get(userId, {
        404: () => null,
      });
      return response.user_profile;
    },
    enabled: !!userId,
  });
};
