import React from 'react';
import { View, StyleSheet } from 'react-native';
import { HorizontalGroup, ImageDownload, VerticalGroup, Text } from '../common';
import { FontAwesome5 } from '@expo/vector-icons';
import { useUserProfile } from '@/state';
import { AppTheme, useTheme } from '@/view/theme';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';

export type UserProfileLabelProps = {
  userId: string;
  style?: any;
  namePrefix?: string;
  title2?: string;
  subText?: string;
  subText2?: string;
  linkToProfile?: boolean;
};

export const UserProfileLabel = ({
  userId,
  style,
  namePrefix,
  title2,
  subText,
  subText2,
  linkToProfile,
}: UserProfileLabelProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyes(theme);
  const { data: profile, isLoading } = useUserProfile(userId);
  const navigation = useNavigation<any>();

  const onPress = () => {
    if (linkToProfile) {
      console.log('Navigating to user profile', userId);
      navigation.navigate('UserProfile', { userId });
    }
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={!linkToProfile}>
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
            style={styles.iconContainer}
            imageStyle={{
              borderRadius: 32,
              borderWidth: 1,
              borderColor: theme.colors.border,
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
          <Text style={{ fontWeight: 'bold' }}>
            {namePrefix}
            {isLoading ? '' : profile?.name ?? 'Unnamed User'}
          </Text>
          {title2 && <Text style={{ fontWeight: 'bold' }}>{title2}</Text>}
          <Text style={{ color: 'grey' }}>{subText ?? 'New to FairPnP'}</Text>
          {subText2 && <Text style={{ color: 'grey' }}>{subText2}</Text>}
        </VerticalGroup>
      </HorizontalGroup>
    </TouchableOpacity>
  );
};

const getStyes = (theme: AppTheme) =>
  StyleSheet.create({
    iconContainer: {
      width: 64,
      height: 64,
      borderRadius: 32,
    },
    icon: {
      alignSelf: 'center',
      marginTop: 6,
    },
    textArea: {
      marginLeft: 8,
      paddingHorizontal: 4,
    },
  });
