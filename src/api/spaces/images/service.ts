import { ErrorHandler, api } from '../../api';
import { CreatePresignedUrlsResponse } from './dtos';

const basePath = '/space_images/v1';

const createPresignedUrls = async (
  space_id: string,
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
  space_image_ids: string[],
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

export const SpaceImageAPI = {
  createPresignedUrls,
  postImageUpload,
};
