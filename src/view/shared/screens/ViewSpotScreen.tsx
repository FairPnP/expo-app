import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ScaledSize,
} from 'react-native';
import {
  Title,
  Text,
  Button,
  Section,
  HorizontalGroup,
  ReviewsLabel,
  ReviewStars,
  UserProfileLabel,
  StaticMap,
  VerticalGroup,
  TextLink,
  CircleButton,
} from '../components';
import { Building, Space, getAvailabilityCost } from '@/api';
import { useTheme, AppTheme } from '@/view/theme';
import { useAppMode, useSearchState, useSpaceSummary } from '@/state';
import { ImageSwiper } from '@/view/shared/components/common/ImageSwiper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { openMap } from '@/utils/maps';
import { FontAwesome } from '@expo/vector-icons';
import { toMinimalDateRange } from '@/utils';
import { ConfirmReservationScreenProps } from '@/view/parking/stack/ConfirmReservationScreen';
import { Ionicons } from '@expo/vector-icons';

export type ViewSpotScreenProps = {
  building: Building;
  space: Space;
};

const calcDimensions = (window: ScaledSize) => {
  const width = window.width;
  const height = Math.min(window.width * 0.75, window.height * 0.4);
  return { width, height };
};

export const ViewSpotScreen = ({ navigation, route }) => {
  const { building, space } = route.params as ViewSpotScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const { appMode } = useAppMode();
  const { startDate, endDate } = useSearchState();

  const { data: summary } = useSpaceSummary(space.id);

  const onReviewPressed = () => {
    navigation.navigate('SpaceReviews', { space });
  };

  const onGetDirectionsPressed = () => {
    openMap(building.name, building.latitude, building.longitude);
  };

  const [dimensions, setDimensions] = useState(
    calcDimensions(Dimensions.get('window')),
  );

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(calcDimensions(window));
    };

    const listener = Dimensions.addEventListener('change', onChange);
    return () => listener.remove();
  }, []);

  const onReservePressed = () => {
    navigation.navigate('ConfirmReservation', {
      building,
      space,
      startTimestamp: startDate.getTime(),
      endTimestamp: endDate.getTime(),
      hourly_rate: 1,
    } as ConfirmReservationScreenProps);
  };

  const onDateRangeSelected = () => {
    navigation.navigate('SearchParking');
  };

  const renderParkingBottomArea = () => {
    return (
      <View style={styles.bottomArea}>
        <HorizontalGroup>
          <VerticalGroup>
            <TextLink onPress={onDateRangeSelected}>
              {toMinimalDateRange(startDate, endDate)}
            </TextLink>
            <Text>
              Total: ${getAvailabilityCost(1, startDate, endDate).toFixed(2)}
            </Text>
          </VerticalGroup>
          <Button onPress={onReservePressed}>
            <Text>Reserve</Text>
          </Button>
        </HorizontalGroup>
      </View>
    );
  };

  const renderHostingBottomArea = () => {
    return (
      <View style={styles.bottomArea}>
        <Button
          onPress={() => navigation.navigate('ManageSpot', { building, space })}>
          <Text>Manage Availability</Text>
        </Button>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.headerArea}>
          <CircleButton size={34} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={20} color={theme.colors.text} />
          </CircleButton>
        </SafeAreaView>
        <ImageSwiper
          urls={space.img_urls}
          width={dimensions.width}
          height={dimensions.height}
        />
        <View style={styles.contentArea}>
          <Section title={space.name}>
            <Title>{building.name}</Title>
            <Text>{space.description}</Text>
            <HorizontalGroup
              style={{
                justifyContent: 'flex-start',
                marginTop: 8,
              }}>
              <ReviewStars stars={summary?.average_stars} />
              <Text>{' • '}</Text>
              <ReviewsLabel
                totalReviews={summary?.total_reviews}
                onPress={onReviewPressed}
              />
            </HorizontalGroup>
          </Section>
          <View style={styles.separator} />
          <UserProfileLabel userId={space.user_id} namePrefix="Hosted by " />
          <View style={styles.separator} />
          <Section title="Location">
            <StaticMap
              key={dimensions.width}
              style={{ marginVertical: 16 }}
              lat={building.latitude}
              lng={building.longitude}
              width={Math.round(dimensions.width - 54)}
              height={Math.round((dimensions.width - 54) * 0.75)}
            />
            <HorizontalGroup>
              <VerticalGroup>
                <Text>{building.name}</Text>
                <Text>City, Province</Text>
              </VerticalGroup>
              <Button onPress={onGetDirectionsPressed}>
                <Text>Get Directions</Text>
              </Button>
            </HorizontalGroup>
          </Section>
          <View style={styles.separator} />
          <Section title="Amenities">
            <Text>TODO: List of amenities</Text>
          </Section>
          <View style={styles.separator} />
          <Section title="Rules">
            <Text>TODO: List of rules</Text>
          </Section>
          <View style={styles.separator} />
          <Section title="Cancellation Policy">
            <Text>TODO: Cancellation policy</Text>
          </Section>
          <View style={styles.separator} />
          <Section style={{ marginBottom: 16 }}>
            <HorizontalGroup style={{ justifyContent: 'flex-start' }}>
              <FontAwesome style={{ paddingRight: 12 }} name="flag" size={16} />
              <TextLink onPress={() => { }}>Report this listing</TextLink>
            </HorizontalGroup>
          </Section>
        </View>
      </ScrollView>
      {appMode === 'hosting' && renderHostingBottomArea()}
      {appMode === 'parking' && renderParkingBottomArea()}
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    headerArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      zIndex: 1,
    },
    contentArea: {
      flex: 1,
      padding: 16,
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: 24,
    },
    bottomArea: {
      flex: 0,
      height: 80,
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
  });
