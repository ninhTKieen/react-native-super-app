import { storage } from '@src/common/mmkv.storage';
import { DeviceIcons } from '@src/components/devices-icon';
import { CURRENT_HOME_ID_KEY } from '@src/configs/constant/constant.config';
import { i18nKeys } from '@src/configs/i18n';
import {
  DeviceGatewayTypes,
  DeviceSensorTypes,
  DeviceSwitchTypes,
  EDeviceType,
  IDevice,
} from '@src/features/devices/device.model';
import { useDeviceName } from '@src/hooks/use-device-name.hook';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import { MD2Colors, ProgressBar, Text } from 'react-native-paper';

import SensorInformation from './sensor-information';
import SwitchCommandInformation from './switch-command-information';

export type TDeviceInformationProps = {
  metaData: any;
  deviceType: EDeviceType;
  deviceId: string;
};

const DeviceInformation = (props: TDeviceInformationProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const currentHomeId = storage.getNumber(CURRENT_HOME_ID_KEY);

  const devices = queryClient.getQueryData<IDevice[]>([
    'devices/get-all',
    { homeId: currentHomeId },
  ]);

  const subGWDevices = devices?.filter(
    (device: any) => device.parentId === props.deviceId,
  );

  const batteryPercentage = Number(props.metaData?.battery) / 100;

  const { DeviceNames } = useDeviceName();

  return (
    <View style={styles.container}>
      {DeviceGatewayTypes.includes(props.deviceType) ? (
        <View className="bg-transparent p-4">
          <Text variant="titleLarge" style={{ marginBottom: 20 }}>
            {t(i18nKeys.device.subDevices)}: {subGWDevices?.length || 0}
          </Text>

          <FlatList
            data={subGWDevices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const deviceIcon = DeviceIcons.get(item.type);
              const DvIconComponent = deviceIcon ? deviceIcon(30, 30) : <></>;

              return (
                <View className="mb-[10px] flex-row items-center">
                  <View style={{ flex: 1 }}>{DvIconComponent}</View>
                  <Text
                    style={{ marginHorizontal: 10, flex: 6 }}
                    variant="titleMedium"
                    numberOfLines={2}
                  >
                    {DeviceNames[item.type as keyof typeof DeviceNames]}
                  </Text>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <>
          {!DeviceSwitchTypes.includes(props.deviceType) &&
            props.metaData?.battery && (
              <View style={styles.batteryContainer} className="p-2">
                <View style={{ backgroundColor: 'transparent', flex: 1 }}>
                  <Text variant="titleMedium">
                    {t(i18nKeys.device.battery)}
                  </Text>
                </View>

                <View style={{ backgroundColor: 'transparent', flex: 4 }}>
                  <Text
                    style={{
                      color:
                        batteryPercentage >= 0.8
                          ? MD2Colors.greenA700
                          : batteryPercentage >= 0.3
                          ? MD2Colors.yellow800
                          : MD2Colors.redA700,
                    }}
                  >
                    {props.metaData?.battery} %
                  </Text>
                  <ProgressBar
                    progress={batteryPercentage}
                    color={
                      batteryPercentage >= 0.8
                        ? MD2Colors.greenA700
                        : batteryPercentage >= 0.3
                        ? MD2Colors.yellow800
                        : MD2Colors.redA700
                    }
                    style={{ height: 10, borderRadius: 5 }}
                  />
                </View>
              </View>
            )}

          <View style={{ marginTop: 20, backgroundColor: 'transparent' }} />

          {DeviceSensorTypes.includes(props.deviceType) && (
            <SensorInformation {...props} />
          )}
          {DeviceSwitchTypes.includes(props.deviceType) && (
            <SwitchCommandInformation {...props} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '80%',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },

  batteryContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});

export default DeviceInformation;
