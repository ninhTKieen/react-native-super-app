import React from 'react';

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {Button} from 'react-native-paper';
import {useMutation} from '@tanstack/react-query';
import {useForm, Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useModal} from 'react-native-modalfy';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import authServices from '@/features/auth/auth.services';
import {useAppDispatch} from '@/hooks/redux.hook';
import {authActions} from '@/features/auth/auth.slice';
import {IAuthenticateResponse, ILoginPayload} from '@/features/auth/auth.model';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

import LoginInput from '@/screens/auth/components/login-input';
import globalStyles, {color} from '@/configs/globalStyles';
import AppLogo from '@/screens/auth/components/logo-app';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ModalStackParamsList} from '@/components/modals';
import {AxiosError} from 'axios';
import IconGeneral from '@/components/common/icon-general';
import {RootStackParamList} from '@/navigations/auth-navigator';
import {saveNewLoginHistory, saveTokens} from '@/utils/token.util';
import messaging from '@react-native-firebase/messaging';

const width = Dimensions.get('window').width;

const LoginScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {openModal, closeModal} = useModal<ModalStackParamsList>();
  const {t} = useTranslation();
  const [rememberMe, setRememberMe] = React.useState(false);
  const loginSchema = yup
    .object({
      userNameOrEmailAddress: yup
        .string()
        // .email(t(i18nKeys.auth.invalidEmail) as any)
        .required(t(i18nKeys.auth.emailRequired) as any),
      password: yup.string().required(t(i18nKeys.auth.passwordRequired) as any),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ILoginPayload>({
    resolver: yupResolver(loginSchema),
  });

  const {mutate: sendFcmToken} = useMutation(
    async (params: {token: string}) =>
      await authServices.pushNotificationRegisterToTenant(params),
    {
      onSuccess: res => {
        // console.log('[ss]', res);
      },
      onError: err => {
        console.log('[pushNotificationRegisterToTenant err]', err);
      },
    },
  );

  const loginMutation = useMutation(
    async (userData: ILoginPayload) => await authServices.login(userData),
    {
      onSuccess: async data => {
        const {accessToken, encryptedAccessToken, refreshToken} =
          data as IAuthenticateResponse;

        dispatch(authActions.loginSuccess(data));
        saveTokens({accessToken, encryptedAccessToken, refreshToken});
        saveNewLoginHistory(data);

        if (rememberMe) {
          dispatch(authActions.rememberAccount(data));
        }

        closeModal('LoadingModal');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: t(i18nKeys.auth.signIn.loginSuccess) as string,
          text2: t(i18nKeys.intro) as string,
          visibilityTime: 2000,
        });
        try {
          await messaging().registerDeviceForRemoteMessages();
          const fcmToken = await messaging().getToken();
          dispatch(authActions.setFcmToken(fcmToken));
          sendFcmToken({token: fcmToken});
        } catch (error) {
          console.log('[fcmToken err]', error);
        }
      },
      onError: error => {
        // console.log((error as AxiosError).response?.data);
        dispatch(authActions.loginFailed());
        closeModal('LoadingModal');
        Toast.show({
          type: 'error',
          position: 'top',
          text1: t(i18nKeys.auth.signIn.loginFailed) as string,
          text2: t(i18nKeys.auth.signIn.wrongEmailOrPassword) as string,
          visibilityTime: 2000,
        });
      },
      onSettled: () => {
        // closeModal('LoadingModal');
      },
    },
  );

  const onSubmit = async (data: ILoginPayload) => {
    Keyboard.dismiss();
    openModal('LoadingModal');
    loginMutation.mutate(data);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <ScrollView
      contentContainerStyle={{height: '100%'}}
      style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          flex: 1,
        }}>
        <Text
          style={[
            globalStyles.title3Bold,
            {
              color: color.blue1,
              textAlign: 'center',
              width: '80%',
              marginTop: 50,
            },
          ]}>
          {t(i18nKeys.intro)}
        </Text>
        {/* <Text style={[styles.intro2]}>{t(i18nKeys.intro2)}</Text> */}
        <AppLogo />
      </View>

      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: '10%',
          justifyContent: 'space-around',
          backgroundColor: 'white',
          marginTop: 45,
        }}>
        <View
          style={{width: '100%', marginBottom: 'auto', alignItems: 'center'}}>
          <Controller
            control={control}
            name="userNameOrEmailAddress"
            rules={{
              required: {
                value: true,
                message: t(i18nKeys.auth.signIn.requiredField),
              },
            }}
            render={({field: {onChange, value}}) => (
              <LoginInput
                error={errors.userNameOrEmailAddress?.message}
                onChangeText={onChange}
                placeholder={t(i18nKeys.auth.signIn.emailOrUsername)}
                secureTextEntry={false}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: {
                value: true,
                message: t(i18nKeys.auth.signIn.requiredField),
              },
            }}
            render={({field: {onChange, value}}) => (
              <LoginInput
                error={errors.password?.message}
                onChangeText={onChange}
                placeholder={t(i18nKeys.auth.signIn.password)}
                secureTextEntry={true}
                value={value}
              />
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                <IconGeneral
                  type="MaterialCommunityIcons"
                  name={
                    rememberMe ? 'checkbox-marked' : 'checkbox-blank-outline'
                  }
                  size={20}
                  color={color.blue1}
                />
              </TouchableOpacity>
              <Text style={{fontSize: 14, color: color.grey4}}>
                {t(i18nKeys.auth.signIn.rememberMe)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ForgetPasswordScreen');
              }}>
              <Text
                style={[
                  {textAlign: 'right', color: color.blue1},
                  globalStyles.bodyMedium,
                ]}>
                {t(i18nKeys.auth.signIn.forgotPass)}
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            onPress={handleSubmit(onSubmit, onError)}
            // onPress={() => navigation.navigate('SelectAccountScreen')}
            mode="contained"
            labelStyle={[globalStyles.title3Bold, {color: 'white'}]}
            style={{
              marginTop: 20,
              width: width * 0.8,
              height: 46,
              justifyContent: 'center',
            }}
            buttonColor={color.blue1}>
            {t(i18nKeys.auth.signIn.title)}
          </Button>
        </View>
      </View>

      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{}}>
            <Text
              style={[
                {
                  textAlign: 'center',
                  color: color.grey4,
                  marginTop: 'auto',
                },
                globalStyles.contentRegular,
              ]}>
              {t(i18nKeys.auth.signIn.noAccount)}{' '}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '',
            }}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text
              style={{
                color: color.blue1,
                textAlign: 'center',
                ...globalStyles.contentRegular,
              }}>
              {t(i18nKeys.auth.signIn.register)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: '5%',
  },
  intro2: {
    ...globalStyles.title3Bold,
    marginBottom: 30,
    color: color.orange1,
  },
});

export default LoginScreen;
