import {ErrorHandler, api} from '@/common';
import {
  CreateAvailabilityRequest,
  CreateAvailabilityResponse,
  ReadAvailabilityResponse,
  UpdateAvailabilityRequest,
  UpdateAvailabilityResponse,
  ListAvailabilityParams,
  ListAvailabilityResponse,
  SearchAvailabilityRequest,
  SearchAvailabilityResponse,
} from './dtos';
import {toBuilding} from '@/buildings';

const basePath = '/availability/v1';

export const toAvailability = (availabilityResponse: any) => ({
  ...availabilityResponse,
  start_date: new Date(availabilityResponse.start_date + 'Z'),
  end_date: new Date(availabilityResponse.end_date + 'Z'),
  hourly_rate: Number(availabilityResponse.hourly_rate),
});

const createAvailability = async (
  data: CreateAvailabilityRequest,
  onError?: ErrorHandler,
): Promise<CreateAvailabilityResponse> => {
  const res = await api<CreateAvailabilityResponse>({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
    onError,
  });

  return {
    availability: toAvailability(res.availability),
  };
};

const readAvailability = async (
  id: number,
  onError?: ErrorHandler,
): Promise<ReadAvailabilityResponse> => {
  const res = await api<ReadAvailabilityResponse>({
    endpoint: `${basePath}/${id}`,
    method: 'GET',
    onError,
  });

  return {
    availability: toAvailability(res.availability),
  };
};

const updateAvailability = async (
  id: number,
  data: UpdateAvailabilityRequest,
  onError?: ErrorHandler,
): Promise<UpdateAvailabilityResponse> => {
  const res = await api<UpdateAvailabilityResponse>({
    endpoint: `${basePath}/${id}`,
    method: 'PUT',
    data,
    onError,
  });

  return {
    availability: toAvailability(res.availability),
  };
};

const deleteAvailability = async (
  id: number,
  onError?: ErrorHandler,
): Promise<void> => {
  await api({
    endpoint: `${basePath}/${id}`,
    method: 'DELETE',
    onError,
  });
};

const listAvailability = async (
  params: ListAvailabilityParams,
  onError?: ErrorHandler,
): Promise<ListAvailabilityResponse> => {
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : basePath;
  const res = await api<ListAvailabilityResponse>({
    endpoint,
    method: 'GET',
    onError,
  });

  return {
    availability: res.availability.map(toAvailability),
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};

const searchAvailability = async (
  data: SearchAvailabilityRequest,
  onError?: ErrorHandler,
): Promise<SearchAvailabilityResponse> => {
  const res = await api<SearchAvailabilityResponse>({
    endpoint: `${basePath}/search`,
    method: 'POST',
    data,
    onError,
  });

  return {
    availabilities: res.availabilities.map(toAvailability),
    buildings: res.buildings.map(toBuilding),
    spaces: res.spaces,
  };
};

export const AvailabilityAPI = {
  create: createAvailability,
  get: readAvailability,
  update: updateAvailability,
  delete: deleteAvailability,
  list: listAvailability,
  search: searchAvailability,
};
