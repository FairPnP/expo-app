import {StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useTheme, AppTheme} from '@/view/theme';
import {ReservationAPI} from '@/api';
import {useAccessToken, useReservations, useSpaces} from '@/state';

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
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [messageOffset, setMessageOffset] = useState(null);
  const {reservation_id} = route.params as ReservationChatScreenProps;
  const tokens = useAccessToken();
  const userId = tokens?.idToken?.payload.sub;

  const {reservationMap} = useReservations();
  const {spaceMap} = useSpaces();
  const reservation = reservationMap?.[reservation_id];
  const space = spaceMap?.[reservation?.space_id];
  const isHost = userId === space?.user_id;

  const loadMessages = useCallback(async () => {
    const res = await ReservationAPI.listMessages(
      reservation_id,
      messageOffset ? {after_id: messageOffset} : {},
    );
    const data = res.messages.map(message => {
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
    });

    // append new messages to the end of the list
    const newMessages = data.filter(
      message => !messages.find(m => m._id === message._id),
    );

    if (newMessages.length > 0) {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );

      // update message offset
      setMessageOffset(newMessages[0]._id);
    }
  }, [messages, messageOffset]);

  useEffect(() => {
    // initial load
    loadMessages();
    // while page is open, load messages every 5 seconds
    const interval = setInterval(() => {
      loadMessages();
    }, 5000);

    // when page is closed, stop loading messages
    return () => clearInterval(interval);
  }, [loadMessages]);

  const onSend = useCallback(
    messages => {
      ReservationAPI.createMessage({
        reservation_id,
        message: messages[0].text,
      }).then(() => {
        loadMessages();
      });
    },
    [loadMessages],
  );

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
