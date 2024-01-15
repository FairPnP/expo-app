import {ErrorHandler, api} from '@/common';
import {
  CreateBuildingRequest,
  CreateBuildingResponse,
  ReadBuildingResponse,
  UpdateBuildingRequest,
  UpdateBuildingResponse,
  ListBuildingsParams,
  ListBuildingsResponse,
} from './dtos';

const basePath = '/buildings/v1';

export const toBuilding = (buildingResponse: any) => ({
  ...buildingResponse,
  latitude: Number(buildingResponse.latitude),
  longitude: Number(buildingResponse.longitude),
});

const createBuilding = async (
  data: CreateBuildingRequest,
  onError?: ErrorHandler,
): Promise<CreateBuildingResponse> => {
  const res = await api<CreateBuildingResponse>({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
    onError,
  });

  return {
    building: toBuilding(res.building),
  };
};

const readBuilding = async (
  id: number,
  onError?: ErrorHandler,
): Promise<ReadBuildingResponse> => {
  const res = await api<ReadBuildingResponse>({
    endpoint: `${basePath}/${id}`,
    method: 'GET',
    onError,
  });

  return {
    building: toBuilding(res.building),
  };
};

const updateBuilding = async (
  id: number,
  data: UpdateBuildingRequest,
  onError?: ErrorHandler,
): Promise<UpdateBuildingResponse> => {
  const res = await api<UpdateBuildingResponse>({
    endpoint: `${basePath}/${id}`,
    method: 'PUT',
    data,
    onError,
  });

  return {
    building: toBuilding(res.building),
  };
};

const deleteBuilding = async (
  id: number,
  onError?: ErrorHandler,
): Promise<void> => {
  await api({
    endpoint: `${basePath}/${id}`,
    method: 'DELETE',
    onError,
  });
};

const listBuildings = async (
  params: ListBuildingsParams,
  onError?: ErrorHandler,
): Promise<ListBuildingsResponse> => {
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : basePath;
  const res = await api<ListBuildingsResponse>({
    endpoint,
    method: 'GET',
    onError,
  });

  return {
    buildings: res.buildings.map(toBuilding),
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};

export const BuildingAPI = {
  create: createBuilding,
  read: readBuilding,
  update: updateBuilding,
  delete: deleteBuilding,
  list: listBuildings,
};
