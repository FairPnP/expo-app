import { ErrorHandler, apiStripe } from '../../api';
import {
  ShowDashboardResponse,
  ReadAccountResponse,
  ValidateAccountResponse,
} from './dtos';
import * as WebBrowser from 'expo-web-browser';

const basePath = '/accounts/v1';

const showDashboard = async (): Promise<void> => {
  let res = await apiStripe<ShowDashboardResponse>({
    endpoint: `${basePath}/dashboard`,
    method: 'POST',
  });

  await WebBrowser.openBrowserAsync(res.link);
};

const validateAccount = async (): Promise<boolean> => {
  let res = await apiStripe<ValidateAccountResponse>({
    endpoint: `${basePath}/validate`,
    method: 'GET',
  });

  return res.is_valid;
};

const readAccount = async (
  onError?: ErrorHandler,
): Promise<ReadAccountResponse> => {
  return await apiStripe({
    endpoint: `${basePath}`,
    method: 'GET',
    onError,
  });
};

export const StripeAccountsAPI = {
  showDashboard,
  validateAccount,
  getAccount: readAccount,
};
