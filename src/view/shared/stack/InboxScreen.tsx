import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useConversations} from '@/state';
import {ConversationItem, ListView, LoadingSpinner, Title} from '../components';
import {ChatSummary} from '@/api';
import {AppTheme, useTheme} from '@/view/theme';

export const InboxScreen = ({navigation}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  const {data: conversations, isLoading} = useConversations();

  if (isLoading) {
    return (
      <View>
        <LoadingSpinner />
      </View>
    );
  }

  const onPress = (summary: ChatSummary) => {
    navigation.navigate('ReservationChat', {
      reservation_id: summary.reservation_id,
    });
  };

  const renderConversation = ({item}: {item: ChatSummary}) => {
    return <ConversationItem summary={item} onPress={onPress} />;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.page}>
          <Title>Inbox</Title>
          <View style={styles.separator} />
          <ListView
            data={conversations?.conversations}
            renderItem={renderConversation}
            keyExtractor={item => item.reservation_id.toString()}
            emptyMessage="Inbox is empty."
          />
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    page: {
      flex: 1,
      padding: 8,
    },
    spacer: {
      height: 20,
    },
    topBar: {
      paddingVertical: 8,
      paddingHorizontal: 8,
    },
    separator: {
      borderBottomColor: theme.colors.border,
      borderBottomWidth: 1,
    },
  });
