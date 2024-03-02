import { ErrorHandler, apiStripe } from '../../api';
import {
  CreatePaymentIntentRequest,
  CreatePaymentIntentResponse,
} from './dtos';

const basePath = '/payments/v1';

const createPaymentIntent = async (
  data: CreatePaymentIntentRequest,
  onError?: ErrorHandler,
): Promise<CreatePaymentIntentResponse> => {
  let res = await apiStripe<CreatePaymentIntentResponse>({
    endpoint: `${basePath}`,
    method: 'POST',
    data,
    onError,
  });

  return res;
};

export const StripePaymentsAPI = {
  createPaymentIntent,
};
