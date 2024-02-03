import React from 'react';
import {Text} from 'react-native';
import {HorizontalGroup, VerticalGroup} from './common';
import {FontAwesome5} from '@expo/vector-icons';

export type UserProfileLabelProps = {
  user_id: string;
  style?: any;
  name_prefix?: string;
};

export const UserProfileLabel = ({
  user_id,
  style,
  name_prefix,
}: UserProfileLabelProps) => {
  return (
    <HorizontalGroup
      style={[
        {
          justifyContent: 'left',
        },
        style,
      ]}>
      <FontAwesome5 name="user" size={36} color="black" style={styles.icon} />
      <VerticalGroup style={styles.textArea}>
        <Text style={{fontWeight: 'bold'}}>
          {name_prefix}User {user_id?.substring(0, 8)}
        </Text>
        <Text style={{color: 'grey'}}>New to FairPnP</Text>
      </VerticalGroup>
    </HorizontalGroup>
  );
};

const styles = {
  icon: {
    paddingHorizontal: 10,
    flex: 0,
  },
  textArea: {
    paddingHorizontal: 4,
  },
};
