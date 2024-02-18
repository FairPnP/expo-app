import { setStatusBar, useTheme } from '@/view/theme';
import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

export const LoadingOverlay = ({ visible }) => {
  const theme = useTheme().theme.appTheme;
  setStatusBar(theme);

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={visible}
      onRequestClose={() => { }}
    >
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


