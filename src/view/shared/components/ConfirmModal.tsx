import {StyleSheet, Text, View} from 'react-native';
import React, {forwardRef} from 'react';
import {ModalRef, StandardModal} from './StandardModal';
import {Button} from './common';

export type ConfirmModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export const ConfirmModal = forwardRef<ModalRef, ConfirmModalProps>(
  (props, ref) => {
    return (
      <StandardModal title={props.title} ref={ref}>
        <View>
          <Text>{props.message}</Text>
          <Button text="Confirm" onPress={props.onConfirm} />
        </View>
      </StandardModal>
    );
  },
);

const styles = StyleSheet.create({});
