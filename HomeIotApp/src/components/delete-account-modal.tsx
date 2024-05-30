import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import authService from '@src/features/auth/auth.service';
import { useAuthStore } from '@src/features/auth/auth.store';
import { useHomeStore } from '@src/features/home/home.store';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';

type TDeleteAccountModalProps = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
};

const DeleteAccountModal = (props: TDeleteAccountModalProps) => {
  const { t } = useTranslation();

  const { logout } = useAuthStore();
  const { clearCurrentHome } = useHomeStore();

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: (_data) => {
      logout();
      clearCurrentHome();
    },
    onError: () => {
      logout();
      clearCurrentHome();
    },
  });

  return (
    <Modal
      animationIn={'fadeInDown'}
      animationOut={'fadeOutUp'}
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
      isVisible={props.isVisible}
      onBackdropPress={() => props.setIsVisible(false)}
    >
      <View
        style={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          margin: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {t(i18nKeys.settings.deleteAccount)}
        </Text>
        <Text style={{ marginTop: 10 }}>
          {t(i18nKeys.settings.deletePolicy1)}
        </Text>
        <Text style={{ marginTop: 10 }}>
          {t(i18nKeys.settings.deletePolicy2)}
        </Text>
        <Text style={{ marginTop: 10 }}>
          {t(i18nKeys.settings.deletePolicy3)}
        </Text>

        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: colors.red,
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
            }}
            onPress={() => {
              props.setIsVisible(false);
            }}
          >
            <Text style={{ color: colors.white }}>
              {t(i18nKeys.common.cancel)}
            </Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 5,
              alignItems: 'center',
              marginLeft: 10,
            }}
            onPress={() => {
              props.setIsVisible(false);
              logoutMutation.mutate();
            }}
          >
            <Text style={{ color: colors.white }}>
              {t(i18nKeys.common.confirm)}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;
