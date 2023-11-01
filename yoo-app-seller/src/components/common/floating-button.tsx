import React from 'react';
import {StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

interface IFabProps {
  icon?: any;
  onPress: () => void;
  customStyle?: StyleProp<ViewStyle> | {};
}

const FloatingButton = ({icon, onPress, customStyle}: IFabProps) => {
  return (
    <TouchableOpacity
      style={[styles.floatButton, customStyle]}
      onPress={onPress}>
      {icon ? icon : <IonIcons name="ios-arrow-up" size={30} color="white" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  floatButton: {
    position: 'absolute',
    width: 48,
    height: 48,
    backgroundColor: '#2D9CDB',
    right: 10,
    bottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
});

export default FloatingButton;
