import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Title,
  SpaceCard,
  LoadingOverlay,
  AvailabilityCalendar,
  ListView,
  AvailabilityItem,
} from '@/view/shared';
import {Availability, Building, Space} from '@/api';
import {useTheme, AppTheme} from '@/view/theme';
import {useMyAvailabilities} from '@/state';
import {toDateString, toFullDateString} from '@/utils';

export type ManageAvailabilityScreenProps = {
  building: Building;
  space: Space;
};

export const ManageAvailabilityScreen = ({navigation, route}) => {
  const {building, space} = route.params as ManageAvailabilityScreenProps;
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<
    Availability[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date>(undefined);

  const {data: availabilties, isLoading} = useMyAvailabilities({
    space_id: space.id,
  });

  //const {mutateAsync: createAvailability, isPending} = useCreateAvailability();
  const onDayPress = (day: string, availabilities: Availability[]) => {
    setSelectedDate(new Date(day));
    setSelectedAvailabilities(availabilities);
  };

  const renderAvailability = ({item}: {item: Availability}) => {
    return <AvailabilityItem availability={item} />;
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={isLoading} />
      <View style={styles.imageContainer}>
        <SpaceCard building={building} space={space} style={styles.spaceCard} />
      </View>
      <View style={styles.separator} />
      <AvailabilityCalendar
        availabilities={availabilties?.availability}
        onDayPress={onDayPress}
      />
      {selectedDate && (
        <View>
          <Title>{toFullDateString(selectedDate)}</Title>
          <ListView
            data={selectedAvailabilities}
            renderItem={renderAvailability}
            keyExtractor={item => item.id}
            emptyMessage="No availability booked"
          />
        </View>
      )}
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    imageContainer: {
      alignItems: 'center',
    },
    spaceCard: {
      width: '100%',
    },
    separator: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
      marginVertical: 8,
    },
    card: {
      padding: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.card,
      marginVertical: 8,
    },
    cardTextContainer: {
      paddingHorizontal: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bottomArea: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
  });
