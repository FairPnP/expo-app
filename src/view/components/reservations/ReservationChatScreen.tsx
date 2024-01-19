import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useTheme, AppTheme} from '@/view/theme';
import {
  useAccessToken,
  useCreateMessage,
  useMessages,
  useReservation,
  useSpace,
} from '@/state';
import {LoadingSpinner} from '../common';

export type ReservationChatScreenProps = {
  reservation_id: number;
};

type MessageData = {
  _id: number;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    name: string;
  };
};

export const ReservationChatScreen = ({navigation, route}) => {
  const theme = useTheme().theme.appTheme;
  const styles = getStyles(theme);
  // const [messageOffset, setMessageOffset] = useState(undefined);
  const {reservation_id} = route.params as ReservationChatScreenProps;
  const tokens = useAccessToken();
  const userId = tokens?.idToken?.payload.sub;

  const {mutateAsync: createMessage} = useCreateMessage(reservation_id);
  const {
    data: messageData,
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = useMessages(reservation_id, {
    // after_id: messageOffset,
  });
  const {data: reservation} = useReservation(reservation_id);
  const {data: space} = useSpace(reservation?.space_id);
  const isHost = userId === space?.user_id;

  useEffect(() => {
    const interval = setInterval(() => {
      refetchMessages();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetchMessages]);

  const messages: MessageData[] = useMemo(
    () =>
      messageData?.messages.map(message => {
        return {
          _id: message.id,
          text: message.message,
          createdAt: new Date(message.created_at),
          user: {
            _id: message.sender_id,
            name:
              message.sender_id === userId ? 'You' : isHost ? 'Host' : 'Guest',
          },
        };
      }),
    [messageData?.messages, userId, isHost],
  );

  const onSend = useCallback(
    messages => {
      createMessage({
        reservation_id,
        message: messages[0].text,
      });
    },
    [reservation_id, createMessage],
  );

  if (!reservation || !space || !messages || isLoadingMessages) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: userId,
        }}
      />
    </View>
  );
};

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
  });
