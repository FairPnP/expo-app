import {ChatMessage, CreateChatMessageRequest, ReservationAPI} from '@/api';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {MESSAGES_QUERY_KEY} from './consts';

export const useCreateMessage = (reservation_id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [MESSAGES_QUERY_KEY, reservation_id],
    mutationFn: async (params: CreateChatMessageRequest) => {
      const response = await ReservationAPI.createMessage(params);
      return response.message;
    },
    onSuccess: newMessage => {
      queryClient.invalidateQueries({
        queryKey: [MESSAGES_QUERY_KEY, reservation_id],
      });

      return newMessage;
    },
  });
};
