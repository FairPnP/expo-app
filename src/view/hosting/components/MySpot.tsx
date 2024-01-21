import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Building, Space} from '@/api';
import {SpaceCard} from '@/view/shared';

export type MySpotProps = {
  building: Building;
  mySpot: Space;
  onPress: (space: Space, building: Building) => void;
};

export const MySpot = ({building, mySpot, onPress}: MySpotProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(mySpot, building)}>
      <SpaceCard building={building} space={mySpot} />
    </TouchableOpacity>
  );
};
