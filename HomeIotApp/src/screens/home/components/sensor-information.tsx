import IconGeneral from '@src/components/icon-general';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { EDeviceType } from '@src/features/devices/device.model';
import { useDeviceStore } from '@src/features/devices/device.store';
import { getDeviceResponse } from '@src/utils/device.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import { TDeviceInformationProps } from './device-information';
import DoorSensorDetail from './devices/sensors/door-sensor-detail';
import FireAlarmDetail from './devices/sensors/fire-alarm-detail';
import TempHumidDetail from './devices/sensors/temp-humid-detail';
import WaterLeakDetail from './devices/sensors/water-leak-detail';

const SensorInformation = (props: TDeviceInformationProps) => {
  const { profile } = useDeviceStore();

  const metaData = props.metaData;
  const deviceData = getDeviceResponse({
    type: props.deviceType,
    metaData: metaData,
    profile: profile?.[props.deviceType],
  });

  const { t } = useTranslation();

  return (
    <>
      {props.deviceType === EDeviceType.ZIGBEE_SENSOR_PIR && (
        <View style={{ alignItems: 'center' }}>
          <IconGeneral
            type="MaterialCommunityIcons"
            name="motion-sensor"
            size={60}
            color={colors.primary}
          />
          {metaData?.lastData?.pir && (
            <Text style={{ marginTop: 10 }} variant="titleMedium">
              {deviceData?.pir === '1'
                ? t(i18nKeys.device.motionDetected)
                : t(i18nKeys.device.motionNotDetected)}
            </Text>
          )}

          {metaData?.lastData?.lux && (
            <Text variant="titleSmall">{deviceData?.lux} lux</Text>
          )}
        </View>
      )}
      {props.deviceType === EDeviceType.ZIGBEE_SENSOR_TEMPERATURE_HUMIDITY && (
        <TempHumidDetail metaData={metaData} deviceData={deviceData} />
      )}
      {props.deviceType === EDeviceType.ZIGBEE_SENSOR_DOOR && (
        <DoorSensorDetail metaData={metaData} deviceData={deviceData} />
      )}
      {props.deviceType === EDeviceType.ZIGBEE_SENSOR_FIRE_ALARM && (
        <FireAlarmDetail />
      )}
      {props.deviceType === EDeviceType.ZIGBEE_SENSOR_WATER_LEAK && (
        <WaterLeakDetail metaData={metaData} deviceData={deviceData} />
      )}
    </>
  );
};

export default SensorInformation;
