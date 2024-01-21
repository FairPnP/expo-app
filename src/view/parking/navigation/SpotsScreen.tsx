import React, {useCallback, useState} from 'react';
import {View, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {
  ListView,
  Text,
  LoadingSpinner,
  ReservationItem,
  AvailabilityItem,
} from '@/view/shared';
import {useTheme, AppTheme} from '@/view/theme';
import {
  useHostReservations,
  useMyAvailabilities,
  useMyReservations,
} from '@/state';

export const SpotsScreen = () => {
  const [activeTab, setActiveTab] = useState('Bookings');
  const [activeSubTab, setActiveSubTab] = useState('Upcoming');
  const {theme} = useTheme();
  const styles = getStyles(theme.appTheme);

  const {data: hostReservations, isLoading: isHostReservationsLoading} =
    useHostReservations();
  const {data: reservations, isLoading: isReservationsLoading} =
    useMyReservations();

  const {data: availabilities, isLoading: isAvailabiltyLoading} =
    useMyAvailabilities();

  const renderContent = useCallback(() => {
    const date = new Date();
    const isLoading =
      activeTab === 'Bookings'
        ? isReservationsLoading && isHostReservationsLoading
        : isAvailabiltyLoading;
    const data =
      activeTab === 'Bookings'
        ? reservations?.reservations.concat(hostReservations?.reservations)
        : availabilities?.availability;
    const filteredData = data?.filter(item => {
      switch (activeSubTab) {
        case 'Upcoming':
          return item.start_date > date;
        case 'Ongoing':
          return item.start_date <= date && item.end_date > date;
        case 'History':
          return item.end_date < date;
        default:
          return false;
      }
    });

    const renderItem =
      activeTab === 'Bookings' ? renderReservationItem : renderAvailabilityItem;

    return isLoading ? (
      <LoadingSpinner />
    ) : (
      <ListView
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        emptyMessage="You have no registered parking spots"
        style={styles.content}
      />
    );
  }, [
    activeSubTab,
    activeTab,
    isReservationsLoading,
    isAvailabiltyLoading,
    reservations,
    availabilities,
    styles.content,
    theme.appTheme.colors.primary,
    hostReservations,
    isHostReservationsLoading,
  ]);

  const renderReservationItem = ({item}) => (
    <ReservationItem reservation={item} />
  );
  const renderAvailabilityItem = ({item}) => (
    <AvailabilityItem availability={item} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Bookings' && styles.activeTab]}
          onPress={() => setActiveTab('Bookings')}>
          <Text>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Availability' && styles.activeTab]}
          onPress={() => setActiveTab('Availability')}>
          <Text>Availability</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.subTabsContainer}>
        {['Upcoming', 'Ongoing', 'History'].map(subTab => (
          <TouchableOpacity
            key={subTab}
            style={[
              styles.subTab,
              activeSubTab === subTab && styles.activeSubTab,
            ]}
            onPress={() => setActiveSubTab(subTab)}>
            <Text>{subTab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>{renderContent()}</ScrollView>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    tabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: theme.colors.card,
      paddingVertical: 4,
    },
    tab: {
      padding: 10,
    },
    activeTab: {
      borderBottomWidth: 3,
      borderBottomColor: theme.colors.primary,
    },
    tabText: {
      color: theme.colors.text,
      fontSize: 18,
    },
    subTabsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: theme.colors.card,
      paddingVertical: 5,
    },
    subTab: {
      padding: 5,
    },
    activeSubTab: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primary,
    },
    subTabText: {
      color: theme.colors.text,
      fontSize: 16,
    },
    content: {
      padding: 10,
    },
    contentText: {
      color: theme.colors.text,
      fontSize: 16,
    },
  });
