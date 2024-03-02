import { MERCHANT_QUERY_KEY, STRIPE_QUERY_KEY } from "./consts";
import { useQuery } from "@tanstack/react-query";

export const useValidateMerchant = () => {
  return useQuery({
    queryKey: [STRIPE_QUERY_KEY, MERCHANT_QUERY_KEY, 'validate'],
    queryFn: async () => {
      // let isValid = await StripeAccountsAPI.validateAccount();
      return { isValid: true };
    },
  });
};
