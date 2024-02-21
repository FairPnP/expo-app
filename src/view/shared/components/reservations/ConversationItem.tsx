import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, AppTheme } from '@/view/theme';
import { HorizontalGroup, Text, Title, VerticalGroup } from '../common';
import { ChatSummary } from '@/api';
import { useBuilding, useReservation, useSpace } from '@/state';
import { toDateString, toTimeString } from '@/utils';
import { UserProfileLabel } from '../users';

export type ConversationItemProps = {
  summary: ChatSummary;
  onPress: (summary: ChatSummary) => void;
  style?: any;
};

export const ConversationItem = ({ summary, onPress, style }: ConversationItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const { data: reservation } = useReservation(summary.reservation_id);
  const { data: space } = useSpace(reservation?.space_id);
  const { data: building } = useBuilding(space?.building_id);

  const onConversationPress = () => {
    onPress(summary);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={onConversationPress}>
        <HorizontalGroup
          style={{
            justifyContent: 'left',
          }}>
          <UserProfileLabel
            userId={summary.user_id}
            subText={toDateString(summary.created_at)}
            subText2={toTimeString(summary.created_at)}
          />
          <View style={{ height: '90%', borderRightColor: theme.colors.border, borderRightWidth: 1, marginHorizontal: 8 }} />
          <VerticalGroup style={styles.textArea}>
            <Text style={{ fontWeight: 'bold' }}>{building?.name}</Text>
            <Text style={styles.message} numberOfLines={5}>{summary.message}</Text>
          </VerticalGroup>
        </HorizontalGroup>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      borderRadius: 8,
    },
    icon: {
      paddingHorizontal: 10,
      flex: 0,
    },
    textArea: {
      flex: 1,
      paddingHorizontal: 4,
    },
    message: {
      color: 'grey',
    },
    dateArea: {},
  });
