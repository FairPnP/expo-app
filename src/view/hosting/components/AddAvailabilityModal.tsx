import React, {forwardRef, useCallback, useImperativeHandle} from 'react';
import {
  Button,
  ModalRef,
  StandardModal,
  Text,
  DateTimePicker,
  NumberInput,
} from '@/view/shared';
import {FormProvider, useForm} from 'react-hook-form';

export interface AddAvailabilityModalProps {
  onDatesSelected: (startDate: Date, endDate: Date, price: number) => void;
}

type FormValues = {
  startDate: Date;
  endDate: Date;
  price: string;
};

export interface AddAvailabilityModalRef {
  show: (startDate: Date, endDate?: Date, price?: number) => void;
  hide: () => void;
}

export const AddAvailabilityModal = forwardRef<
  AddAvailabilityModalRef,
  AddAvailabilityModalProps
>((props, ref) => {
  const modalRef = React.createRef<ModalRef>();
  const formMethods = useForm<FormValues>({
    mode: 'onChange',
  });

  useImperativeHandle(ref, () => ({
    show(startDate: Date, endDate?: Date, price?: number) {
      if (!endDate) {
        endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 12);
      }
      formMethods.reset({startDate, endDate, price: price?.toString()});
      modalRef.current?.show();
    },
    hide() {
      modalRef.current?.hide();
    },
  }));
  const {onDatesSelected, ...modalProps} = props;

  const handleSubmit = useCallback(
    (data: FormValues) => {
      onDatesSelected(data.startDate, data.endDate, +data.price);
      (ref as any).current.hide();
    },
    [onDatesSelected],
  );

  return (
    <StandardModal title={'Add Availabilty'} ref={modalRef} {...modalProps}>
      <FormProvider {...formMethods}>
        <Text style={{marginBottom: 8}}>Start Date</Text>
        <DateTimePicker name="startDate" />
        <Text style={{marginTop: 16, marginBottom: 8}}>End Date</Text>
        <DateTimePicker name="endDate" />
        <NumberInput name="price" label="Price ($)" />
      </FormProvider>

      <Button
        style={{marginTop: 16}}
        text="Confirm"
        onPress={formMethods.handleSubmit(handleSubmit)}
      />
    </StandardModal>
  );
});
