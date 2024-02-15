import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import {
  Button,
  Text,
  ImageDownload,
  HorizontalGroup,
  VerticalGroup,
} from '@/view/shared';
import { useNavigation } from '@react-navigation/native';
import { Availability, Building, Space, getAvailabilityCost } from '@/api';
import { useTheme, AppTheme } from '@/view/theme';

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
  const navigation = useNavigation<any>();

  const handleBooking = useCallback(async () => {
    // const props: ConfirmReservationScreenProps = {
    //   building,
    //   space,
    //   startTimestamp: startDate.getTime(),
    //   endTimestamp: endDate.getTime(),
    //   hourly_rate: availability.hourly_rate,
    // };
    // (navigation as any).navigate('ConfirmReservation', props);
    navigation.navigate('ViewSpot', { building, space });
  }, [building, space, availability, startDate, endDate]);

  return (
    <View style={styles.container}>
      <HorizontalGroup>
        <ImageDownload
          url={space?.img_urls?.[0]}
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
              <Text>View</Text>
            </Button>
          </View>
        </View>
      </HorizontalGroup>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
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
