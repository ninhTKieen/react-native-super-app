import ArrowDown from '@src/assets/arrow-down.svg';
import { i18nKeys } from '@src/configs/i18n';
import { IDevice, IDeviceDetail } from '@src/features/devices/device.model';
import {
  ESceneConditionCompare,
  ICreateMomentAction,
  ICreateSceneCondition,
  ISceneAction,
  ISceneCondition,
} from '@src/features/scenes/scene.model';
import { UseQueryResult } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';

import SelectDeviceModal from '../../select-device-modal';
import SelectMomentOption from '../../select-moment-option';

type TZigbeeSwitchesProps = {
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
  isRemoveToggle?: boolean;
  condition?:
    | ICreateSceneCondition
    | ISceneCondition
    | ICreateMomentAction
    | ISceneAction;
};

const ZigbeeSwitchesFunc = (props: TZigbeeSwitchesProps) => {
  const {
    device,
    deviceDetailQuery,
    deviceActions,
    deviceScenes,
    setDeviceActions,
    isRemoveToggle,
    condition,
  } = props;

  const { t } = useTranslation();

  const currentIndex = deviceDetailQuery.data?.metaData?.eps?.findIndex(
    (ep) => ep === condition?.ep,
  );

  const [selectedSwitchIndex, setSelectedSwitchIndex] = useState<number>(
    currentIndex && currentIndex !== -1 ? currentIndex : 0,
  );
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View className="bg-transparent">
      <Pressable
        disabled={condition ? true : false}
        onPress={() => setIsVisible(true)}
        className="mx-2 flex-row items-center justify-center border-b border-[#EEEEEE]"
      >
        <Text className="p-3 text-center text-base font-medium text-[#515151]">
          {t(i18nKeys.device.switch)} {selectedSwitchIndex + 1}
        </Text>

        <ArrowDown />
      </Pressable>

      <View>
        <SelectMomentOption
          deviceType={deviceDetailQuery.data?.type}
          options={
            isRemoveToggle
              ? deviceScenes?.switches?.[selectedSwitchIndex]?.options
                  ?.filter((option: any) => option.value !== 2)
                  ?.filter((option: any) => option.value !== 2)
              : deviceScenes?.switches?.[selectedSwitchIndex]?.options
          }
          onOptionPress={(option) => {
            const action = {
              value: option,
              ep: deviceDetailQuery.data?.metaData?.eps?.[
                selectedSwitchIndex
              ] as string,
              attribute: deviceScenes?.switches?.[selectedSwitchIndex]
                ?.key as string,
              deviceId: device.id as string,
            };

            setDeviceActions((prev) => {
              const index = deviceActions.findIndex(
                (item) =>
                  item.ep === action.ep && item.attribute === action.attribute,
              );

              if (index !== -1) {
                prev.splice(index, 1);
                return [...prev, action];
              } else {
                return [...prev, action];
              }
            });
          }}
          selectedValue={String(
            deviceActions?.find(
              (deviceAction) =>
                deviceAction.ep ===
                deviceDetailQuery.data?.metaData?.eps?.[selectedSwitchIndex],
            )?.value,
          )}
        />
      </View>

      <SelectDeviceModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        deviceName={t(i18nKeys.device.switch)}
        devices={deviceScenes?.switches}
        selectedIndex={selectedSwitchIndex}
        setSelectedDeviceIndex={setSelectedSwitchIndex}
      />
    </View>
  );
};

export default ZigbeeSwitchesFunc;
