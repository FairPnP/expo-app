import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {useConversations} from '@/state';
import {
  ConversationItem,
  ListView,
  LoadingSpinner,
  Section,
} from '../components';
import {ChatSummary} from '@/api';
import {AppTheme, useTheme} from '@/view/theme';
import {SafeAreaView} from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Section title="Inbox">
          <ListView
            data={conversations?.conversations}
            renderItem={renderConversation}
            keyExtractor={item => item.reservation_id.toString()}
            emptyMessage="Inbox is empty."
            style={styles.content}
          />
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    spacer: {
      height: 20,
    },
    topBar: {
      paddingVertical: 8,
      paddingHorizontal: 8,
    },
    content: {
      padding: 4,
    },
  });
