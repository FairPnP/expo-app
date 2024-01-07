import {HttpError, api} from '@/common';
import {CreateAccountResponse, ReadAccountResponse} from './dtos';

const basePath = '/stripe/v1';

const dashboard = (): Promise<CreateAccountResponse | HttpError> => {
  return api({
    endpoint: `${basePath}/account/dashboard`,
    method: 'POST',
  });
};

const readAccount = (): Promise<ReadAccountResponse | HttpError> => {
  return api({
    endpoint: `${basePath}/account`,
    method: 'GET',
  });
};

export const StripeAPI = {
  dashboard,
  getAccount: readAccount,
};
