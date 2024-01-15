import {ErrorHandler, api} from '@/common';
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
  onError?: ErrorHandler,
): Promise<CreateReservationResponse> => {
  const res = await api<CreateReservationResponse>({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
    onError,
  });

  return {
    reservation: toReservation(res.reservation),
  };
};

const readReservation = async (
  id: number,
  onError?: ErrorHandler,
): Promise<ReadReservationResponse> => {
  const res = await api<CreateReservationResponse>({
    endpoint: `${basePath}/${id}`,
    method: 'GET',
    onError,
  });

  return {
    reservation: toReservation(res.reservation),
  };
};

const updateReservation = async (
  id: number,
  data: UpdateReservationRequest,
  onError?: ErrorHandler,
): Promise<UpdateReservationResponse> => {
  const res = await api<UpdateReservationResponse>({
    endpoint: `${basePath}/${id}`,
    method: 'PUT',
    data,
    onError,
  });

  return {
    reservation: toReservation(res.reservation),
  };
};

const deleteReservation = async (
  id: number,
  onError?: ErrorHandler,
): Promise<void> => {
  await api({
    endpoint: `${basePath}/${id}`,
    method: 'DELETE',
    onError,
  });
};

const listReservations = async (
  params: ListReservationsParams,
  onError?: ErrorHandler,
): Promise<ListReservationsResponse> => {
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : basePath;
  const res = await api<ListReservationsResponse>({
    endpoint,
    method: 'GET',
    onError,
  });

  return {
    reservations: res.reservations.map(toReservation),
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};

const createMessage = async (
  data: CreateChatMessageRequest,
  onError?: ErrorHandler,
): Promise<CreateChatMessageResponse> => {
  const res = await api<CreateChatMessageResponse>({
    endpoint: `${basePath}/chat`,
    method: 'POST',
    data,
    onError,
  });

  return {
    message: toMessage(res.message),
  };
};

const listMessages = async (
  reservation_id: number,
  params: ListChatMessagesParams,
  onError?: ErrorHandler,
): Promise<ListChatMessagesResponse> => {
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString
    ? `${basePath}/chat/${reservation_id}?${queryString}`
    : `${basePath}/chat/${reservation_id}`;
  const res = await api<ListChatMessagesResponse>({
    endpoint,
    method: 'GET',
    onError,
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
