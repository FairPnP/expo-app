import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {fetchAuthSession} from '@aws-amplify/auth';

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

export type HttpError = {
  status: number;
  message: string;
};

export const isHttpError = (error: any): error is HttpError => {
  return error.status !== undefined;
};

const getAccessToken = async (): Promise<string | undefined> => {
  try {
    return (await fetchAuthSession())?.tokens?.accessToken.toString();
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

interface ApiOptions {
  endpoint: string;
  method: string;
  data?: any;
}

export const api = async <T>({
  endpoint,
  method,
  data = null,
}: ApiOptions): Promise<T | HttpError> => {
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
    console.log('API call error: ', error.message);
    if (!error.response) {
      throw error;
    }

    // Construct an HttpError and return it
    const httpError: HttpError = {
      status: error.response.status,
      message: error.message,
    };
    return httpError;
  }
};
