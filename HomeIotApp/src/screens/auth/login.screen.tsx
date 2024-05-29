import { yupResolver } from '@hookform/resolvers/yup';
import messaging from '@react-native-firebase/messaging';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AppLogo from '@src/components/app-logo';
import GradientButton from '@src/components/gradient-button';
import IconGeneral from '@src/components/icon-general';
import LanguageModal from '@src/components/languague-modal';
import globalStyles, { colors } from '@src/configs/constant/global-styles';
import { EResponseCode } from '@src/configs/enums/response-code.enum';
import { i18nKeys } from '@src/configs/i18n';
import { AuthRouteStackParamList } from '@src/configs/routes/auth.route';
import { useAppStore } from '@src/features/app/app.store';
import { ILoginPayload } from '@src/features/auth/auth.model';
import authService from '@src/features/auth/auth.service';
import { useAuthStore } from '@src/features/auth/auth.store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import LoginInput from './components/login-input';

const LoginScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<AuthRouteStackParamList>>();
  const { t, i18n } = useTranslation();
  const { login, logout } = useAuthStore();
  const { setLoading } = useAppStore();

  const { width } = useWindowDimensions();

  const [langModal, setLangModal] = useState(false);

  const authErrors = useMemo(
    () =>
      new Map([
        [EResponseCode.AuthEmailExist, t(i18nKeys.errors.auth.emailExist)],
        [
          EResponseCode.AuthUsernameExist,
          t(i18nKeys.errors.auth.usernameExist),
        ],
        [
          EResponseCode.AuthEmailNotExist,
          t(i18nKeys.errors.auth.emailNotExist),
        ],
        [
          EResponseCode.AuthUsernameNotExist,
          t(i18nKeys.errors.auth.usernameNotExist),
        ],
        [
          EResponseCode.AuthWrongPassword,
          t(i18nKeys.errors.auth.wrongPassword),
        ],
        [
          EResponseCode.AuthUsernameOrEmailNotExist,
          t(i18nKeys.errors.auth.usernameOrEmailNotExist),
        ],
        [EResponseCode.UnauthorizedError, t(i18nKeys.errors.auth.unauthorized)],
      ]),
    [t],
  );

  const loginSchema = useMemo(
    () =>
      yup.object().shape({
        tenancyName: yup.string(),
        userNameOrEmailAddress: yup
          .string()
          .required(t(i18nKeys.validation.required)),
        password: yup.string().required(t(i18nKeys.validation.required)),
        rememberClient: yup.boolean(),
      }),
    [t],
  );

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginPayload>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const sendFcmToken = useMutation({
    mutationFn: (token: string) => authService.sendTokenToServer(token),
    onSuccess: () => {
      console.log('Send FCM Token Success');
    },
    onError: () => {
      console.log('Send FCM Token Failed');
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: ILoginPayload) => {
      setLoading(true);

      return authService.login(data);
    },

    onSuccess: async (_data) => {
      setLoading(false);
      login(_data);
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();
      console.log('FCM Token:', fcmToken);
      sendFcmToken.mutate(fcmToken);
    },
    onError: (_error: AxiosError) => {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: `${t(i18nKeys.errors.common.errorOccurred)}`,
        text2: `${
          authErrors.get((_error.response?.data as any).code) ||
          t(i18nKeys.errors.common.tryAgain)
        }`,
      });
      logout();
    },
  });

  const onSubmit = (data: ILoginPayload) => {
    loginMutation.mutate(data);
  };

  return (
    <ScrollView
      style={{ paddingBottom: '5%' }}
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <View className="relative flex-1 items-center justify-start">
        <TouchableOpacity
          className="absolute right-10 top-5"
          onPress={() => setLangModal(true)}
        >
          <Text className="text-3xl">
            {i18n.language === 'vi' ? '🇻🇳' : '🇺🇸'}
          </Text>
        </TouchableOpacity>
        <Text
          className="mt-12 w-4/5 text-center font-bold text-[#89B05F]"
          style={[globalStyles.title3Bold]}
        >
          Yootek Holdings JSC.,
        </Text>
        <AppLogo />
      </View>

      <View
        className="mt-11 items-center justify-around"
        style={{ paddingHorizontal: '10%' }}
      >
        <View
          style={{ width: '100%', marginBottom: 'auto', alignItems: 'center' }}
        >
          {/* <LoginInput
            label={'Tenant'}
            error={errors.userNameOrEmailAddress?.message}
            onChangeText={(text) => setValue('tenancyName', text)}
            placeholder={'Tenant'}
            value={watch('tenancyName') as string}
          /> */}

          <LoginInput
            label={t(i18nKeys.auth.email)}
            error={errors.userNameOrEmailAddress?.message}
            onChangeText={(text) => setValue('userNameOrEmailAddress', text)}
            placeholder={t(i18nKeys.auth.emailPlaceholder)}
            value={watch('userNameOrEmailAddress')}
          />

          <LoginInput
            label={t(i18nKeys.auth.password)}
            error={errors.password?.message}
            onChangeText={(text) => setValue('password', text)}
            placeholder={t(i18nKeys.auth.passwordPlaceholder)}
            secureTextEntry
            value={watch('password')}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <View className="mt-2 flex-row items-center">
              <TouchableOpacity
                onPress={() => {
                  setValue('rememberClient', !watch('rememberClient'));
                }}
              >
                <IconGeneral
                  type="MaterialCommunityIcons"
                  name={
                    watch('rememberClient')
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  }
                  size={20}
                  color={'#89B05F'}
                />
              </TouchableOpacity>
              <Text style={{ fontSize: 14, color: colors.grey4 }}>
                {t(i18nKeys.auth.rememberMe)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-5 justify-between">
        <View className="items-center">
          <GradientButton
            title={t(i18nKeys.auth.login)}
            onPress={handleSubmit(onSubmit)}
            additionalStyles={{
              justifyContent: 'center',
              width: width * 0.8,
              borderRadius: 10,
            }}
          />
        </View>
        <View className="flex-row items-center justify-center">
          <View className="mt-12 flex-row">
            <Text
              style={[
                {
                  textAlign: 'center',
                  color: colors.grey4,
                  marginTop: 'auto',
                },
                globalStyles.contentRegular,
              ]}
            >
              {t(i18nKeys.auth.haveNoAccount)}{' '}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '',
              }}
              onPress={() => {
                navigation.navigate('Register');
              }}
            >
              <Text
                style={{
                  color: '#89B05F',
                  textAlign: 'center',
                  ...globalStyles.contentRegular,
                }}
              >
                {t(i18nKeys.auth.register)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <LanguageModal isVisible={langModal} setIsVisible={setLangModal} />
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
