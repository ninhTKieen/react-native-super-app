import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import IconGeneral from './icon-general';

export interface TabTitleProps {
  title: string;
  right?: JSX.Element;
  left?: JSX.Element;
  center?: JSX.Element;
  styleLeft?: StyleProp<ViewStyle>;
  styleRight?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  onPressLeft?: (event: GestureResponderEvent) => void;
  onPressRight?: (event: GestureResponderEvent) => void;
}

const TopBar = (props: TabTitleProps): JSX.Element => {
  const navigation = useNavigation();
  const goToBack = () => {
    navigation.goBack();
  };
  return (
    <View style={[styles.container, props.styleContainer]}>
      <TouchableOpacity
        style={props.styleLeft}
        onPress={props.onPressLeft ? props.onPressLeft : goToBack}
      >
        {props.left ? (
          props.left
        ) : (
          <IconGeneral
            type="Ionicons"
            name="chevron-back-outline"
            color={'black'}
            size={24}
          />
        )}
      </TouchableOpacity>
      {props.center ? (
        props.center
      ) : (
        <Text style={[styles.title, props.styleTitle]}>{props.title}</Text>
      )}

      <TouchableOpacity
        style={props.styleRight}
        onPress={props.onPressRight ? props.onPressRight : () => {}}
      >
        {props.right ? props.right : <Text style={{ fontSize: 24 }}> </Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    // ...shadowConstants[1],
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default TopBar;
