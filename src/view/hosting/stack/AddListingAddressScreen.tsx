import React, {useCallback, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Button, LocationCard, LocationSearch, Title} from '@/view/shared';
import {EditParkingSpaceScreenProps} from './EditListingScreen';
import {useNavigation} from '@react-navigation/native';
import {useTheme, AppTheme} from '@/view/theme';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';

export const AddListingAddressScreen = () => {
  const navigation = useNavigation<any>();
  const [loc, setSelectedLocation] = useState<any>(null);

  const {theme} = useTheme();
  const styles = getStyles(theme.appTheme);

  const onLocationSelected = (
    data: GooglePlaceData,
    details: GooglePlaceDetail,
  ) => {
    setSelectedLocation({data, details});
  };

  const onAddListing = useCallback(() => {
    const props: EditParkingSpaceScreenProps = {
      data: loc.data,
      details: loc.details,
    };

    navigation.navigate('EditListing', props);
  }, [loc, navigation]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View>
        <Title>Where is your listing?</Title>
        <LocationSearch
          placeholder="Enter listing address"
          onLocationSelected={onLocationSelected}
          locationTypes="address"
        />
      </View>
      <View style={styles.contentView}>
        {loc && (
          <LocationCard
            mainText={loc.data.structured_formatting.main_text}
            secondaryText={loc.data.structured_formatting.secondary_text}
            lat={loc.details.geometry.location.lat}
            lng={loc.details.geometry.location.lng}
          />
        )}
      </View>

      <View style={styles.bottomView}>
        <Button text="Confirm Address" onPress={onAddListing} enabled={!!loc} />
      </View>
    </ScrollView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingTop: 32,
      paddingHorizontal: 16,
    },
    contentView: {
      minHeight: 300,
    },
    bottomView: {
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
