import {ErrorHandler, api} from '../api';
import {
  CreateSpaceRequest,
  CreateSpaceResponse,
  ReadSpaceResponse,
  UpdateSpaceRequest,
  UpdateSpaceResponse,
  ListSpacesParams,
  ListSpacesResponse,
  Space,
} from './dtos';

const basePath = '/spaces/v1';

const toSpace = (data: any): Space => {
  return {
    ...data,
    description: 'left side of the driveway',
  };
};

const createSpace = async (
  data: CreateSpaceRequest,
  onError?: ErrorHandler,
): Promise<CreateSpaceResponse> => {
  let space = await api({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
    onError,
  });

  return {
    space: toSpace(space),
  };
};

const readSpace = async (
  id: number,
  onError?: ErrorHandler,
): Promise<ReadSpaceResponse> => {
  let space = await api({
    endpoint: `${basePath}/${id}`,
    method: 'GET',
    onError,
  });

  return {
    space: toSpace(space),
  };
};

const updateSpace = async (
  id: number,
  data: UpdateSpaceRequest,
  onError?: ErrorHandler,
): Promise<UpdateSpaceResponse> => {
  let space = await api({
    endpoint: `${basePath}/${id}`,
    method: 'PUT',
    data,
    onError,
  });

  return {
    space: toSpace(space),
  };
};

const deleteSpace = async (
  id: number,
  onError?: ErrorHandler,
): Promise<void> => {
  await api({
    endpoint: `${basePath}/${id}`,
    method: 'DELETE',
    onError,
  });
};

const listSpaces = async (
  params: ListSpacesParams,
  onError?: ErrorHandler,
): Promise<ListSpacesResponse> => {
  Object.keys(params).forEach(
    key => params[key] === undefined && delete params[key],
  );
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : basePath;
  let res = await api({
    endpoint,
    method: 'GET',
    onError,
  });

  return {
    spaces: res.spaces.map(toSpace),
    next_offset_id: res.next_offset_id,
    limit: res.limit,
  };
};

export const SpaceAPI = {
  create: createSpace,
  get: readSpace,
  update: updateSpace,
  delete: deleteSpace,
  list: listSpaces,
};
