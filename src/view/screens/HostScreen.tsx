import React, {useCallback, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Button, LocationCard, MapsSearch, Text} from '../components';
import {EditParkingSpaceScreenProps} from './EditParkingSpaceScreen';
import {useNavigation} from '@react-navigation/native';
import {useTheme, AppTheme} from '@/view/theme';
import {CreateBuildingRequest} from '@/api';

export const HostScreen = () => {
  const navigation = useNavigation<any>();
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
          />
          <Button onPress={handleAddToMySpots}>
            <Text>Add to My Spots</Text>
          </Button>
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
