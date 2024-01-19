import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {
  Button,
  Text,
  ImageDownload,
  HorizontalGroup,
  VerticalGroup,
} from '../common';
import {useNavigation} from '@react-navigation/native';
import {Availability, Building, Space, getAvailabilityCost} from '@/api';
import {useTheme, AppTheme} from '@/view/theme';
import {ConfirmReservationScreenProps} from '../reservations';

type Props = {
  building: Building;
  space: Space;
  availability: Availability;
  startDate: Date;
  endDate: Date;
};

export const MapCard = ({
  building,
  space,
  availability,
  startDate,
  endDate,
}: Props) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const navigation = useNavigation();

  const handleBooking = useCallback(async () => {
    const props: ConfirmReservationScreenProps = {
      building,
      space,
      startTimestamp: startDate.getTime(),
      endTimestamp: endDate.getTime(),
      hourly_rate: availability.hourly_rate,
    };
    (navigation as any).navigate('ConfirmReservation', props);
  }, [building, space, availability, startDate, endDate]);

  return (
    <View>
      <HorizontalGroup>
        <ImageDownload
          url={space?.picture_url}
          style={styles.image}
          imageStyle={styles.image}
        />
        <View style={styles.infoContainer}>
          <VerticalGroup>
            <Text>{building.name}</Text>
            <Text>{space?.name}</Text>
            <Text>{space?.coverage}</Text>
            <Text>{`$${getAvailabilityCost(
              availability.hourly_rate,
              startDate,
              endDate,
            ).toFixed(2)}`}</Text>
          </VerticalGroup>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={handleBooking}>
              <Text>Claim Spot</Text>
            </Button>
          </View>
        </View>
      </HorizontalGroup>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    infoContainer: {
      padding: 10,
      flexDirection: 'row',
      alignContent: 'space-between',
      justifyContent: 'space-between',
      flex: 1,
    },
    buttonContainer: {
      justifyContent: 'center',
    },
    button: {
      width: 80,
      height: 40,
    },
    image: {
      width: 110,
      height: 110,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
  });
