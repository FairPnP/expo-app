import {api} from '@/common';
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
): Promise<CreateSpaceResponse> => {
  return api({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
  });
};

const readSpace = async (id: number): Promise<ReadSpaceResponse> => {
  return api({
    endpoint: `${basePath}/${id}`,
    method: 'GET',
  });
};

const updateSpace = async (
  id: number,
  data: UpdateSpaceRequest,
): Promise<UpdateSpaceResponse> => {
  return api({
    endpoint: `${basePath}/${id}`,
    method: 'PUT',
    data,
  });
};

const deleteSpace = async (id: number): Promise<void> => {
  return api({
    endpoint: `${basePath}/${id}`,
    method: 'DELETE',
  });
};

const listSpaces = async (
  params: ListSpacesParams,
): Promise<ListSpacesResponse> => {
  const queryString = new URLSearchParams(params as any).toString();
  const endpoint = queryString ? `${basePath}?${queryString}` : basePath;
  return api({
    endpoint,
    method: 'GET',
  });
};

const getPresignedUrl = async (
  id: number,
): Promise<GetPresignedUrlResponse> => {
  return api({
    endpoint: `${basePath}/${id}/presigned-url`,
    method: 'GET',
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
