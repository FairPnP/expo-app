import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Building} from '@/buildings';
import {Space} from '@/spaces';
import {SpaceCard} from './SpaceCard';

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
