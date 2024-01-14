import {api} from '@/common';
import {
  CreateReservationRequest,
  CreateReservationResponse,
  ReadReservationResponse,
  UpdateReservationRequest,
  UpdateReservationResponse,
  ListReservationsParams,
  ListReservationsResponse,
  CreateChatMessageRequest,
  CreateChatMessageResponse,
  ListChatMessagesParams,
  ListChatMessagesResponse,
} from './dtos';

const basePath = '/reservations/v1';

const toReservation = (reservationResponse: any) => ({
  ...reservationResponse,
  start_date: new Date(reservationResponse.start_date + 'Z'),
  end_date: new Date(reservationResponse.end_date + 'Z'),
});

const toMessage = (messageResponse: any) => ({
  ...messageResponse,
  created_at: new Date(messageResponse.created_at + 'Z'),
});

const createReservation = async (
  data: CreateReservationRequest,
): Promise<CreateReservationResponse> => {
  const res = await api({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
  });

  return {
    reservation: toReservation(res.reservation),
  };
};

const readReservation = async (
  id: number,
): Promise<ReadReservationResponse> => {
  const res = await api({
    endpoint: `${basePath}/${id}`,
    method: 'GET',
  });

  return {
    reservation: toReservation(res.reservation),
  };
};

const updateReservation = async (
  id: number,
  data: UpdateReservationRequest,
): Promise<UpdateReservationResponse> => {
  const res = await api({
    endpoint: `${basePath}/${id}`,
    method: 'PUT',
    data,
  });

  return {
    reservation: toReservation(res.reservation),
  };
};

const deleteReservation = async (id: number): Promise<void> => {
  return api({
    endpoint: `${basePath}/${id}`,
    method: 'DELETE',
  });
};

const listReservations = async (
  params: ListReservationsParams,
): Promise<ListReservationsResponse> => {
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : basePath;
  const res = await api({
    endpoint,
    method: 'GET',
  });

  return {
    reservations: res.reservations.map(toReservation),
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};

const createMessage = async (
  data: CreateChatMessageRequest,
): Promise<CreateChatMessageResponse> => {
  const res = await api({
    endpoint: `${basePath}/chat`,
    method: 'POST',
    data,
  });

  return {
    message: toMessage(res.message),
  };
};

const listMessages = async (
  reservation_id: number,
  params: ListChatMessagesParams,
): Promise<ListChatMessagesResponse> => {
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString
    ? `${basePath}/chat/${reservation_id}?${queryString}`
    : `${basePath}/chat/${reservation_id}`;
  const res = await api({
    endpoint,
    method: 'GET',
  });

  const messages = res.messages.map(toMessage);

  return {
    messages: messages,
    reservation_id: res.reservation_id,
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};

export const ReservationAPI = {
  create: createReservation,
  read: readReservation,
  update: updateReservation,
  delete: deleteReservation,
  list: listReservations,
  createMessage,
  listMessages,
};
