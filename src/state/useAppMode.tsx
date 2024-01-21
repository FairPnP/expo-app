import React, {createContext, useContext, useEffect, useState} from 'react';
import {getMmkv} from '@/api'; // Import your MMKV initialization logic
import {useAuth} from './useAuth';

type AppMode = 'parking' | 'hosting';

const AppModeContext = createContext({
  appMode: 'parking' as AppMode,
  setAppMode: (mode: AppMode) => {},
});

export const useAppMode = () => useContext(AppModeContext);

export const AppModeProvider = ({children}) => {
  const {userId} = useAuth();

  // Default mode is 'parking', but check MMKV for any previously saved mode
  const [appMode, setAppMode] = useState<AppMode>(() => {
    const mmkv = getMmkv(userId);
    return (mmkv.getString('appMode') as AppMode) || 'parking';
  });

  // Update MMKV whenever appMode changes
  useEffect(() => {
    const mmkv = getMmkv('appMode');
    mmkv.set('appMode', appMode);
  }, [appMode]);

  return (
    <AppModeContext.Provider value={{appMode, setAppMode}}>
      {children}
    </AppModeContext.Provider>
  );
};
