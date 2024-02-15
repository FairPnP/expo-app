import { Modal, StyleSheet, View, SafeAreaView } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { AppTheme, useTheme } from '@/view/theme';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { Text, LocationSearch, HorizontalGroup, VerticalGroup, Title, Button, CloseButton, Card } from '@/view/shared';
import { toMinimalDateRange } from '@/utils';
import { useSearchState } from '@/state';
import { useNavigation } from '@react-navigation/native';


export const SearchModal = forwardRef((_, ref) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const navigation = useNavigation() as any;

  const [visible, setVisible] = useState(false);
  const sb = useSearchState();

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
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

  const handleStartDateConfirm = (date: Date) => {
    sb.setStartDate(date);
  }

  const handleEndDateConfirm = (date: Date) => {
    sb.setEndDate(date);
  }

  return (
    <Modal
      animationType="fade"
      visible={visible}
    >
      <SafeAreaView style={styles.modal}>
        <View style={styles.content}>
          <HorizontalGroup style={{
            justifyContent: 'space-between',
            marginBottom: 24,
          }}>
            <CloseButton onPress={onClosePressed} />
            <Title>Find Parking</Title>
            <View style={{ width: 30 }} />
          </HorizontalGroup>
          <Card style={{ marginBottom: 16 }}>
            <Title>Where to?</Title>
            <LocationSearch onLocationSelected={onLocationSelected} />
          </Card>
          <Card>
            <Title>When?</Title>
            <HorizontalGroup>
              <View style={{ flex: 1, borderRightColor: theme.colors.border, borderRightWidth: 1 }}>
                <Title style={{ alignSelf: 'center' }}>Parking From</Title>
                <Text>Date: </Text>
                <Text>Time: </Text>
              </View>
              <View style={{ flex: 1, paddingHorizontal: 8 }}>
                <Title style={{ alignSelf: 'center' }}>Parking Until</Title>
                <Text>Date: </Text>
                <Text>Time: </Text>
              </View>
            </HorizontalGroup>
          </Card>
        </View>
      </SafeAreaView>
      <View style={styles.bottomArea}>
        <HorizontalGroup>
          <VerticalGroup>
            <Text>{sb.location?.data?.description}</Text>
            <Text>{sb.startDate && sb.endDate && toMinimalDateRange(sb.startDate, sb.endDate)}</Text>
          </VerticalGroup>
          <Button onPress={onSearchPressed}><Text>Search</Text></Button>
        </HorizontalGroup>
      </View>
    </Modal >
  )
});

const getStyles = (theme: AppTheme) => StyleSheet.create({
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
    postion: 'absolute',
    bottom: 0,
    width: '100%',
    height: 100,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
  },
})
