import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import {
  EDeviceType,
  IDevice,
  IDeviceDetail,
} from '@src/features/devices/device.model';
import { ESceneConditionCompare } from '@src/features/scenes/scene.model';
import { DeviceValueState } from '@src/utils/device.util';
import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { Surface, Text } from 'react-native-paper';

type TZigbeeDoorSensorProps = {
  device: IDevice;
  deviceDetailQuery: UseQueryResult<IDeviceDetail, Error>;
  deviceActions: {
    compare?: ESceneConditionCompare;
    value: string;
    ep: string;
    attribute: string;
    deviceId: string;
  }[];
  deviceScenes: any;
  setCurDevice: React.Dispatch<
    React.SetStateAction<
      | {
          curDevice: {
            ep: string;
            attribute: string;
            deviceId: string;
          };
          options: {
            label: string;
            value: string;
          }[];
        }
      | undefined
    >
  >;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ZigbeeDoorSensorFunc = (props: TZigbeeDoorSensorProps) => {
  const {
    device,
    deviceDetailQuery,
    deviceActions,
    deviceScenes,
    setCurDevice,
    setIsVisible,
  } = props;

  const { t } = useTranslation();

  return (
    <>
      {deviceScenes?.doors?.map((door: any, index: number) => {
        return (
          <Pressable
            style={{ padding: 10 }}
            key={index}
            onPress={() => {
              setIsVisible(true);
              setCurDevice((prev) => ({
                ...prev,
                curDevice: {
                  ep: deviceDetailQuery.data?.metaData?.eps?.[index] as string,
                  attribute: door?.key,
                  deviceId: device.id,
                },
                options: door?.options,
              }));
            }}
          >
            <Surface
              style={{
                padding: 10,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: colors.white,
              }}
            >
              <Text variant="titleMedium">{t(i18nKeys.device.openClose)}</Text>

              <Text variant="titleMedium">
                {DeviceValueState(
                  String(
                    deviceActions?.find(
                      (deviceAction) =>
                        deviceAction.ep ===
                        deviceDetailQuery.data?.metaData?.eps?.[index],
                    )?.value,
                  ),
                  deviceDetailQuery.data?.type as EDeviceType,
                  door?.key,
                )}
              </Text>
            </Surface>
          </Pressable>
        );
      })}
    </>
  );
};

export default ZigbeeDoorSensorFunc;
