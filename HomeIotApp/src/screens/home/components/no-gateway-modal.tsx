import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';

type TNoGwModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
};

const NoGatewayModal = ({ isVisible, setIsVisible }: TNoGwModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setIsVisible(false)}
      onBackButtonPress={() => setIsVisible(false)}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
    >
      <View className="overflow-hidden rounded-2xl bg-white">
        <View className="bg-[#F7F7F7] p-4">
          <Text className="text-center text-[18px] font-medium text-[#AD172B]">
            {t(i18nKeys.device.noGatewayTitle)}
          </Text>
          <Text
            className={`text-[${colors.darkGrey}] mt-2 text-center text-[14px]`}
          >
            {t(i18nKeys.device.noGatewayText)}
          </Text>
        </View>

        <View className="bg-white">
          <FastImage
            source={require('@src/assets/home-iot/common/images/no-gateway.jpeg')}
            className="my-8 h-[200px] w-full"
            resizeMode="contain"
          />
        </View>
      </View>
    </Modal>
  );
};

export default NoGatewayModal;
