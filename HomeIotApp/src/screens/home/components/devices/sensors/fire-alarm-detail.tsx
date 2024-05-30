import FireAlarm from '@src/assets/home-iot/devices/fire-alarm-circle.svg';
import { i18nKeys } from '@src/configs/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';

import AnimatedAlarmRing from './animated-alarm-ring';

const FireAlarmDetail = () => {
  const { t } = useTranslation();

  return (
    <View className="h-full w-full items-center">
      <FireAlarm width={190} height={190} />
      {[...Array(3).keys()].map((_, index) => (
        <AnimatedAlarmRing
          colors={['#f4501f', '#FAB783']}
          key={index}
          index={index}
        />
      ))}

      <View className="my-4 rounded-full bg-[#F7F7F7] p-4 px-10">
        <Text className="font-black text-[#AD172B]">
          {t(i18nKeys.device.fireWarning).toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

export default FireAlarmDetail;
