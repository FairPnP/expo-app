import {useState, useEffect} from 'react';
import {fetchAuthSession, AuthTokens} from 'aws-amplify/auth';

export const useAccessToken = (): AuthTokens | undefined => {
  const [getTokens, setTokens] = useState<AuthTokens | undefined>(undefined);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const tokens: AuthTokens | undefined = (await fetchAuthSession())
          .tokens;
        setTokens(tokens);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    fetchAccessToken();
  }, []);

  return getTokens;
};
