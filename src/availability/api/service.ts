import {HttpError, api, isHttpError} from '@/common';
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
  start_date: new Date(availabilityResponse.start_date),
  end_date: new Date(availabilityResponse.end_date),
  hourly_rate: Number(availabilityResponse.hourly_rate),
});

const createAvailability = async (
  data: CreateAvailabilityRequest,
): Promise<CreateAvailabilityResponse | HttpError> => {
  const res = await api<CreateAvailabilityResponse>({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
  });

  if (isHttpError(res)) {
    return res;
  }

  return {
    availability: toAvailability(res.availability),
  };
};

const readAvailability = async (
  id: number,
): Promise<ReadAvailabilityResponse | HttpError> => {
  const res = await api<ReadAvailabilityResponse>({
    endpoint: `${basePath}/${id}`,
    method: 'GET',
  });

  if (isHttpError(res)) {
    return res;
  }

  return {
    availability: toAvailability(res.availability),
  };
};

const updateAvailability = async (
  id: number,
  data: UpdateAvailabilityRequest,
): Promise<UpdateAvailabilityResponse | HttpError> => {
  const res = await api<UpdateAvailabilityResponse>({
    endpoint: `${basePath}/${id}`,
    method: 'PUT',
    data,
  });

  if (isHttpError(res)) {
    return res;
  }

  return {
    availability: toAvailability(res.availability),
  };
};

const deleteAvailability = async (id: number): Promise<void | HttpError> => {
  let res = await api({
    endpoint: `${basePath}/${id}`,
    method: 'DELETE',
  });

  if (isHttpError(res)) {
    return res;
  }
};

const listAvailability = async (
  params: ListAvailabilityParams,
): Promise<ListAvailabilityResponse | HttpError> => {
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : basePath;
  const res = await api<ListAvailabilityResponse>({
    endpoint,
    method: 'GET',
  });

  if (isHttpError(res)) {
    return res;
  }

  return {
    availability: res.availability.map(toAvailability),
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};

const searchAvailability = async (
  data: SearchAvailabilityRequest,
): Promise<SearchAvailabilityResponse | HttpError> => {
  const res = await api<any>({
    endpoint: `${basePath}/search`,
    method: 'POST',
    data,
  });

  if (isHttpError(res)) {
    return res;
  }

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
