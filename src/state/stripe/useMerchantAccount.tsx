import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MERCHANT_QUERY_KEY, STRIPE_QUERY_KEY } from "./consts";
import { StripeAPI } from "@/api";

export const useMerchantAccount = () => {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: [STRIPE_QUERY_KEY, MERCHANT_QUERY_KEY] });
  }
  const query = useQuery({
    queryKey: [STRIPE_QUERY_KEY, MERCHANT_QUERY_KEY],
    queryFn: async () => {
      let res = await StripeAPI.getAccount({
        404: () => null,
      });

      return res;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return { ...query, invalidateCache };
};

