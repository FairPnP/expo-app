import {Modal, StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {AppTheme, useTheme} from '@/view/theme';
import {
  GooglePlaceData,
  GooglePlaceDetail,
} from 'react-native-google-places-autocomplete';
import {
  Text,
  LocationSearch,
  HorizontalGroup,
  VerticalGroup,
  Title,
  Button,
  CloseButton,
  Card,
  AvailabilityDatePicker,
} from '@/view/shared';
import {toMinimalDateRange} from '@/utils';
import {useSearchState} from '@/state';
import {useNavigation} from '@react-navigation/native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

export const SearchModal = forwardRef((_, ref) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const navigation = useNavigation() as any;

  const [visible, setVisible] = useState(false);
  const sb = useSearchState();

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
      StatusBar.setBarStyle(theme.dark ? 'light-content' : 'dark-content');
    },
    hide() {
      setVisible(false);
    },
  }));

  const onLocationSelected = (
    data: GooglePlaceData,
    detail: GooglePlaceDetail,
  ) => {
    sb.setLocation({
      latitude: detail.geometry.location.lat,
      longitude: detail.geometry.location.lng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
      data,
      detail,
    });
  };

  const onSearchPressed = () => {
    setVisible(false);
    navigation.navigate('Map');
  };

  const onClosePressed = () => {
    setVisible(false);
  };

  const onDateRangeSelected = (startDate: Date, endDate: Date) => {
    sb.setStartDate(startDate);
    sb.setEndDate(endDate);
  };

  return (
    <Modal animationType="fade" visible={visible}>
      <SafeAreaView style={styles.modal}>
        <View style={styles.content}>
          <HorizontalGroup
            style={{
              justifyContent: 'space-between',
              marginBottom: 24,
            }}>
            <CloseButton onPress={onClosePressed} />
            <Title>Find Parking</Title>
            <View style={{width: 30}} />
          </HorizontalGroup>
          <Card style={{marginBottom: 16}}>
            <Title>Where to?</Title>
            <LocationSearch onLocationSelected={onLocationSelected} />
          </Card>
          {/* <Card> */}
          {/*   <Title>When?</Title> */}
          {/*   <AvailabilityDatePicker onDateRangeSelected={onDateRangeSelected} /> */}
          {/* </Card> */}
        </View>
      </SafeAreaView>
      <View style={styles.bottomArea}>
        <HorizontalGroup>
          <VerticalGroup>
            <Title style={{fontSize: 16}}>{sb.location?.detail?.name}</Title>
            <Text style={{fontSize: 14}}>
              {sb.startDate &&
                sb.endDate &&
                toMinimalDateRange(sb.startDate, sb.endDate)}
            </Text>
          </VerticalGroup>
          <Button onPress={onSearchPressed}>
            <HorizontalGroup>
              <MaterialCommunityIcons name="magnify" size={24} color="#000" />
              <Text> Search</Text>
            </HorizontalGroup>
          </Button>
        </HorizontalGroup>
      </View>
    </Modal>
  );
});

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    modal: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
    bottomArea: {
      padding: 16,
      postion: 'absolute',
      bottom: 0,
      width: '100%',
      height: 84,
      backgroundColor: theme.colors.background,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
  });
