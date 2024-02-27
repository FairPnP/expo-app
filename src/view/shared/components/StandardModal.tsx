import { KeyboardAvoidingView, Modal, StyleSheet, View } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { AppTheme, useTheme } from '@/view/theme'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Title } from './common';

export interface ModalProps {
  title?: string;
  children: React.ReactNode;
};

export interface ModalRef {
  show: () => void;
  hide: () => void;
}

export const StandardModal = forwardRef<ModalRef, ModalProps>((props, ref) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const [isVisible, setIsVisible] = useState(false);

  const { title, children, ...modalProps } = props;

  useImperativeHandle(ref, () => ({
    show() {
      setIsVisible(true);
    },
    hide() {
      setIsVisible(false);
    },
  }));


  return (
    <Modal
      visible={isVisible}
      transparent={true}
      {...modalProps}
    >
      <KeyboardAvoidingView behavior="padding"
        style={styles.background}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Title>{title}</Title>
            <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
              <MaterialCommunityIcons name="close" size={24} color={theme.colors.text} />
            </TouchableWithoutFeedback>
          </View>
          {children}
        </View>
      </KeyboardAvoidingView>
    </Modal >
  )
});

const getStyles = (theme: AppTheme) => StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: theme.colors.background,
    borderRadius: 16,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

});
