import { useAppMode } from '@/state';
import { IconButton, Section, Text, Title } from '@/view/shared';
import { AppTheme, useTheme } from '@/view/theme';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from '../components';

export const ParkingHome = ({ }) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const { setAppMode } = useAppMode();

  const onSwitchToHosting = () => {
    setAppMode('hosting');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ overflow: 'hidden', paddingBottom: 8 }}>
        <View style={styles.topArea}>
          <SearchBar style={{ alignSelf: 'center', width: '90%', maxWidth: 500 }} />
        </View>
      </View>
      <ScrollView style={styles.content}>
        <Section title="Parking Home">
          <Text>TODO: Parking home</Text>
        </Section>
        <Section title="Upcoming">
          <Text>Parking</Text>
        </Section>
      </ScrollView>
      <View style={styles.bottomArea}>
        <Title style={{ marginVertical: 4 }}>Manage your listings</Title>
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
      height: 72,
      paddingVertical: 4,
      backgroundColor: theme.colors.background,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
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
