import Slider from '@react-native-community/slider';
import { colors } from '@src/configs/constant/global-styles';
import { IDevice, IDeviceDetail } from '@src/features/devices/device.model';
import { ESceneConditionCompare } from '@src/features/scenes/scene.model';
import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import { Surface } from 'react-native-paper';

import CompareCondition from '../../compare-condition';

type TZigbeeTempHumidFuncProps = {
  device: IDevice;
  deviceDetailQuery: UseQueryResult<IDeviceDetail, Error>;
  deviceActions: {
    compare?: ESceneConditionCompare;
    value: string;
    ep: string;
    attribute: string;
    deviceId: string;
  }[];
  setDeviceActions: React.Dispatch<
    React.SetStateAction<
      {
        compare?: ESceneConditionCompare | undefined;
        value: string;
        ep: string;
        attribute: string;
        deviceId: string;
      }[]
    >
  >;
};

const ZigbeeTempHumidFunc = (props: TZigbeeTempHumidFuncProps) => {
  const { device, deviceDetailQuery, deviceActions, setDeviceActions } = props;
  return (
    <Surface style={{ margin: 10, padding: 15, backgroundColor: colors.white }}>
      <CompareCondition
        currentValue={
          deviceActions?.find(
            (deviceAction) =>
              deviceAction.ep === deviceDetailQuery.data?.metaData?.eps?.[0] &&
              deviceAction.attribute === 'temperature',
          )?.compare
        }
        onChange={(value) => {
          setDeviceActions((prev) => {
            const tempIndex = prev.findIndex(
              (item) =>
                item.ep === deviceDetailQuery.data?.metaData?.eps?.[0] &&
                item.attribute === 'temperature',
            );

            if (tempIndex === -1) {
              return [
                ...prev,
                {
                  value: '0',
                  compare: value,
                  ep: deviceDetailQuery.data?.metaData?.eps?.[0] as string,
                  attribute: 'temperature',
                  deviceId: device.id,
                },
              ];
            } else {
              return prev.map((item) => {
                if (
                  item.ep === deviceDetailQuery.data?.metaData?.eps?.[0] &&
                  item.attribute === 'temperature'
                ) {
                  return {
                    ...item,
                    compare: value,
                  };
                }

                return item;
              });
            }
          });
        }}
      />
      <Slider
        style={{
          width: '100%',
          height: 40,
          marginTop: 10,
        }}
        minimumValue={-45}
        maximumValue={45}
        step={0.5}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor="#E5E5E5"
        onSlidingComplete={(value: any) => {
          setDeviceActions((prev) => {
            const tempIndex = prev.findIndex(
              (item) =>
                item.ep === deviceDetailQuery.data?.metaData?.eps?.[0] &&
                item.attribute === 'temperature',
            );

            if (tempIndex !== -1) {
              return prev.map((item) => {
                if (
                  item.ep === deviceDetailQuery.data?.metaData?.eps?.[0] &&
                  item.attribute === 'temperature'
                ) {
                  return {
                    ...item,
                    value: String(value),
                  };
                }

                return item;
              });
            } else {
              return [
                ...prev,
                {
                  value: String(value),
                  compare: ESceneConditionCompare.EQUAL,
                  ep: deviceDetailQuery.data?.metaData?.eps?.[0] as string,
                  attribute: 'temperature',
                  deviceId: device.id,
                },
              ];
            }
          });
        }}
      />
    </Surface>
  );
};

export default ZigbeeTempHumidFunc;
