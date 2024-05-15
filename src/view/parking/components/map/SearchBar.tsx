import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Title, Text} from '@/view/shared';
import {useTheme, AppTheme} from '@/view/theme';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useSearchState} from '@/state';
import {toMinimalDateRange} from '@/utils';
import {SearchModal} from '../../stack/SearchModal';

export type SearchBarProps = {
  style?: any;
};

export const SearchBar = ({style}: SearchBarProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const sb = useSearchState();
  const modalRef = React.createRef() as any;

  const onPress = () => {
    modalRef.current.show();
  };

  let locationName = null;
  if (sb.location?.data?.description) {
    locationName = sb.location.data.description;
    const parts = sb.location.data.description.split(',');
    if (parts.length > 1) {
      locationName = parts[0] + ', ' + parts[1];
    }
  } else if (sb?.location && sb.location.latitude && sb.location.longitude) {
    locationName = 'Map Area';
  } else {
    locationName = 'Where to?';
  }

  let timeStr = null;
  if (sb.location) {
    if (sb.startDate && sb.endDate) {
      timeStr = toMinimalDateRange(sb.startDate, sb.endDate);
    } else {
      timeStr = 'Anytime';
    }
  } else {
    timeStr = 'Find Parking';
  }

  return (
    <View style={[styles.card, style]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.searchIcon}>
          <MaterialCommunityIcons name="magnify" size={32} color="#000" />
        </View>
        <View style={styles.infoArea}>
          <Title style={styles.titleText}>{locationName}</Title>
          <Text style={styles.infoText}>{timeStr}</Text>
        </View>
      </TouchableOpacity>
      <SearchModal ref={modalRef} />
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    searchIcon: {
      position: 'absolute',
      top: 7,
      left: 10,
    },
    infoArea: {
      height: 44,
      justifyContent: 'center',
      paddingLeft: 48,
    },
    card: {
      height: 52,
      backgroundColor: theme.colors.background,
      padding: 4,
      borderRadius: 32,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    titleText: {
      fontSize: 16,
    },
    infoText: {
      fontSize: 14,
    },
  });
