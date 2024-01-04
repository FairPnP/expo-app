import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {AvailabilityData} from './AvailabilityMap';
import {
  HorizontalGroup,
  VerticalGroup,
  Button,
  Text,
  useTheme,
  AppTheme,
  ImageDownload,
} from '@/common';
import {getAvailabilityCost} from '../api';
import {Space, SpaceAPI} from '@/spaces';
import {set} from 'react-hook-form';

type Props = {
  markerData: AvailabilityData;
  startDate: Date;
  endDate: Date;
  onHandleBooking: () => void;
};

export const MapCard = ({
  markerData,
  startDate,
  endDate,
  onHandleBooking,
}: Props) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const [space, setSpace] = useState<Space>(null);

  const getSpace = useCallback(async () => {
    const res = await SpaceAPI.read(markerData.space.id);
    setSpace(res.space);
  }, [markerData.space.id]);

  useEffect(() => {
    getSpace();
  }, [getSpace]);

  if (!space) {
    return null;
  }

  return (
    <View style={styles.bottomCard}>
      <HorizontalGroup>
        <ImageDownload
          url={space?.picture_url}
          style={styles.image}
          imageStyle={styles.image}
        />
        <View style={styles.infoContainer}>
          <VerticalGroup>
            <Text>{markerData.building.name}</Text>
            <Text>{space.name}</Text>
            <Text>{space.coverage}</Text>
            <Text>{`$${getAvailabilityCost(
              markerData.availability,
              startDate,
              endDate,
            ).toFixed(2)}`}</Text>
          </VerticalGroup>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={onHandleBooking}>
              Claim Spot
            </Button>
          </View>
        </View>
      </HorizontalGroup>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    bottomCard: {
      position: 'absolute',
      bottom: 24,
      left: 10,
      right: 10,
      backgroundColor: theme.colors.card,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
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
