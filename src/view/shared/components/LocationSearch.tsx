import React, { useCallback, useRef, useState } from 'react';
import {
  AutocompleteRequestType,
  GooglePlacesAutocomplete,
} from 'react-native-google-places-autocomplete';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { useTheme, AppTheme } from '@/view/theme';
import { Text } from '../components/common';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Constants from 'expo-constants';

export type LocationSearchProps = {
  onLocationSelected: (data: any, details: any) => void;
  locationTypes?: AutocompleteRequestType;
};

export const LocationSearch = ({
  onLocationSelected,
  locationTypes,
}: LocationSearchProps) => {
  const theme = useTheme().theme.appTheme;
  const googlePlacesRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const styles = getStyles(theme);

  const clearSearch = useCallback(() => {
    setSearchText('');
    if (googlePlacesRef.current) {
      googlePlacesRef.current.setAddressText('');
    }
  }, [googlePlacesRef]);

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={googlePlacesRef}
        placeholder="Search"
        styles={autoCompleteStyles(theme)}
        textInputProps={{
          onChangeText: setSearchText,
          placeholderTextColor: theme.colors.text,
        }}
        query={{
          key: Constants.expoConfig.extra.googleWebApiKey,
          language: 'en',
          components: 'country:can',
          types: locationTypes,
        }}
        fetchDetails={true}
        onPress={onLocationSelected}
        onFail={error => console.error(error)}
        enablePoweredByContainer={false}
        disableScroll={true}
        minLength={2}
        renderRightButton={() =>
          searchText ? (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Icon name="close-circle" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        renderRow={row => <Text>{row.description}</Text>}
      />
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
    },
    clearButton: {
      position: 'absolute',
      right: 6,
      top: 10,
    },
  });

const autoCompleteStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 0,
      padding: 4,
    },
    textInputContainer: {
      backgroundColor: theme.colors.background,
      height: 44,
    },
    textInput: {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
      color: theme.colors.text,
      borderWidth: 1,
    },
    row: {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
    },
    listView: {
      backgroundColor: theme.colors.card,
      borderColor: theme.colors.border,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
  });
