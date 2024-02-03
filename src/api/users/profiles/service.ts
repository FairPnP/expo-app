import {ErrorHandler, api} from '../../api';
import {
  CreatePresignedUrlResponse,
  ReadUserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
  UserProfile,
} from './dtos';

const basePath = '/user_profiles/v1';

const toUserProfile = (res: any): UserProfile => res;

const createPresignedUrl = async (
  onError?: ErrorHandler,
): Promise<CreatePresignedUrlResponse> => {
  return await api<CreatePresignedUrlResponse>({
    endpoint: `${basePath}/avatar`,
    method: 'POST',
    onError,
  });
};

const readUserProfile = async (
  user_id: string,
  onError?: ErrorHandler,
): Promise<ReadUserProfileResponse> => {
  const res = await api<ReadUserProfileResponse>({
    endpoint: `${basePath}/${user_id}`,
    method: 'GET',
    onError,
  });

  return {
    user_profile: toUserProfile(res.user_profile),
  };
};

const updateUserProfile = async (
  data: UpdateUserProfileRequest,
  onError?: ErrorHandler,
): Promise<UpdateUserProfileResponse> => {
  const res = await api<UpdateUserProfileResponse>({
    endpoint: `${basePath}`,
    method: 'PUT',
    data,
    onError,
  });

  return {
    user_profile: toUserProfile(res.user_profile),
  };
};

export const UserProfileAPI = {
  createPresignedUrl,
  get: readUserProfile,
  update: updateUserProfile,
};
