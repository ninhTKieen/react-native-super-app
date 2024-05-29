import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PowerOnIcon from '@src/assets/home-iot/common/on-icon.svg';
import ScheduleIcon from '@src/assets/home-iot/common/schedule-scene.svg';
import IconGeneral from '@src/components/icon-general';
import { i18nKeys } from '@src/configs/i18n';
import { AutomationStackParamList } from '@src/configs/routes/scene.route';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

type TAutomationConditionModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  mode?: 'CREATE' | 'EDIT';
};

const AutomationConditionModal = (props: TAutomationConditionModalProps) => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<StackNavigationProp<AutomationStackParamList>>();

  const handleSelectCondition = (
    type: 'SCHEDULE' | 'WEATHER_CHANGES' | 'DEVICE_CHANGES',
  ) => {
    props.setIsVisible(false);
    if (props.mode === 'CREATE') {
      navigation.navigate('CreateAutomationStack', {
        screen: 'CreateAddCondition',
        params: {
          type,
          mode: 'CREATE',
        },
      });
    } else if (props.mode === 'EDIT') {
      navigation.navigate('UpdateAutomationStack', {
        screen: 'UpdateAddCondition',
        params: {
          type,
          mode: 'UPDATE',
        },
      });
    }
  };

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
      swipeDirection={['down']}
      onSwipeComplete={() => {
        props.setIsVisible(false);
      }}
      className="m-0 justify-end"
    >
      <View className="rounded-xl bg-white p-3">
        <View className="h-1 w-24 self-center rounded-full bg-[#AAAAAA]" />

        <View className="mb-5" />

        <TouchableOpacity
          className="flex-row items-center justify-between rounded-full bg-[#F7F7F7] p-3"
          onPress={() => {
            handleSelectCondition('SCHEDULE');
          }}
        >
          <ScheduleIcon width={36} height={36} />

          <Text
            className="ml-4 flex-1 text-base font-medium text-[#515151]"
            numberOfLines={1}
          >
            {t(i18nKeys.scene.automation.schedule)}
          </Text>

          <IconGeneral
            type="MaterialIcons"
            name="keyboard-arrow-right"
            size={30}
            color="#515151"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="mt-3 flex-row items-center justify-between rounded-full bg-[#F7F7F7] p-3"
          onPress={() => {
            handleSelectCondition('DEVICE_CHANGES');
            props.setIsVisible(false);
          }}
        >
          <PowerOnIcon width={36} height={36} />

          <Text
            className="ml-4 flex-1 text-base font-medium text-[#515151]"
            numberOfLines={1}
          >
            {t(i18nKeys.scene.automation.deviceStatusChange)}
          </Text>

          <IconGeneral
            type="MaterialIcons"
            name="keyboard-arrow-right"
            size={30}
            color="#515151"
          />
        </TouchableOpacity>

        <View style={{ marginBottom: 50 }} />
      </View>
    </Modal>
  );
};

export default AutomationConditionModal;
