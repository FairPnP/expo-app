import { ErrorHandler, api } from '../../api';
import {
  CreateUserNotifTokenRequest
} from './dtos';

const basePath = '/user_notifs/v1';

const updateToken = async (
  data: CreateUserNotifTokenRequest,
  onError?: ErrorHandler,
): Promise<void> => {
  await api({
    endpoint: `${basePath}/token`,
    method: 'POST',
    data,
    onError,
  });

};

export const UserNotifsAPI = {
  updateToken
};
