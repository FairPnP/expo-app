import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ScaledSize,
  StatusBar,
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
  ImageSwiper,
} from '../components';
import {Building, Space, getAvailabilityCost} from '@/api';
import {useTheme, AppTheme, setStatusBar} from '@/view/theme';
import {useAppMode, useSearchState, useSpaceSummary} from '@/state';
import {SafeAreaView} from 'react-native-safe-area-context';
import {openMap} from '@/utils/maps';
import {FontAwesome} from '@expo/vector-icons';
import {toMinimalDateRange} from '@/utils';
import {ConfirmReservationScreenProps} from '@/view/parking/stack/ConfirmReservationScreen';
import {Ionicons} from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';

export type ViewSpotScreenProps = {
  building: Building;
  space: Space;
};

const calcDimensions = (window: ScaledSize) => {
  const width = window.width;
  const height = Math.round(Math.min(window.width * 0.75, window.height * 0.4));
  return {width, height};
};

export const ViewSpotScreen = ({navigation, route}) => {
  const {building, space} = route.params as ViewSpotScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {appMode} = useAppMode();
  const {startDate, endDate} = useSearchState();

  const {data: summary} = useSpaceSummary(space.id);

  const onReviewPressed = () => {
    navigation.navigate('SpaceReviews', {space});
  };

  const onGetDirectionsPressed = () => {
    openMap(building);
  };

  const [dimensions, setDimensions] = useState(
    calcDimensions(Dimensions.get('window')),
  );

  useEffect(() => {
    const onChange = ({window}: {window: ScaledSize}) => {
      setDimensions(calcDimensions(window));
    };

    const listener = Dimensions.addEventListener('change', onChange);
    return () => listener.remove();
  }, []);

  useFocusEffect(() => {
    StatusBar.setBarStyle('light-content');

    return () => setStatusBar(theme);
  });

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
          <Button text="Reserve" onPress={onReservePressed} />
        </HorizontalGroup>
      </View>
    );
  };

  const renderHostingBottomArea = () => {
    return (
      <View style={styles.bottomArea}>
        <Button
          text="Manage Availability"
          onPress={() =>
            navigation.navigate('ManageAvailability', {building, space})
          }
        />
      </View>
    );
  };

  const renderReviewArea = () => {
    return (
      <HorizontalGroup style={{width: 124, marginTop: 16}}>
        <ReviewStars stars={summary?.average_stars} />
        <Text>{' • '}</Text>
        <ReviewsLabel
          totalReviews={summary?.total_reviews}
          onPress={onReviewPressed}
        />
      </HorizontalGroup>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} style={styles.container}>
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
            <Text>{space.description}</Text>
            {renderReviewArea()}
          </Section>
          <View style={styles.separator} />
          <UserProfileLabel
            linkToProfile
            userId={space.user_id}
            namePrefix="Hosted by "
          />
          <View style={styles.separator} />
          <Section title="Location">
            <StaticMap
              key={dimensions.width}
              style={{marginBottom: 16, alignSelf: 'center'}}
              lat={building.latitude}
              lng={building.longitude}
              width={Math.round(dimensions.width - 64)}
              height={Math.round((dimensions.width - 64) * 0.75)}
            />
            <HorizontalGroup>
              <VerticalGroup>
                <Text style={{fontWeight: 'bold'}}>{building.name}</Text>
                <Text>
                  {building.city}, {building.state}, {building.country}
                </Text>
              </VerticalGroup>
              <Button text="Get Directions" onPress={onGetDirectionsPressed} />
            </HorizontalGroup>
          </Section>
          <View style={styles.separator} />
          <Section title="Cancellation Policy">
            <Text>Free cancellation within 24 hours of reservation(?)</Text>
          </Section>
          <View style={styles.separator} />
          <Section style={{marginBottom: 16}}>
            <HorizontalGroup style={{justifyContent: 'flex-start'}}>
              <FontAwesome style={{paddingRight: 12}} name="flag" size={16} />
              <TextLink onPress={() => {}}>Report this listing (todo)</TextLink>
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
      paddingHorizontal: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      zIndex: 1,
    },
    contentArea: {
      flex: 1,
      padding: 24,
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
