import { Modal, StatusBar, StyleSheet, View } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { AppTheme, useTheme } from '@/view/theme'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface ModalProps {
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

  const { children, ...modalProps } = props;

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
      <View style={styles.background}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
              <MaterialCommunityIcons name="close" size={24} color={theme.colors.text} />
            </TouchableWithoutFeedback>
          </View>
          {children}
        </View>
      </View>
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
