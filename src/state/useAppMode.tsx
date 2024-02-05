import React, {createContext, useContext, useEffect, useState} from 'react';
import {getMmkv} from '@/api'; // Import your MMKV initialization logic
import {useAuth} from './useAuth';

type AppMode = 'parking' | 'hosting';

const AppModeContext = createContext({
  appMode: 'parking' as AppMode,
  setAppMode: (mode: AppMode) => {},
  isLoading: true,
});

export const useAppMode = () => useContext(AppModeContext);

export const AppModeProvider = ({children}) => {
  const {userId} = useAuth();
  const [appMode, setAppMode] = useState<AppMode>('parking');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure userId is not undefined/null before attempting to get or set MMKV data
    if (userId) {
      const mmkv = getMmkv(userId);
      const savedMode = mmkv.getString('appMode') as AppMode;
      if (savedMode) {
        setAppMode(savedMode);
      }
    }

    setIsLoading(userId === undefined);
  }, [userId]);

  // Update MMKV whenever appMode changes
  useEffect(() => {
    if (userId && appMode) {
      const mmkv = getMmkv(userId);
      mmkv.set('appMode', appMode);
    }
  }, [appMode, userId]);

  return (
    <AppModeContext.Provider value={{appMode, setAppMode, isLoading}}>
      {children}
    </AppModeContext.Provider>
  );
};
