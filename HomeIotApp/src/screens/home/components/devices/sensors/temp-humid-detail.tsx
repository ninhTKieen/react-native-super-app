import { i18nKeys } from '@src/configs/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, Text, View } from 'react-native';

type TTempHumidDetailProps = {
  metaData: any;
  deviceData: any;
};

const TempHumidDetail = ({ metaData, deviceData }: TTempHumidDetailProps) => {
  const { t } = useTranslation();

  return (
    <View className="h-5/6">
      <ImageBackground
        source={require('@src/assets/home-iot/devices/robot-temp-sensor.jpeg')}
        className="h-full w-full object-cover"
      >
        <View className="mt-20 flex-row justify-center">
          <View className="m-3 items-center justify-center">
            {metaData?.lastData?.temperature && (
              <Text className="text-[24px] font-medium text-[#9CC76F]">
                {Number(deviceData?.temperature).toFixed(0)}°C
              </Text>
            )}
            <Text className="text-[12px] font-medium text-[#AAAAAA]">
              {t(i18nKeys.device.temperature)}
            </Text>
          </View>

          <View className="m-3 items-center justify-center">
            {metaData?.lastData?.humidity && (
              <Text className="text-[24px] font-medium text-[#9CC76F]">
                {Number(deviceData?.humidity).toFixed(0)}%
              </Text>
            )}
            <Text className="text-[12px] font-medium text-[#AAAAAA]">
              {t(i18nKeys.device.humidity)}
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default TempHumidDetail;
