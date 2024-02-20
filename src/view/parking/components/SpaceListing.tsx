import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useBuilding, useSearchState, useSpace, useSpaceSummary } from '@/state';
import { HorizontalGroup, ImageSwiper, ReviewStars, Title, VerticalGroup } from '@/view/shared';
import { useNavigation } from '@react-navigation/native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import { Availability, getAvailabilityCost } from '@/api';
import { toMinimalDateRange } from '@/utils';

export type SpaceListingProps = {
  width: number;
  availability: Availability;
  style?: any;
}

export const SpaceListing = ({ width, availability, style }: SpaceListingProps) => {
  const { data: space } = useSpace(availability?.space_id);
  const { data: building } = useBuilding(space?.building_id);
  const { data: summary } = useSpaceSummary(space?.id);

  const sb = useSearchState();

  const navigation = useNavigation<any>();
  const onSingleTap = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      // Handle tap event, e.g., navigate to a detail screen
      navigation.navigate('ViewSpot', { building, space });
    }
  };

  return (
    <TapGestureHandler onHandlerStateChange={onSingleTap} numberOfTaps={1}>
      <View style={[{ width: width }, style]}>
        <View style={styles.imageContainer}>
          <ImageSwiper urls={space?.img_urls} width={width} height={width} />
        </View>
        <View style={styles.infoContainer}>
          <HorizontalGroup>
            <VerticalGroup style={{ height: 90 }}>
              <View>
                <Title style={{ fontSize: 18 }}>{building?.name}</Title>
                <Text>{building?.city}, {building?.state}</Text>
                <Text>{space?.name}</Text>
              </View>
              <View>
                <Title style={{ fontSize: 18 }}>${getAvailabilityCost(availability?.hourly_rate, sb.startDate, sb.endDate)}</Title>
              </View>
            </VerticalGroup>
            <VerticalGroup style={{ height: 90 }}>
              <ReviewStars style={{ alignSelf: 'flex-end' }} stars={summary?.average_stars} />
              <Text> {toMinimalDateRange(sb.startDate, sb.endDate)}</Text>
            </VerticalGroup>
          </HorizontalGroup>
        </View>
      </View>
    </TapGestureHandler>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  infoContainer: {
    marginTop: 4,
  },
});
