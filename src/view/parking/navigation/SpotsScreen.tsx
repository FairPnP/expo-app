import React, { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  ListView,
  LoadingSpinner,
  ReservationItem,
  Section,
} from '@/view/shared';
import { useTheme, AppTheme } from '@/view/theme';
import { useMyReservations } from '@/state';
import { Reservation } from '@/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export const SpotsScreen = () => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const { data: reservations, isLoading } = useMyReservations();

  const sortedReservations = useMemo<{
    upcoming: Reservation[];
    ongoing: Reservation[];
    history: Reservation[];
  }>(() => {
    if (!reservations) {
      return {
        upcoming: [],
        ongoing: [],
        history: [],
      };
    }

    const now = new Date();
    const upcoming: Reservation[] = [];
    const ongoing: Reservation[] = [];
    const history: Reservation[] = [];

    for (const r of reservations.reservations) {
      const start = r.start_date;
      const end = r.end_date;

      if (end < now) {
        history.push(r);
      } else if (start < now && end > now) {
        ongoing.push(r);
      } else {
        upcoming.push(r);
      }
    }

    return {
      upcoming,
      ongoing,
      history,
    };
  }, [reservations]);

  const renderItem = useCallback(({ item }) => {
    return <ReservationItem reservation={item} />;
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Section title="Upcoming">
          <ListView
            data={sortedReservations?.upcoming}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            emptyMessage="You have no upcoming reservations"
          />
        </Section>
        <Section title="Ongoing">
          <ListView
            data={sortedReservations.ongoing}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            emptyMessage="You have no ongoing reservations"
          />
        </Section>
        <Section title="History">
          <ListView
            data={sortedReservations.history}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            emptyMessage="You have no reservation history"
          />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 10,
    },
    content: {
      padding: 10,
    },
  });
