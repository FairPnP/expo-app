import {MMKV} from 'react-native-mmkv';

export const mmkvMap = new Map<string, MMKV>();

export const getMmkv = (userId: string) => {
  const key = userId ?? 'default';
  let mmkv = mmkvMap.get(key);
  if (!mmkv) {
    mmkv = new MMKV({id: key});
    mmkvMap.set(key, mmkv);
  }
  return mmkv;
};
