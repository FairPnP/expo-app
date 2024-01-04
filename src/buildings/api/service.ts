import {api} from '@/common';
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
): Promise<CreateBuildingResponse> => {
  const res = await api({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
  });

  return {
    building: toBuilding(res.building),
  };
};

const readBuilding = async (id: number): Promise<ReadBuildingResponse> => {
  const res = await api({
    endpoint: `${basePath}/${id}`,
    method: 'GET',
  });

  return {
    building: toBuilding(res.building),
  };
};

const updateBuilding = async (
  id: number,
  data: UpdateBuildingRequest,
): Promise<UpdateBuildingResponse> => {
  const res = await api({
    endpoint: `${basePath}/${id}`,
    method: 'PUT',
    data,
  });

  return {
    building: toBuilding(res.building),
  };
};

const deleteBuilding = async (id: number): Promise<void> => {
  return api({
    endpoint: `${basePath}/${id}`,
    method: 'DELETE',
  });
};

const listBuildings = async (
  params: ListBuildingsParams,
): Promise<ListBuildingsResponse> => {
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : basePath;
  const res = await api({
    endpoint,
    method: 'GET',
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
