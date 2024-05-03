import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, AppTheme} from '@/view/theme';
import {Availability} from '@/api';
import {Button, Card, HorizontalGroup, Text, VerticalGroup} from '../common';
import {ConfirmModal} from '../ConfirmModal';
import {useDeleteAvailability} from '@/state';
import {ModalRef} from '../StandardModal';

export type AvailabilityItemProps = {
  availability: Availability;
};

export const AvailabilityItem = ({availability}: AvailabilityItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const deleteModalRef = React.createRef<ModalRef>();
  const {mutateAsync: deleteAvailability, isPending: isDeleting} =
    useDeleteAvailability();

  const onDelete = () => {
    deleteModalRef.current?.show();
  };

  const onConfirmDelete = async () => {
    await deleteAvailability(availability.id);
  };

  return (
    <View style={styles.container}>
      <ConfirmModal
        title="Delete Availability"
        message="Are you sure you want to delete this availability?"
        onConfirm={onConfirmDelete}
      />
      <Card>
        <HorizontalGroup>
          <VerticalGroup>
            <Text>
              {`Start: ${availability.start_date.toDateString()} - ${availability.start_date
                .toTimeString()
                .substring(0, 5)}`}
            </Text>

            <Text>
              {`End:  ${availability.end_date.toDateString()} - ${availability.end_date
                .toTimeString()
                .substring(0, 5)}`}
            </Text>
            <Text>{'Price: $' + availability.hourly_rate.toFixed(2)}</Text>
          </VerticalGroup>
          <View>
            <HorizontalGroup>
              <Button text="Edit" onPress={() => {}} />
              <View style={{width: 8}} />
              <Button text="Delete" onPress={onDelete} />
            </HorizontalGroup>
          </View>
        </HorizontalGroup>
      </Card>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 8,
    },
  });
