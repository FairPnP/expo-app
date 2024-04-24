import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, AppTheme} from '@/view/theme';
import {Availability} from '@/api';
import {Text} from '../common';

export type AvailabilityItemProps = {
  availability: Availability;
};

export const AvailabilityItem = ({availability}: AvailabilityItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
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
