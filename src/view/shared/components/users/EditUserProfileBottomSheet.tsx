import React, {forwardRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {HorizontalGroup, Title} from '../common';
import {FontAwesome5} from '@expo/vector-icons';
import {AppTheme, useTheme} from '@/view/theme';
import BottomSheetModal from '@gorhom/bottom-sheet';
import {UserProfileLabel} from './UserProfileLabel';

export type EditUserProfileProps = {
  userId: string;
};

export const EditUserProfileBottomSheet = forwardRef<
  BottomSheetModal,
  EditUserProfileProps
>((props, ref) => {
  const {userId} = props;
  const theme = useTheme().theme.appTheme;
  const styles = getStyes(theme);

  return (
    <BottomSheetModal ref={ref}>
      <View style={styles.header}>
        <HorizontalGroup>
          <Title>Edit Profile</Title>
          <FontAwesome5 name="times" size={24} style={styles.closeIcon} />
        </HorizontalGroup>
        <UserProfileLabel userId={userId} />
      </View>
    </BottomSheetModal>
  );
});

const getStyes = (theme: AppTheme) =>
  StyleSheet.create({
    header: {
      padding: 10,
      backgroundColor: theme.colors.card,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
    },
    closeIcon: {
      color: theme.colors.border,
    },
  });
