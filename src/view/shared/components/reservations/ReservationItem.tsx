import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme, AppTheme } from '@/view/theme';
import { Reservation } from '@/api';
import { useBuilding, useSpace } from '@/state';
import { Card, HorizontalGroup, ImageDownload, Text, Title, VerticalGroup } from '../common';
import { toMinimalDateRange } from '@/utils';

export type ReservationItemProps = {
  reservation: Reservation;
};

export const ReservationItem = ({ reservation }: ReservationItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const navigation = useNavigation() as any;
  const { data: space } = useSpace(reservation.space_id);
  const { data: building } = useBuilding(space?.building_id);

  const onPress = useCallback(() => {
    if (!reservation) {
      return;
    }
    navigation.navigate('ReservationDetails', { reservation_id: reservation.id });
  }, [reservation, navigation]);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <TouchableOpacity onPress={onPress}>
          <HorizontalGroup>
            <ImageDownload
              url={space?.img_urls?.[0]}
              style={styles.image}
              imageStyle={styles.image}
            />
            <VerticalGroup style={styles.textContainer}>
              <View>
                <Title>{building?.name}</Title>
                <Text>{building?.city}, {building?.state}, {building?.country}</Text>
              </View>
              <View>
                <Text>{toMinimalDateRange(reservation.start_date, reservation.end_date)}</Text>
              </View>
            </VerticalGroup>
          </HorizontalGroup>
        </TouchableOpacity>
      </Card>
    </View>
  );
};


const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 8,
    },
    card: {
      backgroundColor: theme.colors.background,
      height: 100,
      padding: 0,
    },
    image: {
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      width: 100,
      height: 100,
    },
    textContainer: {
      flex: 1,
      padding: 8,
      height: 100,
    },
  });
