import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {IconButton, Section, Text, Title} from '@/view/shared';
import {AppTheme, useTheme} from '@/view/theme';
import {useAppMode} from '@/state';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SearchBar, SearchBarState} from '../components';

export const ParkingHome = ({navigation}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {setAppMode} = useAppMode();

  const onSwitchToHosting = () => {
    setAppMode('hosting');
  };

  const onSearchBarSubmit = (state: SearchBarState) => {
    navigation.navigate('Map');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.topArea}>
        <SearchBar />
      </View> */}
      <ScrollView style={styles.content}>
        <Section title="Parking Home">
          <Text>TODO: Parking home</Text>
        </Section>
        <Section title="Upcoming">
          <Text>Parking</Text>
        </Section>
      </ScrollView>
      <View style={styles.bottomArea}>
        <Title style={{marginVertical: 4}}>Manage your listings</Title>
        <IconButton
          icon="directions"
          text="Switch to Hosting Mode"
          onPress={onSwitchToHosting}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    topArea: {
      zIndex: 1,
      height: 76,
      paddingVertical: 4,
      paddingHorizontal: 8,
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    content: {},
    bottomArea: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: 100,
      paddingHorizontal: 8,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
  });
