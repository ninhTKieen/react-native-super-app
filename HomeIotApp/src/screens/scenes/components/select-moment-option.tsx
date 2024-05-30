import IconGeneral from '@src/components/icon-general';
import { i18nKeys } from '@src/configs/i18n';
import { DeviceValueState } from '@src/utils/device.util';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

type TSelectMomentProps = {
  options: {
    label: string;
    value: string;
  }[];
  onOptionPress: (option: string) => void;
  deviceType?: string;
  attribute?: string;
  selectedValue?: string;
  disabled?: boolean;
};

const SelectMomentOption = (props: TSelectMomentProps) => {
  const { t } = useTranslation();

  return (
    <View
      className="bg-transparent p-3"
      style={{ opacity: !props.disabled ? 1 : 0.5 }}
    >
      <Text className="ml-3 text-base text-[#89B05F]">
        {t(i18nKeys.scene.automation.status)}:
      </Text>

      <View style={{ marginBottom: 20 }} />

      {props.options?.map((option, index) => (
        <TouchableOpacity
          key={index}
          className="flex-row items-center justify-between py-2"
          onPress={() => {
            props.onOptionPress(option.value);
          }}
          disabled={props.disabled}
        >
          <Text className="ml-3 flex-1 text-[15px] font-medium text-[#515151]">
            {props.deviceType
              ? DeviceValueState(
                  String(option.value),
                  props.deviceType as any,
                  props.attribute,
                )
              : t(
                  i18nKeys.device.state[
                    option.label as keyof typeof i18nKeys.device.state
                  ],
                )}
          </Text>

          <IconGeneral
            type="Octicons"
            name={
              props.selectedValue === String(option.value)
                ? 'check-circle-fill'
                : 'circle'
            }
            color={
              props.selectedValue === String(option.value)
                ? '#89B05F'
                : '#D1D1D1'
            }
            size={20}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SelectMomentOption;
