import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PowerOnIcon from '@src/assets/home-iot/common/on-icon.svg';
import ScheduleIcon from '@src/assets/home-iot/common/schedule-scene.svg';
import IconGeneral from '@src/components/icon-general';
import { i18nKeys } from '@src/configs/i18n';
import { MomentStackParamList } from '@src/configs/routes/scene.route';
import { ICreateMomentAction } from '@src/features/scenes/scene.model';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

type TSelectMomentActionModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  actionValues: ICreateMomentAction[];
  mode?: 'CREATE' | 'EDIT';
};

const SelectMomentActionModal = (props: TSelectMomentActionModalProps) => {
  const { t } = useTranslation();

  const navigation = useNavigation<StackNavigationProp<MomentStackParamList>>();

  const handleSelectAction = (type: 'RUN_DEVICE' | 'DELAY' | 'SELECT_AUTO') => {
    props.setIsVisible(false);
    if (props.mode === 'CREATE') {
      navigation.navigate('CreateMomentStack', {
        screen: 'CreateMomentAction',
        params: {
          type,
          actionValues: props.actionValues,
          mode: 'CREATE',
        },
      });
    } else {
      navigation.navigate('UpdateMomentStack', {
        screen: 'UpdateMomentAction',
        params: {
          type,
          actionValues: props.actionValues,
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
            handleSelectAction('RUN_DEVICE');
          }}
        >
          <PowerOnIcon width={36} height={36} />

          <Text
            className="ml-4 flex-1 text-base font-medium text-[#515151]"
            numberOfLines={1}
          >
            {t(i18nKeys.scene.runDevice)}
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
            handleSelectAction('DELAY');
          }}
        >
          <ScheduleIcon width={36} height={36} />

          <Text
            className="ml-4 flex-1 text-base font-medium text-[#515151]"
            numberOfLines={1}
          >
            {t(i18nKeys.scene.delay)}
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

export default SelectMomentActionModal;
