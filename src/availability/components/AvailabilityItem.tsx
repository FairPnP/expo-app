import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {AppTheme, Text, useTheme} from '@/common';
import {Availability} from '../api';
import {useLoadSpaces} from '@/spaces';

export type AvailabilityItemProps = {
  availability: Availability;
};

export const AvailabilityItem = ({availability}: AvailabilityItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {buildings, spaces} = useLoadSpaces();

  const space = useMemo(
    () => spaces.find(s => s.id === availability.space_id),
    [spaces, availability.space_id],
  );
  const building = useMemo(
    () => buildings.find(b => b.id === space?.building_id),
    [buildings, space?.building_id],
  );

  return (
    <View style={styles.container}>
      <Text>{building.name}</Text>
      <Text>{space.name}</Text>
      <Text>
        {`Start: ${availability.start_date.toDateString()} - ${availability.start_date
          .toTimeString()
          .substring(0, 5)}`}
      </Text>

      <Text>
        {`End:  ${availability.end_date.toDateString()} - ${availability.end_date
          .toTimeString()
          .substring(0, 5)}`}
      </Text>
      <Text>{'$' + availability.hourly_rate.toFixed(2)}</Text>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: theme.colors.card,
      borderRadius: 8,
    },
  });
