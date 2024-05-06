import {ErrorHandler, api} from '../api';
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
  SpaceResult,
  Availability,
} from './dtos';
import {Building, toBuilding} from '../buildings';

const basePath = '/availability/v1';

export const toAvailability = (availabilityResponse: any) => ({
  ...availabilityResponse,
  start_date: new Date(availabilityResponse.start_date + 'Z'),
  end_date: new Date(availabilityResponse.end_date + 'Z'),
  price: Number(availabilityResponse.price),
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
  id: string,
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
  id: string,
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
  id: string,
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
  Object.keys(params).forEach(
    key => params[key] === undefined && delete params[key],
  );
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
): Promise<{
  buildings: Record<number, Building>;
  spaces: Record<number, SpaceResult>;
  availabilities: Availability[];
}> => {
  const res = await api<SearchAvailabilityResponse>({
    endpoint: `${basePath}/search`,
    method: 'POST',
    data,
    onError,
  });

  return {
    availabilities: res.availabilities.map(toAvailability),
    buildings: res.buildings.reduce(
      (acc, building) => {
        acc[building.id] = toBuilding(building);
        return acc;
      },
      {} as Record<number, Building>,
    ),
    spaces: res.spaces.reduce(
      (acc, space) => {
        acc[space.id] = space;
        return acc;
      },
      {} as Record<number, SpaceResult>,
    ),
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
