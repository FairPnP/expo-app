import {Image, View} from 'react-native';
import React from 'react';
import {HorizontalGroup, Title} from './common';

export type LogoWithNameProps = {
  size?: number;
};

export const LogoWithName = ({size}: LogoWithNameProps) => {
  if (!size) {
    size = 100;
  }
  const fontSize = Math.round(size / 4);
  return (
    <View>
      <HorizontalGroup style={{alignSelf: 'center'}}>
        <Image
          source={require('../../../../assets/icon.png')}
          style={{height: size, width: size}}
        />
        <Title style={{fontSize: fontSize}}>Fair Park and Pay</Title>
        <View style={{width: size / 4}} />
      </HorizontalGroup>
    </View>
  );
};
