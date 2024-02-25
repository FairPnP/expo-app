import { ErrorHandler, api } from '../api';
import {
  ReadBuildingResponse,
  ListBuildingsParams,
  ListBuildingsResponse,
} from './dtos';

const basePath = '/buildings/v1';

export const toBuilding = (buildingResponse: any) => ({
  ...buildingResponse,
  latitude: Number(buildingResponse.latitude),
  longitude: Number(buildingResponse.longitude),
});

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
  get: readBuilding,
  list: listBuildings,
};
