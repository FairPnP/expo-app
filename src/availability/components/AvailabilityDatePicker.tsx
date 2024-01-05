import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {HoursView} from './HoursView';
import {DaysView} from './DaysView';
import {MonthsView} from './MonthsView';
import {AppTheme, useTheme} from '@/common';

export type AvailabilityDatePickerProps = {
  onDateRangeSelected: (startDate: Date, endDate: Date) => void;
};

export const AvailabilityDatePicker = ({
  onDateRangeSelected,
}: AvailabilityDatePickerProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'hours', title: 'Hours'},
    {key: 'days', title: 'Days'},
    {key: 'months', title: 'Months'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'hours':
        return <HoursView onDateRangeSelected={onDateRangeSelected} />;
      case 'days':
        return <DaysView onDateRangeSelected={onDateRangeSelected} />;
      case 'months':
        return <MonthsView onDateRangeSelected={onDateRangeSelected} />;
      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
    />
  );

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        swipeEnabled={false}
        lazy
      />
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: 400,
    },
    tabBar: {
      backgroundColor: theme.colors.disabled,
    },
    tab: {
      width: 'auto',
      padding: 0,
      margin: 0,
    },
    indicator: {
      backgroundColor: theme.colors.primary,
    },
    label: {
      color: theme.colors.text,
    },
  });
