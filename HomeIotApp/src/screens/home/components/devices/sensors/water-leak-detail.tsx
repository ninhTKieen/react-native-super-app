import WaterLeak from '@src/assets/home-iot/devices/water-leak.svg';
import { i18nKeys } from '@src/configs/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import AnimatedAlarmRing from './animated-alarm-ring';

type TWaterLeakDetailProps = {
  metaData: any;
  deviceData: any;
};

const WaterLeakDetail = ({ metaData, deviceData }: TWaterLeakDetailProps) => {
  const { t } = useTranslation();

  console.log('metaData', metaData);
  console.log('deviceData', deviceData);

  return (
    <View className="h-full w-full items-center">
      <WaterLeak width={190} height={190} />
      {Number(deviceData?.leak) === 1 &&
        [...Array(3).keys()].map((_, index) => (
          <AnimatedAlarmRing
            colors={['#2B5783', '#339FD9']}
            key={index}
            index={index}
          />
        ))}

      <View className="my-4 rounded-full bg-[#F7F7F7] p-4 px-10">
        <Text className="font-black text-[#AD172B]">
          {Number(deviceData?.leak)
            ? t(i18nKeys.device.waterLeakDetected).toUpperCase()
            : t(i18nKeys.device.noWaterLeakDetected).toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

export default WaterLeakDetail;
