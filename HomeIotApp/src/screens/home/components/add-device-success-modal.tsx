import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DeviceImages } from '@src/components/devices-icon';
import { i18nKeys } from '@src/configs/i18n';
import { HomeRouteStackParamList } from '@src/configs/routes/home.route';
import { useDeviceName } from '@src/hooks/use-device-name.hook';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { Text } from 'react-native-paper';

type TAddDeviceSuccessModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  data: any;
};

const AddDeviceSuccessModal = ({
  isVisible,
  setIsVisible,
  data,
}: TAddDeviceSuccessModalProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<HomeRouteStackParamList>>();

  const { DeviceNames } = useDeviceName();

  return (
    <Modal
      isVisible={isVisible}
      backdropTransitionOutTiming={100}
      animationOutTiming={100}
    >
      <View className="h-3/5 items-center rounded-xl bg-white">
        <Text className="my-4 text-center text-xl font-medium">
          {DeviceNames?.[data?.name as keyof typeof DeviceNames]}
        </Text>

        {DeviceImages?.get(data?.type)?.(270, 270)}

        <TouchableOpacity
          className="mb-3 mt-auto w-4/5 self-center"
          onPress={() => {
            setIsVisible(false);
            navigation.navigate('MainHome');
          }}
        >
          <LinearGradient
            colors={['#9CC76F', '#c5da8b']}
            className="mx-auto mt-4 flex w-full flex-row items-center justify-center rounded-2xl p-[12px]"
          >
            <Text className="mx-2 text-[16px] text-white">
              {t(i18nKeys.common.backToHome)}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddDeviceSuccessModal;
