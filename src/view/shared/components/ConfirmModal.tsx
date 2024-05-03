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
    const {title, message, onConfirm, onCancel, ...modalProps} = props;
    return (
      <StandardModal title={props.title} ref={ref} {...modalProps}>
        <View>
          <Text>{props.message}</Text>
          <View style={{height: 16}} />
          <Button text="Confirm" onPress={props.onConfirm} />
        </View>
      </StandardModal>
    );
  },
);

const styles = StyleSheet.create({});
