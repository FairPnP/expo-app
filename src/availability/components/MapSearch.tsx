import React, {useCallback, useRef, useState} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {AppTheme, Text, useTheme} from '@/common';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type MapsSearchProps = {
  onLocationSelected: (data: any, details: any) => void;
};

export const MapsSearch = ({onLocationSelected}: MapsSearchProps) => {
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
          key: 'AIzaSyCWpR0sAVKYhddtAXWYUA5engAPXNZW3BM',
          language: 'en',
          components: 'country:can',
          types: 'address',
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
      position: 'absolute',
      top: 40,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderBottomWidth: 1,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
  });
