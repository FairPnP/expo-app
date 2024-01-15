import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {fetchAuthSession} from '@aws-amplify/auth';
import axiosRetry from 'axios-retry';
import Toast from 'react-native-toast-message';

const apiBaseUrl: string = 'https://api-dev.fairpnp.com';
// const apiBaseUrl: string = 'http://10.0.2.2:3000';
// const apiBaseUrl: string = 'http://192.168.86.40:3000';
// const apiBaseUrl: string = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosRetry(apiClient, {retries: 3, retryDelay: axiosRetry.exponentialDelay});

const getAccessToken = async (): Promise<string | undefined> => {
  try {
    return (await fetchAuthSession())?.tokens?.accessToken.toString();
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

export type HttpError = {
  status: number;
  data: any;
};

export type ErrorHandler =
  | ((error: HttpError) => {handled: boolean; data?: any})
  | {[status: number]: (error: HttpError) => any};

interface ApiOptions<T> {
  endpoint: string;
  method: string;
  data?: any;
  onError?: ErrorHandler;
}

export const api = async <T>({
  endpoint,
  method,
  data = null,
  onError,
}: ApiOptions<T>): Promise<T> => {
  const url = `api${endpoint}`;
  console.log('API call', method, url);
  try {
    const accessToken: string | undefined = await getAccessToken();

    const config: AxiosRequestConfig = {
      url,
      method: method,
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response: AxiosResponse<T> = await apiClient(config);

    return response.data;
  } catch (error: any) {
    if (!error.response) {
      // Network error (no response received)
      Toast.show({
        type: 'error',
        text1: 'Netword Error',
        text2: 'Please check your internet connection and try again.',
      });

      throw error;
    }

    if (onError) {
      const httpError: HttpError = {
        status: error.response.status,
        data: error.response.data,
      };

      if (onError[httpError.status]) {
        // Error handled by status code
        return onError[httpError.status](httpError);
      }

      if (onError instanceof Function) {
        // Error handled by generic handler
        const result = onError(httpError) as {handled: boolean; data?: T};
        if (result.handled) {
          // Error handled, no further action needed
          return result.data;
        }
      }
    }

    // Log unhandled errors
    console.error('Unhandled API error:', error);
    Toast.show({
      type: 'error',
      text1: 'An unexpected error occurred',
      text2: 'Please try again later',
    });
    throw error;
  }
};
