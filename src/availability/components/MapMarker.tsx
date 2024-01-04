import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  text: string;
  isSelected?: boolean;
  style?: any;
};

export const MapMarker = ({text, isSelected, style}: Props) => {
  return (
    <View
      style={[
        isSelected ? styles.selectedMarkerContainer : styles.markerContainer,
        style,
      ]}>
      <Text style={isSelected ? styles.selectedText : styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 12,
    padding: 6,
    margin: 2,
  },
  selectedMarkerContainer: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 12,
    padding: 6,
    margin: 2,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
