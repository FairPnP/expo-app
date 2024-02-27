import { useState, useCallback } from 'react';
import * as Updates from 'expo-updates';

export const useUpdates = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkAndApplyUpdates = useCallback(async (prompt?: boolean) => {
    if (__DEV__) {
      if (prompt) {
        alert('Cannot check for updates in development mode');
      }
      return;
    }

    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setIsLoading(true);
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        setIsLoading(false);
      } else if (prompt) {
        alert('No updates available');
      }
    } catch (error) {
      alert(`Error fetching latest Expo update: ${error}`);
    } finally {
    }
  }, []);

  return { isLoading, checkAndApplyUpdates };
};


