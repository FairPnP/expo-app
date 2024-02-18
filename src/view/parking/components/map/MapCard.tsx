import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback } from 'react';
import {
  Text,
  ImageDownload,
  HorizontalGroup,
  ReviewStars,
} from '@/view/shared';
import { useNavigation } from '@react-navigation/native';
import { Availability, Building, Space, getAvailabilityCost } from '@/api';
import { useTheme, AppTheme } from '@/view/theme';
import { useSearchState, useSpaceSummary } from '@/state';
import { toMinimalDateRange } from '@/utils';

type Props = {
  building: Building;
  space: Space;
  availability: Availability;
  startDate: Date;
  endDate: Date;
  style?: any;
};

export const MapCard = ({
  building,
  space,
  availability,
  startDate,
  endDate,
  style,
}: Props) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const navigation = useNavigation<any>();

  const { data: summary } = useSpaceSummary(space?.id);
  const sb = useSearchState();

  const handleBooking = useCallback(async () => {
    navigation.navigate('ViewSpot', { building, space });
  }, [building, space, availability, startDate, endDate]);

  return (
    <TouchableWithoutFeedback onPress={handleBooking}>
      <View style={[styles.container, style]}>
        <HorizontalGroup>
          <ImageDownload
            url={space?.img_urls?.[0]}
            style={styles.image}
            imageStyle={styles.image}
          />
          <View style={styles.infoContainer}>
            <View>
              <Text style={{ fontWeight: 'bold' }}>{building.name}</Text>
              <Text>{space?.name}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: 'bold' }}>{`$${getAvailabilityCost(
                availability.hourly_rate,
                startDate,
                endDate,
              ).toFixed(2)}`} </Text>
              <Text style={{ fontSize: 14 }}>{toMinimalDateRange(sb.startDate, sb.endDate)}</Text>
            </View>
          </View>
          <View style={styles.rightInfo}>
            <ReviewStars stars={summary?.average_stars} />
          </View>
        </HorizontalGroup>
      </View>
    </TouchableWithoutFeedback>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: 120,
      borderRadius: 8,
      backgroundColor: theme.colors.background,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
    infoContainer: {
      flex: 1,
      height: 120,
      padding: 10,
      alignContent: 'space-between',
      justifyContent: 'space-between',
    },
    rightInfo: {
      padding: 10,
      height: '100%',
      alignContent: 'flex-end',
    },
    image: {
      width: 120,
      height: 120,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
  });
