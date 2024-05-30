import { yupResolver } from '@hookform/resolvers/yup';
import IconGeneral from '@src/components/icon-general';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { EHomeRole } from '@src/features/home/home.model';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import * as yup from 'yup';

type CreateMemberModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (nickname: string, account: string, role: EHomeRole) => void;
};

const CreateMemberModal = ({
  isVisible,
  onClose,
  onConfirm,
}: CreateMemberModalProps) => {
  const { t } = useTranslation();

  const schema = useMemo(
    () =>
      yup.object().shape({
        account: yup.string().required(t(i18nKeys.validation.required)),
        nickname: yup.string().required(t(i18nKeys.validation.required)),
        role: yup.string().required(t(i18nKeys.validation.required)),
        tenancyName: yup.string(),
      }),
    [t],
  );

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      role: EHomeRole.Member,
    },
  });

  const handleOnClose = () => {
    onClose();
    form.reset();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={handleOnClose}
      onBackButtonPress={handleOnClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}
    >
      <View className="rounded-xl bg-white p-3">
        <Text className="text-base font-medium text-[#89B05F]">
          {t(i18nKeys.home.settings.members.add)}
        </Text>

        <TextInput
          className="mt-3 h-10 rounded-full bg-[#EEEEEE] p-2 text-center"
          placeholder={t(i18nKeys.home.settings.members.account)}
          value={form.watch('account')}
          onChangeText={(text) => form.setValue('account', text)}
          placeholderTextColor={colors.grey6}
        />

        <TextInput
          className="mb-3 mt-5 h-10 rounded-full bg-[#EEEEEE] p-2 text-center"
          placeholder={t(i18nKeys.home.settings.members.nickname)}
          value={form.watch('nickname')}
          onChangeText={(text) => form.setValue('nickname', text)}
          placeholderTextColor={colors.grey6}
        />

        <Text className="text-base font-medium text-[#89B05F]">
          {t(i18nKeys.home.role.title)}
        </Text>

        <View>
          <Pressable
            className="mt-2 flex-row items-center justify-between"
            onPress={() => form.setValue('role', EHomeRole.Manager)}
          >
            <Text className="text-sm font-medium text-[#515151]">
              {t(i18nKeys.home.role.manager)}
            </Text>
            <IconGeneral
              type="Octicons"
              name={
                form.watch('role') === EHomeRole.Manager
                  ? 'check-circle-fill'
                  : 'circle'
              }
              color={
                form.watch('role') === EHomeRole.Manager ? '#89B05F' : '#D1D1D1'
              }
              size={20}
            />
          </Pressable>
          <Pressable
            className="mt-3 flex-row items-center justify-between"
            onPress={() => form.setValue('role', EHomeRole.Member)}
          >
            <Text className="text-sm font-medium text-[#515151]">
              {t(i18nKeys.home.role.member)}
            </Text>
            <IconGeneral
              type="Octicons"
              name={
                form.watch('role') === EHomeRole.Member
                  ? 'check-circle-fill'
                  : 'circle'
              }
              color={
                form.watch('role') === EHomeRole.Member ? '#89B05F' : '#D1D1D1'
              }
              size={20}
            />
          </Pressable>
        </View>

        <View className="mt-5 flex-row justify-end bg-transparent">
          <TouchableOpacity
            onPress={handleOnClose}
            className="h-8 items-center justify-center overflow-hidden"
          >
            <Text className="mr-6 text-[16px] text-red-600">
              {t(i18nKeys.common.cancel)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onConfirm(
                form.watch('nickname'),
                form.watch('account'),
                form.watch('role') as EHomeRole,
              );
              handleOnClose();
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

export default CreateMemberModal;
