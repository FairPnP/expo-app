import { useState, useCallback } from 'react';
import * as Updates from 'expo-updates';

export const useUpdates = () => {
  const [isLoading, setIsLoading] = useState(false);

  const checkAndApplyUpdates = useCallback(async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        setIsLoading(true);
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        setIsLoading(false);
      }
    } catch (error) {
      alert(`Error fetching latest Expo update: ${error}`);
    } finally {
    }
  }, []);

  return { isLoading, checkAndApplyUpdates };
};


