import {
  Dimensions,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import * as yup from 'yup';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {IForgetPassPayload} from '@/features/auth/auth.model';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/navigations/auth-navigator';
import {useMutation} from '@tanstack/react-query';
import authServices from '@/features/auth/auth.services';
import Toast from 'react-native-toast-message';
import {useModal} from 'react-native-modalfy';
import {ModalStackParamsList} from '@/components/modals';
import {AxiosError} from 'axios';
import IconGeneral from '@/components/common/icon-general';

const {width, height} = Dimensions.get('screen');
const ForgetPasswordScreen = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {openModal, closeModal} = useModal<ModalStackParamsList>();
  const forgetSchema = yup
    .object({
      email: yup
        .string()
        .email(t(i18nKeys.auth.forgetPass.sendCode.emailFormat) as string)
        .required(t(i18nKeys.auth.emailRequired) as any),
    })
    .required();
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<IForgetPassPayload>({
    resolver: yupResolver(forgetSchema),
  });
  const onSubmit = async (data: IForgetPassPayload) => {
    Keyboard.dismiss();
    openModal('LoadingModal');
    getVerifiCode(data.email);
  };

  const onError = (error: any) => {
    console.log(error);
  };
  const {mutate: getVerifiCode} = useMutation(
    async (email: string) =>
      await authServices.sendPasswordResetCode({emailAddress: email}),
    {
      onSuccess: data => {
        closeModal('LoadingModal');
        navigation.navigate('VerifiCodeScreen', {
          userId: data.userId,
          email: getValues('email'),
        });
        Toast.show({
          type: 'success',
          position: 'top',
          text1: t(i18nKeys.auth.forgetPass.sendCode.success) as string,
          text2: t(i18nKeys.intro) as string,
          visibilityTime: 2000,
        });
      },
      onError: error => {
        console.log((error as AxiosError).response?.data);
        closeModal('LoadingModal');
        Toast.show({
          type: 'error',
          position: 'top',
          text1: t(i18nKeys.auth.forgetPass.sendCode.fail) as string,
          text2: t(i18nKeys.auth.forgetPass.sendCode.detailFail) as string,
          visibilityTime: 2000,
        });
      },
      onSettled: () => {
        // closeModal('LoadingModal');
      },
    },
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <IconGeneral
            type="Ionicons"
            name="chevron-back-outline"
            color={'#333'}
            size={24}
          />
        </Pressable>
        <Text style={styles.text_header}>{'Quên mật khẩu'}</Text>
      </View>

      <View style={{paddingHorizontal: width * 0.05}}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            color: '#BDBDBD',
            paddingBottom: 20,
          }}>
          {t(i18nKeys.auth.forgetPass.verifiCode.hint)}
        </Text>

        <View>
          <View style={styles.action}>
            <View style={{flex: 1}}>
              <Controller
                control={control}
                name={'email'}
                rules={{
                  required: {
                    value: true,
                    message: t(i18nKeys.auth.signIn.requiredField),
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    value={value}
                    placeholderTextColor={'#BDBDBD'}
                    placeholder={
                      t(
                        i18nKeys.auth.forgetPass.sendCode.emailPlaceHolder,
                      ) as string
                    }
                    autoCapitalize="none"
                    onChangeText={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </View>
          </View>
          <Text style={{color: 'red', fontSize: 10}}>
            {errors?.email?.message}
          </Text>
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={handleSubmit(onSubmit, onError)}>
            <View style={[styles.signIn, {backgroundColor: '#339FD9'}]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                {'continue'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingTop: height * 0.02,
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text_header: {
    color: '#333333',
    fontWeight: '700',
    fontSize: 24,
  },
  action: {
    flexDirection: 'row',
    marginTop: height * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    // paddingBottom: 5,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    marginTop: 30,
    marginHorizontal: 5,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 15,
    fontWeight: '500',
  },
});
