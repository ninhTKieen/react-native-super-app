import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type TGradientButtonProps = {
  title: string;
  onPress: () => void;
  additionalStyles?: StyleProp<ViewStyle>;
  titleStyles?: StyleProp<TextStyle>;
  headIcon?: React.ReactNode;
  disabled?: boolean;
};

const GradientButton = (props: TGradientButtonProps) => {
  const { title, onPress, additionalStyles, headIcon, disabled } = props;

  return (
    <TouchableOpacity
      className="w-1/2 overflow-hidden rounded-full"
      style={additionalStyles}
      onPress={onPress}
      disabled={disabled}
    >
      <LinearGradient
        colors={disabled ? ['#757575', '#e0e0e0'] : ['#9CC76F', '#c5da8b']}
        className="w-full items-center p-[12px]"
      >
        {headIcon && headIcon}
        <Text
          className="mx-2 text-[16px] text-white"
          style={[props.titleStyles]}
        >
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
