import React from 'react'
import { CircleButton } from './CircleButton'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/view/theme';

export type CloseButtonProps = {
  onPress: () => void;
};

export const CloseButton = ({ onPress }: CloseButtonProps) => {
  const theme = useTheme().theme.appTheme;

  return (
    <CircleButton size={30} onPress={onPress}>
      <Ionicons name="close-outline" size={20} color={theme.colors.text} />
    </CircleButton>
  )
}
