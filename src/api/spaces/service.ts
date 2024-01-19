import {ErrorHandler, api} from '../api';
import {
  CreateSpaceRequest,
  CreateSpaceResponse,
  ReadSpaceResponse,
  UpdateSpaceRequest,
  UpdateSpaceResponse,
  ListSpacesParams,
  ListSpacesResponse,
  GetPresignedUrlResponse,
} from './dtos';

const basePath = '/spaces/v1';

const createSpace = async (
  data: CreateSpaceRequest,
  onError?: ErrorHandler,
): Promise<CreateSpaceResponse> => {
  return await api({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
    onError,
  });
};

const readSpace = async (
  id: number,
  onError?: ErrorHandler,
): Promise<ReadSpaceResponse> => {
  return await api({
    endpoint: `${basePath}/${id}`,
    method: 'GET',
    onError,
  });
};

const updateSpace = async (
  id: number,
  data: UpdateSpaceRequest,
  onError?: ErrorHandler,
): Promise<UpdateSpaceResponse> => {
  return await api({
    endpoint: `${basePath}/${id}`,
    method: 'PUT',
    data,
    onError,
  });
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
  Object.keys(params).forEach(key =>
    params[key] === undefined ? delete params[key] : {},
  );
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : basePath;
  return await api({
    endpoint,
    method: 'GET',
    onError,
  });
};

const getPresignedUrl = async (
  id: number,
  onError?: ErrorHandler,
): Promise<GetPresignedUrlResponse> => {
  return await api({
    endpoint: `${basePath}/${id}/presigned-url`,
    method: 'GET',
    onError,
  });
};

export const SpaceAPI = {
  create: createSpace,
  read: readSpace,
  update: updateSpace,
  delete: deleteSpace,
  list: listSpaces,
  getPresignedUrl,
};
