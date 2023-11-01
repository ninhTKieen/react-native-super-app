import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import IconGeneral, {TypeIcon} from '@/components/common/icon-general';

type Icon = {
  type: TypeIcon;
  color?: string;
  size?: number;
  name: string;
};
type Props = {
  numberTab: number;
  stateIndex: number;
  setStateIndex: Function;
  routes: Array<{
    title: string;
    icon?: {
      focused?: Icon;
      normal: Icon;
    };
  }>;
  txtStyles?: (focused: boolean) => TextStyle;
  containerStyles?: ViewStyle;
  indicatorStyles?: ViewStyle;
  tabItemStyle?: ViewStyle;
  widthTab: number;
};

const TabBarStatistic = ({
  numberTab,
  stateIndex,
  setStateIndex,
  routes,
  txtStyles,
  containerStyles,
  indicatorStyles,
  widthTab,
  tabItemStyle,
}: Props) => {
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    if (offset.value !== stateIndex) {
      offset.value = stateIndex;
    }
    return {
      zIndex: 10,
      width: widthTab / numberTab,
      transform: [
        {
          translateX: withSpring((offset.value * widthTab) / numberTab, {
            velocity: 10,
          }),
        },
      ],
    };
  }, [stateIndex]);
  return (
    <View style={styles.container}>
      <View style={containerStyles ? containerStyles : {}}>
        <Animated.View
          style={[animatedStyles, indicatorStyles ? indicatorStyles : {}]}>
          <Text
            style={[
              {
                fontWeight: '600',
                fontSize: 15,
                lineHeight: 18,
              },
              txtStyles ? txtStyles(false) : {},
            ]}>
            {' '}
          </Text>
        </Animated.View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            paddingVertical: 6,
          }}>
          {routes.map((route, index) => {
            const isFocused = stateIndex === index;

            const onPress = () => {
              if (!isFocused) {
                setStateIndex(index);
              }
            };
            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={[
                  {
                    flex: 1,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    zIndex: 0,
                  },
                  tabItemStyle,
                ]}>
                <Text
                  style={[
                    {
                      color: isFocused ? '#fff' : '#878A9C',
                      fontWeight: '600',
                      fontSize: 15,
                      lineHeight: 18,
                    },
                    txtStyles ? txtStyles(isFocused) : {},
                  ]}>
                  {route.title}
                </Text>
                {route.icon ? (
                  isFocused && route.icon.focused ? (
                    <IconGeneral
                      type={route.icon.focused.type}
                      name={route.icon.focused.name}
                      color={route.icon.focused.color}
                      size={route.icon.focused.size}
                    />
                  ) : (
                    <IconGeneral
                      type={route.icon.normal.type}
                      name={route.icon.normal.name}
                      color={route.icon.normal.color}
                      size={route.icon.normal.size}
                    />
                  )
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default TabBarStatistic;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
