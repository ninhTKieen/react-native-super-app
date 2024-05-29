import { EWeekDay } from '@src/common/common.model';
import IconGeneral from '@src/components/icon-general';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

type TRepeatDaysModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  repeatDays: {
    id: number;
    isSelected: boolean;
    value: EWeekDay;
  }[];
  setRepeatDays: (repeatDays: any) => void;
};

const RepeatDaysModal = (props: TRepeatDaysModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={() => props.setIsVisible(false)}
      onBackButtonPress={() => props.setIsVisible(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      className="m-5 mb-72"
    >
      <View className="rounded-xl bg-white p-3">
        {props.repeatDays.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="mb-3 flex-row items-center justify-between rounded-full bg-[#EEEEEE] px-4 py-2"
              onPress={() => {
                const newRepeatDays = [...props.repeatDays];
                newRepeatDays[index].isSelected =
                  !newRepeatDays[index].isSelected;
                props.setRepeatDays(newRepeatDays);
              }}
            >
              <Text className="text-base font-medium text-[#515151]">
                {t(i18nKeys.dayOfWeek.short[`${item.value}`])}
              </Text>
              <IconGeneral
                type="MaterialCommunityIcons"
                name={
                  item.isSelected
                    ? 'check-circle'
                    : 'checkbox-blank-circle-outline'
                }
                color={item.isSelected ? colors.primary : colors.black}
                size={24}
                onPress={() => {
                  const newRepeatDays = [...props.repeatDays];
                  newRepeatDays[index].isSelected =
                    !newRepeatDays[index].isSelected;
                  props.setRepeatDays(newRepeatDays);
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </Modal>
  );
};

export default RepeatDaysModal;
