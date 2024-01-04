import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {fetchAuthSession} from '@aws-amplify/auth';

const apiBaseUrl: string = 'https://api-dev.fairpnp.com';
// const apiBaseUrl: string = 'http://10.0.2.2:3000';

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const api = async ({
  endpoint,
  method,
  data = null,
}: ApiOptions): Promise<any> => {
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

    const response: AxiosResponse = await apiClient(config);

    return response.data;
  } catch (error: any) {
    // Log and rethrow unexpected errors
    console.error('API call url:', url);
    console.error('API call error: ', error.message);
    throw error;
  }
};
