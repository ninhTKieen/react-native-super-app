import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SettingStackParamList} from '@/routes/profile.route';
import {Button} from 'react-native-paper';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import TopBar from '@/components/top-bar';
import {shadowConstants} from '@/configs/shadowStyles';
import {color} from '@/configs/globalStyles';
import {FormProvider, useForm} from 'react-hook-form';
import {IChangePasswordForm} from '@/features/profile/profile.model';
import ChangePasswordInput from './components/change-password-input';
import {useUpdatePasswordValidator} from '@/validators/profile/profile.validator';
import Toast from 'react-native-toast-message';
import {useMutation} from '@tanstack/react-query';
import profileService from '@/features/profile/profile.service';
import {ModalStackParamsList} from '@/components/modals';
import {useModal} from 'react-native-modalfy';

type Props = NativeStackScreenProps<
  SettingStackParamList,
  'ChangePasswordScreen'
>;

const ChangePasswordScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const methods = useForm<IChangePasswordForm>({
    resolver: useUpdatePasswordValidator(),
  });
  const {openModal, closeModal} = useModal<ModalStackParamsList>();

  const onSubmit = (data: IChangePasswordForm) => {
    changePassword(data);
  };
  const onError = (errors: any) => {
    console.log(errors);
  };

  const {mutate: changePassword} = useMutation({
    mutationFn: (data: IChangePasswordForm) =>
      profileService.changePassword(data),
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.profile.changePassword.success) as string,
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.profile.changePassword.error) as string,
      });
    },
    onMutate: () => {
      openModal('LoadingModal');
    },
    onSettled: () => {
      closeModal('LoadingModal');
      navigation.goBack();
    },
  });

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <TopBar
          title={t(i18nKeys.profile.changePassword.title)}
          styleContainer={{...shadowConstants[1]}}
        />
        <View style={{paddingHorizontal: 10, paddingTop: 30}}>
          <ChangePasswordInput
            name="currentPassword"
            label={t(i18nKeys.profile.changePassword.currentPassword) as string}
          />
          <ChangePasswordInput
            name="newPassword"
            label={t(i18nKeys.profile.changePassword.newPassword) as string}
          />
          <ChangePasswordInput
            name="confirmPassword"
            label={t(i18nKeys.profile.changePassword.confirmPassword) as string}
          />
          <Button
            icon={'lock'}
            onPress={methods.handleSubmit(onSubmit, onError)}
            mode="contained"
            style={{
              backgroundColor: color.blue1,
              width: '100%',
            }}>
            {t(i18nKeys.profile.changePassword.title)}
          </Button>
        </View>
      </View>
    </FormProvider>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#fff',
  },
  wrapper: {
    marginBottom: 20,
  },
});
