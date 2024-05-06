import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Title,
  SpaceCard,
  LoadingOverlay,
  AvailabilityCalendar,
  ListView,
  HorizontalGroup,
  Button,
} from '@/view/shared';
import {Availability, Building, Space} from '@/api';
import {useTheme, AppTheme} from '@/view/theme';
import {useCreateAvailability, useMyAvailabilities} from '@/state';
import {parseDateAsLocal, toFullDateString, toISODateUTC} from '@/utils';
import {
  AddAvailabilityModal,
  AddAvailabilityModalRef,
  AvailabilityItem,
} from '../components';
import {ScrollView} from 'react-native-gesture-handler';

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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const modalRef = React.createRef<AddAvailabilityModalRef>();
  const {mutateAsync: createAvailability, isPending: isCreating} =
    useCreateAvailability();

  const {data: availabilties, isLoading} = useMyAvailabilities({
    space_id: space.id,
  });

  const showOverlay = isLoading || isCreating;

  //const {mutateAsync: createAvailability, isPending} = useCreateAvailability();
  const onDayPress = (day: string, availabilities: Availability[]) => {
    setSelectedDate(parseDateAsLocal(day));
    setSelectedAvailabilities(availabilities);
  };

  const renderAvailability = ({item}: {item: Availability}) => {
    return <AvailabilityItem availability={item} />;
  };

  const onAddAvailabilityPressed = () => {
    const startDate = new Date(selectedDate);
    startDate.setHours(8);
    if (startDate < new Date()) {
      startDate.setHours(new Date().getHours() + 1);
    }
    modalRef.current?.show(startDate);
  };

  const onAddAvailabilityConfirm = async (
    startDate: Date,
    endDate: Date,
    price: number,
  ) => {
    await createAvailability({
      space_id: space.id,
      start_date: toISODateUTC(startDate),
      end_date: toISODateUTC(endDate),
      price: price,
      // min_hours: options.minHours,
    });
    modalRef.current?.hide();
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={showOverlay} />
      <View style={styles.imageContainer}>
        <SpaceCard building={building} space={space} style={styles.spaceCard} />
      </View>
      <View style={styles.separator} />
      <ScrollView>
        <AvailabilityCalendar
          availabilities={availabilties?.availability}
          onDayPress={onDayPress}
        />
        {selectedDate && (
          <View style={styles.bottomArea}>
            <HorizontalGroup>
              <Title>{toFullDateString(selectedDate)}</Title>
              <Button
                text="Add Availability"
                onPress={onAddAvailabilityPressed}
              />
            </HorizontalGroup>
            <View style={{height: 16}} />
            <ListView
              data={selectedAvailabilities}
              renderItem={renderAvailability}
              keyExtractor={item => item.id}
              emptyMessage="No availability booked"
            />
          </View>
        )}
      </ScrollView>
      <AddAvailabilityModal
        onDatesSelected={onAddAvailabilityConfirm}
        ref={modalRef}
      />
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
      marginVertical: 2,
    },
    bottomArea: {
      paddingTop: 16,
      paddingBottom: 32,
      paddingHorizontal: 16,
      flex: 1,
    },
    modal: {
      width: 300,
    },
  });
