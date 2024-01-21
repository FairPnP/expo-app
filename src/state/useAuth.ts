import {useState, useEffect, useCallback} from 'react';
import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {AuthTokens, fetchAuthSession} from '@aws-amplify/auth';
import {useQueryClient} from '@tanstack/react-query';

export const useAuth = () => {
  const [tokens, setTokens] = useState<AuthTokens | undefined>(undefined);
  const {signOut: signOutAmplify} = useAuthenticator(context => [context.user]);
  const queryClient = useQueryClient();

  const fetchAccessToken = useCallback(async () => {
    try {
      const tokens: AuthTokens | undefined = (await fetchAuthSession()).tokens;
      setTokens(tokens);
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
      queryClient.clear();
      setTokens(undefined);
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  }, [signOutAmplify, queryClient]);

  return {
    tokens,
    signOut,
    fetchAccessToken,
    userId: tokens?.idToken.payload.sub,
  };
};
