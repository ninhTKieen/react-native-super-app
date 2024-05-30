import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

type CreateHomeModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (homeName: string) => void;
};

const CreateRoomModal = ({
  isVisible,
  onClose,
  onConfirm,
}: CreateHomeModalProps) => {
  const { t } = useTranslation();
  const [homeName, setHomeName] = React.useState('');

  const onCloseModal = () => {
    onClose();
    setHomeName('');
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCloseModal}
      onBackButtonPress={onCloseModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
    >
      <View className="rounded-xl bg-white p-3">
        <Text className="text-base font-medium text-[#89B05F]">
          {t(i18nKeys.home.settings.rooms.create)}
        </Text>
        <TextInput
          className="mt-3 h-10 rounded-full bg-[#EEEEEE] p-2 text-center"
          placeholder={t(i18nKeys.home.settings.rooms.name)}
          value={homeName}
          onChangeText={setHomeName}
          placeholderTextColor={colors.grey6}
        />

        <View className="mt-5 flex-row justify-end bg-transparent">
          <TouchableOpacity
            onPress={onCloseModal}
            className="mx-2 h-8 items-center justify-center overflow-hidden rounded-full border border-white bg-[#EEEEEE] px-5"
          >
            <Text className="text-[16px] text-[#515151]">
              {t(i18nKeys.common.cancel)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onConfirm(homeName);
              onCloseModal();
            }}
            className="h-8"
          >
            <LinearGradient
              className="h-full items-center justify-center rounded-full px-4"
              colors={['#9CC76F', '#c5da8b']}
            >
              <Text className="mx-2 text-[16px] text-white">
                {t(i18nKeys.common.confirm)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreateRoomModal;
