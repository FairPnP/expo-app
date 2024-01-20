import {ListChatMessagesParams, ReservationAPI} from '@/api';
import {useQuery} from '@tanstack/react-query';
import {MESSAGES_QUERY_KEY} from './consts';

export const useMessages = (
  reservation_id: number,
  params: ListChatMessagesParams,
) => {
  return useQuery({
    queryKey: [MESSAGES_QUERY_KEY, reservation_id, params],
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
