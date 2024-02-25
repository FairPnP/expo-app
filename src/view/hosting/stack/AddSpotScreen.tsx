import React, { useCallback, useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, LocationCard, LocationSearch, Text } from '@/view/shared';
import { EditParkingSpaceScreenProps } from './EditParkingSpaceScreen';
import { useNavigation } from '@react-navigation/native';
import { useTheme, AppTheme } from '@/view/theme';

export const AddSpotScreen = () => {
  const navigation = useNavigation<any>();
  const [loc, setSelectedLocation] = useState<any>(null);

  const { theme } = useTheme();
  const styles = getStyles(theme.appTheme);

  const onLocationSelected = (data: any, details: any) => {
    setSelectedLocation({ data, details });
  };

  const handleAddToMySpots = useCallback(() => {
    const props: EditParkingSpaceScreenProps = {
      place_id: loc.details.place_id,
    };

    navigation.navigate('EditParkingSpace', props);
  }, [loc, navigation]);

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={loc ? styles.topBar : styles.topBarNoContent}>
        <LocationSearch
          onLocationSelected={onLocationSelected}
          locationTypes="address"
        />
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
