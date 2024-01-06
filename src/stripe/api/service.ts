import {api} from '@/common';
import {CreateAccountResponse, ReadAccountResponse} from './dtos';

const basePath = '/stripe/v1';

const createAccount = async (): Promise<CreateAccountResponse> => {
  return await api({
    endpoint: `${basePath}/account`,
    method: 'POST',
  });
};

const readAccount = async (): Promise<ReadAccountResponse> => {
  return api({
    endpoint: `${basePath}/account`,
    method: 'GET',
  });
};

export const StripeAPI = {
  createAccount,
  getAccount: readAccount,
};
