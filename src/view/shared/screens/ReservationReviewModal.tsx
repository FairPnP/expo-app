import {Modal, StyleSheet, View} from 'react-native';
import React, {forwardRef, useCallback} from 'react';
import {
  Button,
  ModalRef,
  ReviewStarsSelect,
  StandardModal,
  TextInput,
  Text,
  LoadingOverlay,
  Title,
} from '../components';
import {FormProvider, useForm} from 'react-hook-form';
import {useCreateSpaceReview, useReservation} from '@/state';
import {CreateSpaceReviewRequest} from '@/api';

export interface ReservationReviewModalProps {
  reservation_id: string;
}

type FormValues = {
  message: string;
};

export const ReservationReviewModal = forwardRef<
  ModalRef,
  ReservationReviewModalProps
>((props, ref) => {
  const starsRef = React.useRef(null);
  const formMethods = useForm();
  const {mutateAsync: submitReview, isPending} = useCreateSpaceReview();

  const {reservation_id, ...modalProps} = props;
  const {data: reservation} = useReservation(reservation_id);

  const handleSubmit = useCallback(
    async (data: FormValues) => {
      const stars = starsRef.current?.getStars();
      const {message} = data;

      if (stars && message) {
        const reqData: CreateSpaceReviewRequest = {
          space_id: reservation.space_id,
          message,
          stars,
        };
        await submitReview(reqData);
        (ref as any).current.hide();
      }
    },
    [reservation, starsRef],
  );

  return (
    <StandardModal title={'Space Review'} ref={ref} {...modalProps}>
      <LoadingOverlay visible={isPending} />
      <Text>Rating</Text>
      <ReviewStarsSelect
        style={{marginBottom: 24}}
        ref={starsRef}
        initialStars={5}
      />
      <FormProvider {...formMethods}>
        <TextInput
          label="Message"
          name="message"
          multiline
          inputStyle={{minWidth: 280, height: 60, marginBottom: 24}}
        />
        <Button
          text="Submit"
          onPress={formMethods.handleSubmit(handleSubmit)}
        />
      </FormProvider>
    </StandardModal>
  );
});
