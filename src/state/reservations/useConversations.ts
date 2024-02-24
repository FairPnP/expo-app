import { ReservationAPI } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { MESSAGES_QUERY_KEY } from './consts';
import { useAppMode } from '../useAppMode';

export const useConversations = (offset_id?: number) => {
  const { appMode } = useAppMode();

  const query = useQuery({
    queryKey: [MESSAGES_QUERY_KEY, appMode, { page: offset_id }],
    queryFn: async () => {
      const response = await ReservationAPI.listConversations(
        appMode === 'hosting',
        {
          offset_id,
        },
      );
      return response;
    },
  });

  return query;
};
