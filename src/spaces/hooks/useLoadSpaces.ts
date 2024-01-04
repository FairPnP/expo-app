import {BuildingAPI, buildingsState} from '@/buildings';
import {useCallback, useState} from 'react';
import {useRecoilState} from 'recoil';
import {mySpotsState} from '../state';
import {SpaceAPI} from '../api';

export const useLoadSpaces = () => {
  const [spaces, setSpaces] = useRecoilState(mySpotsState);
  const [buildings, setBuildings] = useRecoilState(buildingsState);
  const [isLoading, setLoading] = useState(false);

  const fetchBuildings = useCallback(
    async buildingIds => {
      try {
        const response = await BuildingAPI.list({ids: buildingIds});
        setBuildings(response.buildings);
      } catch (error) {
        console.error('Error fetching buildings:', error);
      }
    },
    [setBuildings],
  );

  const refreshSpaces = useCallback(async () => {
    setLoading(true);
    try {
      const spacesResponse = await SpaceAPI.list({});
      setSpaces(spacesResponse.spaces);

      const buildingIds = spacesResponse.spaces.map(space => space.building_id);
      if (buildingIds.length > 0) {
        await fetchBuildings(buildingIds);
      }
    } catch (error) {
      console.error('Error fetching spaces and buildings:', error);
    } finally {
      setLoading(false);
    }
  }, [setSpaces, fetchBuildings]);

  return {spaces, buildings, refreshSpaces, isLoading};
};
