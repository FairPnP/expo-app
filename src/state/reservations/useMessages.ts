import { ListChatMessagesParams, ReservationAPI } from '@/api';
import { useQuery } from '@tanstack/react-query';
import { MESSAGES_QUERY_KEY } from './consts';
import { useAppMode } from '../useAppMode';

export const useMessages = (
  reservation_id: string,
  params: ListChatMessagesParams,
) => {
  const { appMode } = useAppMode();

  return useQuery({
    queryKey: [MESSAGES_QUERY_KEY, appMode, reservation_id, params],
    queryFn: async () => {
      const response = await ReservationAPI.listMessages(
        reservation_id,
        params,
      );
      return response;
    },
    enabled: !!reservation_id,
  });
};
