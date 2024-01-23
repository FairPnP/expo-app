import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme, AppTheme} from '@/view/theme';
import {HorizontalGroup, Text, VerticalGroup} from '../common';
import {ChatSummary} from '@/api';
import {useBuilding, useReservation, useSpace} from '@/state';
import {FontAwesome5} from '@expo/vector-icons';
import {toDateString, toTimeString} from '@/utils';

export type ConversationItemProps = {
  summary: ChatSummary;
  onPress: (summary: ChatSummary) => void;
};

export const ConversationItem = ({summary, onPress}: ConversationItemProps) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);

  const {data: reservation} = useReservation(summary.reservation_id);
  const {data: space} = useSpace(reservation?.space_id);
  const {data: building} = useBuilding(space?.building_id);

  const onConversationPress = () => {
    onPress(summary);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onConversationPress}>
        <HorizontalGroup
          style={{
            justifyContent: 'left',
          }}>
          <FontAwesome5
            name="user"
            size={36}
            color="black"
            style={styles.icon}
          />
          <VerticalGroup style={styles.textArea}>
            <Text>{building?.name}</Text>
            <Text>{space?.name}</Text>
            <Text style={styles.message}>{summary.message}</Text>
          </VerticalGroup>
          <VerticalGroup style={styles.dateArea}>
            <Text>{toDateString(summary.created_at)}</Text>
            <Text>{toTimeString(summary.created_at)}</Text>
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
      backgroundColor: theme.colors.card,
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
