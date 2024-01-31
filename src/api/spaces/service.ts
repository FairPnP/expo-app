import {ErrorHandler, api} from '../api';
import {
  CreateSpaceRequest,
  CreateSpaceResponse,
  ReadSpaceResponse,
  UpdateSpaceRequest,
  UpdateSpaceResponse,
  ListSpacesParams,
  ListSpacesResponse,
  CreatePresignedUrlsResponse,
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
  Object.keys(params).forEach(
    key => params[key] === undefined && delete params[key],
  );
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : basePath;
  return await api({
    endpoint,
    method: 'GET',
    onError,
  });
};

const createPresignedUrls = async (
  space_id: number,
  num_images: number,
  onError?: ErrorHandler,
): Promise<CreatePresignedUrlsResponse> => {
  return await api({
    endpoint: `${basePath}/images`,
    method: 'POST',
    onError,
    data: {
      space_id,
      num_images,
    },
  });
};

export const postImageUpload = async (
  space_image_ids: number[],
  onError?: ErrorHandler,
): Promise<void> => {
  return await api({
    endpoint: `${basePath}/images/complete`,
    method: 'PUT',
    onError,
    data: {
      space_image_ids,
    },
  });
};

export const SpaceAPI = {
  create: createSpace,
  get: readSpace,
  update: updateSpace,
  delete: deleteSpace,
  list: listSpaces,
  createPresignedUrls,
  postImageUpload,
};
