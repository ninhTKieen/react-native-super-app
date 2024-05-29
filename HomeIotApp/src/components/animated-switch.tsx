import OffIcon from '@src/assets/home-iot/common/off-icon.svg';
import OnIcon from '@src/assets/home-iot/common/on-icon.svg';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const AnimatedSwitch = () => {
  const animation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: animation.value }],
    };
  });
  const [value, setValue] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={() => {
        if (animation.value === 0) {
          animation.value = withTiming(78, { duration: 500 });
          setValue(true);
        } else {
          animation.value = withTiming(0, { duration: 500 });
          setValue(false);
        }
      }}
      className="h-12 w-32 flex-row items-center rounded-full border-[5px] border-[#eeeeee] p-1"
    >
      <Animated.View style={[animatedStyle]}>
        {!value ? (
          <OffIcon width={30} height={30} />
        ) : (
          <OnIcon width={30} height={30} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedSwitch;
