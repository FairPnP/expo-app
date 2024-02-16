import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { fetchAuthSession } from '@aws-amplify/auth';
import axiosRetry from 'axios-retry';
import Toast from 'react-native-toast-message';

// const apiBaseUrl: string = 'https://api-dev.fairpnp.com';
// const apiBaseUrl: string = 'http://10.0.2.2:3000';
// const apiBaseUrl: string = 'http://192.168.86.40:3000';
// const apiBaseUrl: string = 'http://localhost:3000';
const apiBaseUrl: string = 'http://192.168.0.114:3000';

const apiClient = axios.create({
  baseURL: apiBaseUrl,
});
axiosRetry(apiClient, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

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

export type ErrorHandler<T = any> =
  | ((error: HttpError) => { handled: boolean; data?: T })
  | { [status: number]: (error: HttpError) => Promise<T> | T };

interface ApiOptions<T> {
  endpoint: string;
  method: string;
  data?: any;
  onError?: ErrorHandler<T>;
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

    // Initialize headers with Authorization
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Add 'Content-Type' header for requests with a body
    if (['POST', 'PUT', 'PATCH'].includes(method.toUpperCase())) {
      headers['Content-Type'] = 'application/json';
    }

    const config: AxiosRequestConfig = {
      url,
      method: method,
      data: data,
      headers: headers,
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

      console.error('Network error:', method, url);

      throw error;
    }

    if (onError) {
      const httpError: HttpError = {
        status: error.response.status,
        data: error.response.data,
      };

      if (onError[httpError.status]) {
        // Call the function associated with the status code
        const result = onError[httpError.status](httpError);

        // If the result is a Promise, wait for it to resolve
        if (result instanceof Promise) {
          return await result;
        }

        // Otherwise, return the result
        return result;
      }

      if (onError instanceof Function) {
        // Error handled by generic handler
        const result = onError(httpError) as { handled: boolean; data?: T };
        if (result.handled) {
          // Error handled, no further action needed
          return result.data;
        }
      }
    }

    // Log unhandled errors
    console.error('Unhandled API error:', method, url, error);
    Toast.show({
      type: 'error',
      text1: 'An unexpected error occurred',
      text2: 'Please try again later',
    });
    throw error;
  }
};
