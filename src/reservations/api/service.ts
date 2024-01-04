import {api} from '@/common';
import {
  CreateReservationRequest,
  CreateReservationResponse,
  ReadReservationResponse,
  UpdateReservationRequest,
  UpdateReservationResponse,
  ListReservationsParams,
  ListReservationsResponse,
} from './dtos';

const basePath = '/reservations/v1';

const toReservation = (reservationResponse: any) => ({
  ...reservationResponse,
  start_date: new Date(reservationResponse.start_date),
  end_date: new Date(reservationResponse.end_date),
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

export const ReservationAPI = {
  create: createReservation,
  read: readReservation,
  update: updateReservation,
  delete: deleteReservation,
  list: listReservations,
};
