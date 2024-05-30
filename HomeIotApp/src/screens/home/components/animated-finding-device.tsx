import CircleEllipseIcon from '@src/assets/home-iot/common/circle-ellipse-icon.svg';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import CircleSlice from './circle-slice';

const AnimatedFindingDevice = () => {
  const sv = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(sv.value, [0, 0.7, 1], [0, 1, 0]),
    transform: [{ rotate: `${sv.value * 130}deg` }],
  }));

  useEffect(() => {
    sv.value = withRepeat(withTiming(1, { duration: 2000 }), -2, false);
  }, [sv]);

  return (
    <View className="items-center">
      <Animated.View style={[animatedStyle]} className="absolute">
        <CircleSlice radius={120} startAngle={-180} endAngle={-130} />
      </Animated.View>

      <CircleEllipseIcon width={240} height={240} />
    </View>
  );
};

export default AnimatedFindingDevice;
