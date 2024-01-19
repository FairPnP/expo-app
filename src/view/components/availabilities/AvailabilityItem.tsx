import React, {useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, AppTheme} from '@/view/theme';
import {Availability} from '@/api';
import {useBuildings, useMySpaces} from '@/state';
import {Text} from '../common';

export type AvailabilityItemProps = {
  availability: Availability;
};

export const AvailabilityItem = ({availability}: AvailabilityItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {spaceMap} = useMySpaces();
  const {buildingMap} = useBuildings(Object.keys(spaceMap));

  const space = useMemo(
    () => spaceMap?.[availability.space_id],
    [spaceMap, availability.space_id],
  );
  const building = useMemo(
    () => buildingMap?.[space?.building_id],
    [buildingMap, space?.building_id],
  );

  return (
    <View style={styles.container}>
      <Text>{building?.name}</Text>
      <Text>{space?.name}</Text>
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
