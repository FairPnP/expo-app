import { useAppMode } from '@/state';
import { IconButton, Section, Text, Title } from '@/view/shared';
import { AppTheme, useTheme } from '@/view/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HostingHomeScreenProps = {};

export const HostingHomeScreen = ({ }: HostingHomeScreenProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const { setAppMode } = useAppMode();

  const onSwitchToParking = () => {
    setAppMode('parking');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Section title="Hosting Home">
          <Text>TODO: Hosting home screen</Text>
        </Section>
      </View>
      <View style={styles.bottomArea}>
        <Title style={{ marginVertical: 4 }}>Looking for parking?</Title>
        <IconButton
          icon="directions"
          text="Switch to Parking Mode"
          onPress={onSwitchToParking}
        />
      </View>
    </SafeAreaView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    topArea: {
      marginBottom: 100,
    },
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
