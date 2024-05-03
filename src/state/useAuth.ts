import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {useState, useEffect, useCallback} from 'react';
import {AuthTokens, fetchAuthSession} from '@aws-amplify/auth';
import {useQueryClient} from '@tanstack/react-query';
import {useStripe} from '@stripe/stripe-react-native';

export const useAuth = () => {
  const [tokens, setTokens] = useState<AuthTokens | undefined>(undefined);
  const {signOut: signOutAmplify} = useAuthenticator(context => [context.user]);
  const {resetPaymentSheetCustomer} = useStripe();
  const queryClient = useQueryClient();

  const fetchAccessToken = useCallback(async () => {
    try {
      const authTokens: AuthTokens | undefined = (await fetchAuthSession())
        .tokens;
      setTokens(authTokens);
    } catch (error) {
      console.error('Error fetching access token:', error);
      setTokens(undefined);
    }
  }, []);

  useEffect(() => {
    fetchAccessToken();
  }, [fetchAccessToken]);

  const signOut = useCallback(() => {
    try {
      signOutAmplify();
      queryClient.removeQueries();
      queryClient.clear();
      setTokens(undefined);
      resetPaymentSheetCustomer();
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  }, [signOutAmplify, queryClient]);

  return {
    tokens,
    signOut,
    fetchAccessToken,
    userId: tokens?.idToken?.payload.sub,
  };
};
