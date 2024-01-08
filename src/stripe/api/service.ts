import {HttpError, api, isHttpError} from '@/common';
import {
  ShowDashboardResponse,
  ReadAccountResponse,
  ValidateAccountResponse,
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
} from './dtos';
import * as WebBrowser from 'expo-web-browser';

const basePath = '/stripe/v1';

const showDashboard = async (): Promise<void> => {
  let res = await api<ShowDashboardResponse>({
    endpoint: `${basePath}/account/dashboard`,
    method: 'POST',
  });

  if (!isHttpError(res)) {
    await WebBrowser.openBrowserAsync(res.link);
  }
};

const validateAccount = async (): Promise<boolean> => {
  let res = await api<ValidateAccountResponse>({
    endpoint: `${basePath}/account/validate`,
    method: 'GET',
  });

  if (!isHttpError(res)) {
    return res.is_valid;
  }

  return false;
};

const readAccount = (): Promise<ReadAccountResponse | HttpError> => {
  return api({
    endpoint: `${basePath}/account`,
    method: 'GET',
  });
};

const createPaymentIntent = async (
  data: CreatePaymentIntentRequest,
): Promise<CreatePaymentIntentResponse> => {
  let res = await api<CreatePaymentIntentResponse>({
    endpoint: `${basePath}/payments`,
    method: 'POST',
    data,
  });

  if (isHttpError(res)) {
    throw res;
  }

  return res;
};

export const StripeAPI = {
  showDashboard,
  validateAccount,
  createPaymentIntent,
  getAccount: readAccount,
};
