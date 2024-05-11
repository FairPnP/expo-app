import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useBuilding, useSpace, useSpaceSummary} from '@/state';
import {
  HorizontalGroup,
  ImageDownload,
  ReviewStars,
  Title,
  VerticalGroup,
} from '@/view/shared';
import {useNavigation} from '@react-navigation/native';
import {State, TapGestureHandler} from 'react-native-gesture-handler';
import {Availability} from '@/api';
import {toMinimalDateRange} from '@/utils';

export type SpaceListingProps = {
  availability: Availability;
  style?: any;
};

export const SpaceListing = ({availability, style}: SpaceListingProps) => {
  const {data: space} = useSpace(availability?.space_id);
  const {data: building} = useBuilding(space?.building_id);
  const {data: summary} = useSpaceSummary(space?.id);

  const navigation = useNavigation<any>();
  const onSingleTap = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      // Handle tap event, e.g., navigate to a detail screen
      navigation.navigate('ViewListing', {
        building,
        space,
        availabilityId: availability?.id,
      });
    }
  };

  return (
    <TapGestureHandler onHandlerStateChange={onSingleTap} numberOfTaps={1}>
      <View style={style}>
        <View style={styles.infoContainer}>
          <HorizontalGroup>
            <View style={styles.imageContainer}>
              <ImageDownload
                url={space?.img_urls[0]}
                style={{width: 100, height: 100}}
              />
            </View>
            <VerticalGroup style={{height: 90, paddingLeft: 16}}>
              <View>
                <Title style={{fontSize: 18}}>{space?.name}</Title>
                <Text>{building?.name}</Text>
                <Text>
                  {building?.city}, {building?.state}
                </Text>
              </View>
              <View>
                <ReviewStars stars={summary?.average_stars} />
              </View>
            </VerticalGroup>
            <View style={{flex: 1}} />
            <VerticalGroup style={{height: 90, alignItems: 'flex-end'}}>
              <Title style={{fontSize: 18}}>
                ${availability?.price.toFixed(2)}
              </Title>
              <Text>
                {' '}
                {toMinimalDateRange(
                  availability.start_date,
                  availability.end_date,
                )}
              </Text>
            </VerticalGroup>
          </HorizontalGroup>
        </View>
      </View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  infoContainer: {
    marginTop: 4,
  },
});
