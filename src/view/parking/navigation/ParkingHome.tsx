import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {IconButton, Section, Text, Title} from '@/view/shared';
import {AppTheme, useTheme} from '@/view/theme';
import {useAppMode} from '@/state';

export const ParkingHome = () => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {setAppMode} = useAppMode();

  const onSwitchToHosting = () => {
    setAppMode('hosting');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.topArea}>
        <Section title="Parking">
          <Text>Parking</Text>
        </Section>
        <Section title="Upcoming">
          <Text>Parking</Text>
        </Section>
      </ScrollView>
      <View style={styles.bottomArea}>
        <Section>
          <Title style={{marginVertical: 4}}>Manage your listings</Title>
          <IconButton
            icon="directions"
            text="Switch to Hosting"
            onPress={onSwitchToHosting}
          />
        </Section>
      </View>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
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
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
    },
  });
