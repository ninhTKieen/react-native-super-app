import { DeviceSubIcon } from '@src/components/devices-icon';
import globalStyles, { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Text, View, useWindowDimensions } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type TDoorSensorDetailProps = {
  metaData: any;
  deviceData: any;
};

const DoorSensorDetail = (props: TDoorSensorDetailProps) => {
  const { metaData, deviceData } = props;
  const changedAnim = useSharedValue(0);
  const changedAnim2 = useSharedValue(0);

  const { width } = useWindowDimensions();

  const handlePress = useCallback(() => {
    changedAnim.value = withTiming(width / 2 - 118, {
      duration: 1000,
      easing: Easing.bounce,
      reduceMotion: ReduceMotion.System,
    });
    changedAnim2.value = withTiming(-(width / 2 - 38), {
      duration: 1000,
      easing: Easing.bounce,
      reduceMotion: ReduceMotion.System,
    });
  }, [changedAnim, changedAnim2, width]);

  const handleGoBack = useCallback(() => {
    changedAnim.value = withTiming(0, {
      duration: 1000,
      easing: Easing.cubic,
      reduceMotion: ReduceMotion.System,
    });
    changedAnim2.value = withTiming(0, {
      duration: 1000,
      easing: Easing.cubic,
      reduceMotion: ReduceMotion.System,
    });
  }, [changedAnim, changedAnim2]);

  React.useEffect(() => {
    deviceData?.door === '1' ? handleGoBack() : handlePress();
  }, [deviceData?.door, handleGoBack, handlePress]);

  const animatedChanged = useAnimatedStyle(() => ({
    transform: [{ translateX: changedAnim.value }],
  }));
  const animatedChanged2 = useAnimatedStyle(() => ({
    transform: [{ translateX: changedAnim2.value }],
  }));

  const { t } = useTranslation();

  return (
    <View className="items-center p-2">
      {metaData?.lastData?.door && (
        <>
          <Text className="mb-3 text-base font-medium text-[#515151]">
            {deviceData?.door === '1'
              ? t(i18nKeys.device.doorOpen)
              : t(i18nKeys.device.doorClose)}
          </Text>
          {deviceData?.door === '1' ? (
            <DeviceSubIcon.door_open
              width={60}
              height={60}
              color={colors.primary}
            />
          ) : (
            <DeviceSubIcon.door_close
              width={60}
              height={60}
              color={colors.primary}
            />
          )}
        </>
      )}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Animated.View
          style={[
            {
              marginTop: 20,
            },
            animatedChanged,
          ]}
        >
          <View
            className="h-[100px] w-[100px] items-center justify-center border-2 border-white bg-[#f7f7f7] p-2"
            style={[globalStyles.commonShadowContainer]}
          >
            <Image
              source={require('@src/assets/yoohome.png')}
              className="h-12 w-12"
            />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            {
              marginTop: 20,
            },
            animatedChanged2,
          ]}
        >
          <View
            className="h-[100px] w-[20px] border-2 border-white bg-[#f7f7f7]"
            style={[globalStyles.commonShadowContainer]}
          >
            <View />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default DoorSensorDetail;
