import React, {forwardRef, useCallback} from 'react';
import {
  Button,
  ModalRef,
  ReviewStarsSelect,
  StandardModal,
  TextInput,
  Text,
  LoadingOverlay,
} from '../components';
import {FormProvider, useForm} from 'react-hook-form';
import {useCreateUserReview} from '@/state';
import {CreateUserReviewRequest} from '@/api';

export interface UserReviewModalProps {
  user_id: string;
}

type FormValues = {
  message: string;
};

export const UserReviewModal = forwardRef<ModalRef, UserReviewModalProps>(
  (props, ref) => {
    const starsRef = React.useRef(null);
    const formMethods = useForm();
    const {mutateAsync: submitReview, isPending} = useCreateUserReview();

    const {user_id, ...modalProps} = props;

    const handleSubmit = useCallback(
      async (data: FormValues) => {
        const modalRef = (ref as any)?.current;
        const stars = starsRef.current?.getStars();
        const {message} = data;

        if (stars && message) {
          const reqData: CreateUserReviewRequest = {
            user_id,
            message,
            stars,
          };
          await submitReview(reqData);
          modalRef?.hide();
        }
      },
      [user_id, starsRef],
    );

    return (
      <StandardModal title={'User Review'} ref={ref} {...modalProps}>
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
  },
);
