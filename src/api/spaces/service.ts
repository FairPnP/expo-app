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

const createSpace = async (
  data: CreateSpaceRequest,
  onError?: ErrorHandler,
): Promise<CreateSpaceResponse> => {
  let res = await api({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
    onError,
  });

  return res;
};

const readSpace = async (
  id: string,
  onError?: ErrorHandler,
): Promise<ReadSpaceResponse> => {
  let res = await api({
    endpoint: `${basePath}/${id}`,
    method: 'GET',
    onError,
  });

  return res;
};

const updateSpace = async (
  id: string,
  data: UpdateSpaceRequest,
  onError?: ErrorHandler,
): Promise<UpdateSpaceResponse> => {
  let res = await api({
    endpoint: `${basePath}/${id}`,
    method: 'PUT',
    data,
    onError,
  });

  return res;
};

const deleteSpace = async (
  id: string,
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

  return res;
};

export const SpaceAPI = {
  create: createSpace,
  get: readSpace,
  update: updateSpace,
  delete: deleteSpace,
  list: listSpaces,
};
