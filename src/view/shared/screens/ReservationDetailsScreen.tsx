import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme, AppTheme } from '@/view/theme';
import { useAppMode, useBuilding, useReservation, useSpace } from '@/state';
import { Title, Text, LoadingSpinner, ImageSwiper, HorizontalGroup, VerticalGroup, IconButton, StaticMap, Section, UserProfileLabel, ModalRef } from '../components';
import { openMap } from '@/utils/maps';
import { toFullDateString, toTimeString } from '@/utils';
import { Ionicons } from '@expo/vector-icons';
import { ReservationReviewModal } from './ReservationReviewModal';

export type ReservationDetailsScreenProps = {
  reservation_id: number;
};

export const ReservationDetailsScreen = ({ navigation, route }) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const { appMode } = useAppMode();
  const otherUser = appMode === 'hosting' ? 'Guest' : 'Host';

  const { reservation_id } = route.params as ReservationDetailsScreenProps;
  const { data: reservation } = useReservation(reservation_id);
  const { data: space } = useSpace(reservation?.space_id);
  const { data: building } = useBuilding(space?.building_id);
  const reviewModalRef = React.createRef<ModalRef>();

  if (!reservation || !space || !building) {
    return <LoadingSpinner />;
  }

  const onChatButtonPressed = () => {
    navigation.navigate('ReservationChat', { reservation_id: reservation?.id });
  };

  const onDirectionsPressed = () => {
    openMap(building.name, building.latitude, building.longitude);
  }

  const onGetHelpPressed = () => {
    console.log('Get Help Pressed');
  }

  const onViewListingPressed = () => {
    navigation.navigate('ViewSpot', { building, space });
  }

  const onReviewPressed = () => {
    reviewModalRef.current?.show();
  };

  const onViewReceiptPressed = () => {
    console.log('View Receipt Pressed');
  }

  const onChangeReservationPressed = () => {
    console.log('Change Reservation Pressed');
  }

  const onCancelReservationPressed = () => {
    console.log('Cancel Reservation Pressed');
  }

  const window = Dimensions.get('window');
  const width = Math.round(Math.min(window.width - 32, window.height * 0.6));
  const height = Math.round(width * 0.75);

  const isOld = reservation.end_date.getTime() < Date.now();

  return (
    <ScrollView>
      <ReservationReviewModal ref={reviewModalRef} reservation_id={reservation.id} />
      <View style={[styles.content, { width: width }]}>
        <View style={styles.titleArea}>
          <Title>{building.name}</Title>
          <Text>{building.city}, {building.state}, {building.country}</Text>
          <Text>{space.name}</Text>
        </View>
        <View style={styles.imageContainer}>
          <ImageSwiper urls={space.img_urls} width={width} height={height} />
        </View>
        <View style={styles.infoArea}>
          <HorizontalGroup>
            <VerticalGroup>
              <Title style={{ marginBottom: 8 }}>Reserved From</Title>
              <Text>{toFullDateString(reservation.start_date)}</Text>
              <Text>{toTimeString(reservation.start_date)}</Text>
            </VerticalGroup>
            <View style={styles.verticalSeparator} />
            <VerticalGroup style={{ justifyContent: 'flex-end' }}>
              <Title style={{ marginBottom: 8 }}>Reserved Until</Title>
              <Text>{toFullDateString(reservation.end_date)}</Text>
              <Text>{toTimeString(reservation.end_date)}</Text>
            </VerticalGroup>
          </HorizontalGroup>
        </View>
        <View style={styles.horizontalSeparator} />
        <View style={styles.buttonArea}>
          {!isOld && appMode === 'parking' &&
            <IconButton
              text="Get Directions"
              onPress={onDirectionsPressed}
              iconComponent={<Ionicons name="location-outline" size={24} />}
            />}
          <IconButton
            text="Give Review"
            onPress={onReviewPressed}
            iconComponent={<Ionicons name="star-outline" size={24} />}
          />
          <IconButton
            text={`Message ${otherUser}`}
            onPress={onChatButtonPressed}
            iconComponent={<Ionicons name="chatbox-outline" size={24} />}
          />
          <IconButton
            text="View Listing"
            onPress={onViewListingPressed}
            iconComponent={<Ionicons name="eye-outline" size={24} />}
          />
          <IconButton
            text="View Receipt"
            onPress={onViewReceiptPressed}
            iconComponent={<Ionicons name="receipt-outline" size={24} />}
          />
          <IconButton
            text="Get Help"
            onPress={onGetHelpPressed}
            iconComponent={<Ionicons name="help-circle-outline" size={24} />}
          />
        </View>
        <View style={styles.horizontalSeparator} />
        <Section style={{ marginVertical: 16 }} title="Location">
          <StaticMap
            key={width}
            lat={building.latitude}
            lng={building.longitude}
            width={width}
            height={height}
          />
        </Section>
        <View style={styles.horizontalSeparator} />
        <Section style={{ marginVertical: 16 }} title="Reservation">
          <UserProfileLabel style={{ marginBottom: 8 }} userId={space.user_id} namePrefix="Hosted by " />
          <View style={{ marginVertical: 16 }}>
            <Title>Confirmation Code</Title>
            <Text>{reservation.id}</Text>
          </View>
          <View style={{ marginVertical: 16 }}>
            <Title>Cancellation Policy</Title>
            <Text>TODO: Cancellation policy</Text>
          </View>
          {appMode === 'parking' &&
            <IconButton
              text="Change Reservation"
              onPress={onChangeReservationPressed}
              iconComponent={<Ionicons name="calendar-outline" size={24} />}
            />}
          <IconButton
            text="Cancel Reservation"
            onPress={onCancelReservationPressed}
            iconComponent={<Ionicons name="remove-circle-outline" size={24} />}
          />
        </Section>
      </View>
    </ScrollView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    content: {
      alignSelf: 'center',
      paddingVertical: 16,
    },
    titleArea: {
      alignContent: 'center',
      alignItems: 'center',
      marginBottom: 32,
    },
    imageContainer: {
      alignSelf: 'center',
      borderRadius: 16,
      overflow: 'hidden',
    },
    infoArea: {
      paddingVertical: 24,
    },
    horizontalSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      width: '100%',
    },
    verticalSeparator: {
      borderRightWidth: 1,
      borderRightColor: theme.colors.border,
      height: '100%'
    },
    buttonArea: {
      marginVertical: 12,
    },
  });
