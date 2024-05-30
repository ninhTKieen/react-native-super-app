import { i18nKeys } from '@src/configs/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

type TConfirmDialogProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  warningTitle?: string;
  warningText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

const ConfirmDialog = (props: TConfirmDialogProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={() => props.setIsVisible(false)}
      onBackButtonPress={() => props.setIsVisible(false)}
    >
      <View className="rounded-xl bg-white p-2">
        <View>
          <Text className="text-center text-lg text-yellow-600">
            {props.warningTitle || t(i18nKeys.common.warning)}
          </Text>

          <Text className="mt-3 text-center text-sm text-[#515151]">
            {props.warningText || t(i18nKeys.common.confirmText)}
          </Text>
        </View>

        <View className="mt-4 flex-row items-center justify-end">
          <TouchableOpacity
            className="rounded-full py-3"
            onPress={() => {
              props.onConfirm();
              props.setIsVisible(false);
            }}
          >
            <LinearGradient
              className="h-8 items-center justify-center rounded-full px-2"
              colors={['#9CC76F', '#c5da8b']}
            >
              <Text className="mx-2 text-[16px] text-white">
                {t(i18nKeys.common.confirm)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              props.onCancel && props.onCancel();
              props.setIsVisible(false);
            }}
            className="rounded-full bg-transparent p-3"
          >
            <Text className="ml-2 font-medium text-red-600">
              {t(i18nKeys.common.cancel)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmDialog;
