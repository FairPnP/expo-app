import React from 'react';
import {View, StyleSheet} from 'react-native';
import {HorizontalGroup, ImageDownload, VerticalGroup, Text} from '../common';
import {FontAwesome5} from '@expo/vector-icons';
import {useUserProfile} from '@/state';
import {AppTheme, useTheme} from '@/view/theme';

export type UserProfileLabelProps = {
  userId: string;
  style?: any;
  namePrefix?: string;
};

export const UserProfileLabel = ({
  userId,
  style,
  namePrefix,
}: UserProfileLabelProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyes(theme);
  const {data: profile, isLoading} = useUserProfile(userId);

  return (
    <HorizontalGroup
      style={[
        {
          justifyContent: 'left',
        },
        style,
      ]}>
      {profile?.avatar_url ? (
        <ImageDownload
          url={profile?.avatar_url}
          style={{
            width: 64,
            height: 64,
            borderRadius: 18,
          }}
        />
      ) : (
        <View style={styles.iconContainer}>
          <FontAwesome5
            name="user"
            size={42}
            color={theme.colors.border}
            style={styles.icon}
          />
        </View>
      )}
      <VerticalGroup style={styles.textArea}>
        <Text style={{fontWeight: 'bold'}}>
          {namePrefix}
          {isLoading ? '' : profile?.name ?? 'Unnamed User'}
        </Text>
        <Text style={{color: 'grey'}}>New to FairPnP</Text>
      </VerticalGroup>
    </HorizontalGroup>
  );
};

const getStyes = (theme: AppTheme) =>
  StyleSheet.create({
    iconContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.colors.card,
    },
    icon: {
      alignSelf: 'center',
      marginTop: 6,
    },
    textArea: {
      paddingHorizontal: 4,
    },
  });
