import ArrowDown from '@src/assets/arrow-down.svg';
import LightIcon from '@src/assets/home-iot/common/light-bulb-dimmer.svg';
import ThumbIcon from '@src/assets/home-iot/common/thumb-icon.svg';
import { colors } from '@src/configs/constant/global-styles';
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
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';

import SelectDeviceModal from '../../select-device-modal';
import SelectMomentOption from '../../select-moment-option';

type TZigbeeDimmersProps = {
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
  deviceScenes: any;
  isRemoveToggle?: boolean;
  condition?:
    | ICreateSceneCondition
    | ISceneCondition
    | ICreateMomentAction
    | ISceneAction;
};

const DimmerSlider = ({
  dimValue,
  onSlidingComplete,
  disabled,
}: {
  dimValue: any;
  onSlidingComplete: (value: number) => void;
  disabled?: boolean;
}) => {
  const min = useSharedValue(0);
  const max = useSharedValue(255);
  const progress = useSharedValue(Number(dimValue) || 0);

  useEffect(() => {
    progress.value = dimValue;
  }, [dimValue, progress]);

  return (
    <Slider
      style={{
        width: '100%',
        height: 40,
      }}
      containerStyle={{
        borderRadius: 10,
      }}
      minimumValue={min}
      maximumValue={max}
      progress={progress}
      onSlidingComplete={onSlidingComplete}
      sliderHeight={18}
      theme={{
        maximumTrackTintColor: '#EEEEEE',
        minimumTrackTintColor: colors.primary,
        bubbleBackgroundColor: colors.primary,
      }}
      renderThumb={() => (
        <View className="h-8 w-8 items-center justify-center rounded-full border border-[#9CC76F] bg-white">
          <ThumbIcon width={20} height={20} />
        </View>
      )}
      disable={disabled}
    />
  );
};

const ZigbeeDimmersFunc = (props: TZigbeeDimmersProps) => {
  const {
    device,
    deviceDetailQuery,
    deviceActions,
    setDeviceActions,
    deviceScenes,
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

  console.log('condition', condition);

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
          deviceType={device.type}
          attribute={deviceScenes?.dimmers?.[selectedSwitchIndex]?.[0].key}
          disabled={
            condition &&
            condition.attribute !==
              deviceScenes?.dimmers?.[selectedSwitchIndex]?.[0].key
          }
          options={
            isRemoveToggle
              ? deviceScenes?.dimmers?.[
                  selectedSwitchIndex
                ]?.[0].options?.filter((option: any) => option.value !== 2)
              : deviceScenes?.dimmers?.[selectedSwitchIndex]?.[0].options
          }
          onOptionPress={(option) => {
            const action = {
              value: option,
              ep: deviceDetailQuery.data?.metaData?.eps?.[
                selectedSwitchIndex
              ] as string,
              attribute: deviceScenes?.dimmers?.[selectedSwitchIndex]?.[0]
                .key as string,
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
                  deviceDetailQuery.data?.metaData?.eps?.[
                    selectedSwitchIndex
                  ] &&
                deviceAction.attribute ===
                  deviceScenes?.dimmers?.[selectedSwitchIndex]?.[0].key,
            )?.value,
          )}
        />
      </View>

      <View
        className="flex-row items-center"
        style={{
          opacity:
            condition &&
            condition.attribute !==
              deviceScenes?.dimmers?.[selectedSwitchIndex]?.[1].key
              ? 0.5
              : 1,
        }}
      >
        <LightIcon width={34} height={34} className="mr-2" />
        <DimmerSlider
          disabled={
            condition &&
            condition.attribute !==
              deviceScenes?.dimmers?.[selectedSwitchIndex]?.[1].key
          }
          dimValue={
            deviceActions?.find(
              (deviceAction) =>
                deviceAction.ep ===
                  deviceDetailQuery.data?.metaData?.eps?.[
                    selectedSwitchIndex
                  ] &&
                deviceAction.attribute ===
                  deviceScenes?.dimmers?.[selectedSwitchIndex]?.[1].key,
            )?.value
              ? Number(
                  deviceActions?.find(
                    (deviceAction) =>
                      deviceAction.ep ===
                        deviceDetailQuery.data?.metaData?.eps?.[
                          selectedSwitchIndex
                        ] &&
                      deviceAction.attribute ===
                        deviceScenes?.dimmers?.[selectedSwitchIndex]?.[1].key,
                  )?.value,
                )
              : 0
          }
          onSlidingComplete={(value) => {
            setDeviceActions((prev) => {
              const dimIndex = prev.findIndex(
                (item) =>
                  item.ep ===
                    deviceDetailQuery.data?.metaData?.eps?.[
                      selectedSwitchIndex
                    ] &&
                  item.attribute ===
                    deviceScenes?.dimmers?.[selectedSwitchIndex]?.[1].key,
              );

              if (dimIndex !== -1) {
                prev.splice(dimIndex, 1);
                return [
                  ...prev,
                  {
                    value: String(Math.trunc(value)),
                    ep: deviceDetailQuery.data?.metaData?.eps?.[
                      selectedSwitchIndex
                    ] as string,
                    attribute:
                      deviceScenes?.dimmers?.[selectedSwitchIndex]?.[1].key,
                    deviceId: device.id,
                  },
                ];
              } else {
                return [
                  ...prev,
                  {
                    value: String(Math.trunc(value)),
                    ep: deviceDetailQuery.data?.metaData?.eps?.[
                      selectedSwitchIndex
                    ] as string,
                    attribute:
                      deviceScenes?.dimmers?.[selectedSwitchIndex]?.[1].key,
                    deviceId: device.id,
                  },
                ];
              }
            });
          }}
        />

        <View className="ml-2 h-[40px] w-[40px] items-center justify-center rounded-full bg-[#F7F7F7]">
          <Text className="text-center text-sm font-medium text-[#9CC76F]">
            {deviceActions?.find(
              (deviceAction) =>
                deviceAction.ep ===
                  deviceDetailQuery.data?.metaData?.eps?.[
                    selectedSwitchIndex
                  ] &&
                deviceAction.attribute ===
                  deviceScenes?.dimmers?.[selectedSwitchIndex]?.[1].key,
            )?.value
              ? (
                  (Number(
                    deviceActions?.find(
                      (deviceAction) =>
                        deviceAction.ep ===
                          deviceDetailQuery.data?.metaData?.eps?.[
                            selectedSwitchIndex
                          ] &&
                        deviceAction.attribute ===
                          deviceScenes?.dimmers?.[selectedSwitchIndex]?.[1].key,
                    )?.value,
                  ) /
                    255) *
                  100
                ).toFixed(0)
              : '0'}
            %
          </Text>
        </View>
      </View>

      <SelectDeviceModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        deviceName={t(i18nKeys.device.switch)}
        devices={deviceScenes?.dimmers}
        selectedIndex={selectedSwitchIndex}
        setSelectedDeviceIndex={setSelectedSwitchIndex}
      />
    </View>
  );
};

export default ZigbeeDimmersFunc;
