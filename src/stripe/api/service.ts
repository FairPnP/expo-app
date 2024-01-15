import {ErrorHandler, api} from '@/common';
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
    endpoint: `${basePath}/accounts/dashboard`,
    method: 'POST',
  });

  await WebBrowser.openBrowserAsync(res.link);
};

const validateAccount = async (): Promise<boolean> => {
  let res = await api<ValidateAccountResponse>({
    endpoint: `${basePath}/accounts/validate`,
    method: 'GET',
  });

  return res.is_valid;
};

const readAccount = async (
  onError?: ErrorHandler,
): Promise<ReadAccountResponse> => {
  return await api({
    endpoint: `${basePath}/accounts`,
    method: 'GET',
    onError,
  });
};

const createPaymentIntent = async (
  data: CreatePaymentIntentRequest,
  onError?: ErrorHandler,
): Promise<CreatePaymentIntentResponse> => {
  let res = await api<CreatePaymentIntentResponse>({
    endpoint: `${basePath}/payments`,
    method: 'POST',
    data,
    onError,
  });

  return res;
};

export const StripeAPI = {
  showDashboard,
  validateAccount,
  createPaymentIntent,
  getAccount: readAccount,
};
