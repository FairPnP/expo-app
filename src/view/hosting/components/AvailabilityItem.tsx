import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, AppTheme} from '@/view/theme';
import {Availability} from '@/api';
import {useDeleteAvailability, useUpdateAvailability} from '@/state';
import {toISODateUTC} from '@/utils';
import {
  Text,
  Button,
  Card,
  ConfirmModal,
  HorizontalGroup,
  ModalRef,
  VerticalGroup,
  LoadingOverlay,
} from '@/view/shared';
import {
  AddAvailabilityModal,
  AddAvailabilityModalRef,
} from './AddAvailabilityModal';

export type AvailabilityItemProps = {
  availability: Availability;
};

export const AvailabilityItem = ({availability}: AvailabilityItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const deleteModalRef = React.createRef<ModalRef>();
  const editModalRef = React.createRef<AddAvailabilityModalRef>();
  const {mutateAsync: deleteAvailability, isPending: isDeleting} =
    useDeleteAvailability();

  const {mutateAsync: updateAvailability, isPending: isUpdating} =
    useUpdateAvailability();

  const showOverlay = isDeleting || isUpdating;

  const onDelete = () => {
    deleteModalRef.current?.show();
  };

  const onConfirmDelete = async () => {
    await deleteAvailability(availability.id);
    deleteModalRef.current?.hide();
  };

  const onEdit = () => {
    editModalRef.current?.show(
      availability.start_date,
      availability.end_date,
      availability.hourly_rate,
    );
  };

  const onEditConfirm = async (
    startDate: Date,
    endDate: Date,
    price: number,
  ) => {
    await updateAvailability({
      availabilityId: availability.id,
      updateData: {
        start_date: toISODateUTC(startDate),
        end_date: toISODateUTC(endDate),
        hourly_rate: price,
      },
    });
    editModalRef.current?.hide();
  };

  const isFuture = availability.end_date.getTime() > Date.now();

  let availText = `Start: ${availability.start_date.toDateString()} - ${availability.start_date.toTimeString().substring(0, 5)}\n`;
  availText += `End:  ${availability.end_date.toDateString()} - ${availability.end_date.toTimeString().substring(0, 5)}\n`;
  availText += `Price: $${availability.hourly_rate.toFixed(2)}`;

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={showOverlay} />
      <ConfirmModal
        title="Delete Availability"
        message={`${availText}\n\nAre you sure you want to delete this availability?`}
        onConfirm={onConfirmDelete}
        ref={deleteModalRef}
      />
      <AddAvailabilityModal
        ref={editModalRef}
        onDatesSelected={onEditConfirm}
      />
      <Card>
        <HorizontalGroup>
          <VerticalGroup>
            <Text>{availText}</Text>
          </VerticalGroup>
          <View>
            {isFuture && (
              <HorizontalGroup>
                <Button text="Edit" onPress={onEdit} />
                <View style={{width: 8}} />
                <Button text="Delete" onPress={onDelete} />
              </HorizontalGroup>
            )}
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
