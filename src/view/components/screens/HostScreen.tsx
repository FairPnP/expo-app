import React, {useCallback, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {AppTheme, useTheme, Button} from '@/common';
import {CreateBuildingRequest, LocationCard, MapsSearch} from '@/buildings';
import {EditParkingSpaceScreenProps} from '@/spaces';

export const HostScreen = ({navigation}: any) => {
  const [loc, setSelectedLocation] = useState<any>(null);

  const {theme} = useTheme();
  const styles = getStyles(theme.appTheme);

  const onLocationSelected = (data: any, details: any) => {
    setSelectedLocation({data, details});
  };

  const handleAddToMySpots = useCallback(() => {
    const buildingReq: CreateBuildingRequest = {
      name: loc.data.structured_formatting.main_text,
      place_id: loc.data.place_id,
      latitude: loc.details.geometry.location.lat,
      longitude: loc.details.geometry.location.lng,
    };

    const props: EditParkingSpaceScreenProps = {
      building: buildingReq,
    };

    navigation.navigate('EditParkingSpace', props);
  }, [loc, navigation]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={loc ? styles.topBar : styles.topBarNoContent}>
        <MapsSearch onLocationSelected={onLocationSelected} />
      </View>
      {loc && (
        <View style={styles.contentView}>
          <LocationCard
            mainText={loc.data.structured_formatting.main_text}
            secondaryText={loc.data.structured_formatting.secondary_text}
            lat={loc.details.geometry.location.lat}
            lng={loc.details.geometry.location.lng}
            zoom={17}
          />
          <Button onPress={handleAddToMySpots}>Add to My Spots</Button>
        </View>
      )}
    </ScrollView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    topBar: {
      padding: 10,
    },
    topBarNoContent: {
      padding: 10,
      height: 300,
    },
    contentView: {
      zIndex: -1,
    },
  });
