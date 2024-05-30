import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SIZE = 90;

type AnimatedRingPropType = {
  size?: number;
  index: number;
  colors: (string | number)[] | SharedValue<(string | number)[]>;
};

const AnimatedLinear = Animated.createAnimatedComponent(LinearGradient);

const AnimatedAlarmRing = (props: AnimatedRingPropType) => {
  const { index } = props;
  const opacityValue = useSharedValue(0.7);
  const scaleValue = useSharedValue(1);

  useEffect(() => {
    opacityValue.value = withDelay(
      index * 400,
      withRepeat(
        withTiming(0, {
          duration: 2000,
        }),
        -1,
        false,
      ),
    );
    scaleValue.value = withDelay(
      index * 400,
      withRepeat(
        withTiming(3, {
          duration: 2000,
        }),
        -1,
        false,
      ),
    );
  }, [opacityValue, scaleValue, index]);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scaleValue.value,
        },
      ],
      opacity: opacityValue.value,
    };
  });

  return <AnimatedLinear colors={props.colors} style={[styles.dot, rStyle]} />;
};

const styles = StyleSheet.create({
  dot: {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    position: 'absolute',
    top: 95 / 2,
  },
});

export default AnimatedAlarmRing;
