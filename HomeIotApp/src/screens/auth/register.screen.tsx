import { yupResolver } from '@hookform/resolvers/yup';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AppLogo from '@src/components/app-logo';
import GradientButton from '@src/components/gradient-button';
// import IconGeneral from '@src/components/icon-general';
import globalStyles, { colors } from '@src/configs/constant/global-styles';
import { EResponseCode } from '@src/configs/enums/response-code.enum';
import { i18nKeys } from '@src/configs/i18n';
import { AuthRouteStackParamList } from '@src/configs/routes/auth.route';
import { useAppStore } from '@src/features/app/app.store';
import { IRegisterPayload } from '@src/features/auth/auth.model';
import authService from '@src/features/auth/auth.service';
import { useAuthStore } from '@src/features/auth/auth.store';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import RegisterInput from './components/register-input';

const RegisterScreen = (): JSX.Element => {
  const { login, logout } = useAuthStore();
  const navigation = useNavigation<NavigationProp<AuthRouteStackParamList>>();
  const { t } = useTranslation();
  const { setLoading } = useAppStore();

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

  const registerSchema = useMemo(
    () =>
      yup.object().shape({
        tenancyName: yup.string().nullable(),
        username: yup.string().required(t(i18nKeys.validation.required)),
        name: yup.string().required(t(i18nKeys.validation.required)),
        surname: yup.string().required(t(i18nKeys.validation.required)),
        emailAddress: yup
          .string()
          .email(t(i18nKeys.validation.invalidEmail))
          .required(t(i18nKeys.validation.required)),
        password: yup
          .string()
          .min(6, t(i18nKeys.validation.minPassword))
          .required(t(i18nKeys.validation.required)),
        fullName: yup.string(),
        isCitizen: yup.boolean(),
        phoneNumber: yup
          .string()
          .matches(
            /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/,
            t(i18nKeys.validation.invalidPhoneNumber),
          ),
        address: yup.string(),
        gender: yup.string(),
        dateOfBirth: yup.date(),
      }),
    [t],
  );

  const {
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterPayload>({
    resolver: yupResolver(registerSchema),
    mode: 'onChange',
  });

  const registerMutation = useMutation({
    mutationFn: (data: IRegisterPayload) => {
      setLoading(true);
      return authService.register(data);
    },
    onSuccess: (_data) => {
      setLoading(false);
      login(_data);
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

  const onSubmit = (data: IRegisterPayload) => {
    registerMutation.mutate(data);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        backgroundColor: colors.white,
        minHeight: '100%',
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="items-center justify-start">
        <Text
          className="mt-12 w-4/5 text-center font-bold text-[#89B05F]"
          style={[globalStyles.title3Bold]}
        >
          Yootek Holdings JSC.,
        </Text>
        <AppLogo />
      </View>

      <View className="bg-white p-5">
        <RegisterInput
          label={'Tenant'}
          value={watch('tenancyName') as string}
          placeholder={'Tenant'}
          onChangeText={(text) => setValue('tenancyName', text)}
        />

        <RegisterInput
          label={t(i18nKeys.auth.username)}
          value={watch('username') as string}
          placeholder={t(i18nKeys.auth.username)}
          onChangeText={(text) => setValue('username', text)}
          error={errors.username}
        />

        <RegisterInput
          label={t(i18nKeys.auth.email)}
          value={watch('emailAddress') as string}
          placeholder={t(i18nKeys.auth.email)}
          onChangeText={(text) => setValue('emailAddress', text)}
          error={errors.emailAddress}
        />

        <RegisterInput
          label={t(i18nKeys.auth.name)}
          value={watch('name') as string}
          placeholder={t(i18nKeys.auth.name)}
          onChangeText={(text) => setValue('name', text)}
          error={errors.name}
        />

        <RegisterInput
          label={t(i18nKeys.auth.surname)}
          value={watch('surname') as string}
          placeholder={t(i18nKeys.auth.surname)}
          onChangeText={(text) => setValue('surname', text)}
          error={errors.surname}
        />

        <RegisterInput
          label={t(i18nKeys.auth.password)}
          value={watch('password') as string}
          placeholder={t(i18nKeys.auth.password)}
          onChangeText={(text) => setValue('password', text)}
          secureTextEntry={true}
          error={errors.password}
        />

        {/* <RegisterInput
          label={t(i18nKeys.auth.phoneNumber)}
          value={watch('phoneNumber') as string}
          placeholder={t(i18nKeys.auth.phoneNumber)}
          onChangeText={(text) => setValue('phoneNumber', text)}
          error={errors.phoneNumber}
        />

        <Text className="mt-3 font-medium text-[#89B05F]">
          {t(i18nKeys.auth.gender)}
        </Text>
        <View className="mt-2 flex-row items-center">
          <TouchableOpacity
            onPress={() => setValue('gender', 'male')}
            className="flex-row items-center"
          >
            <IconGeneral
              type="Octicons"
              name={watch('gender') === 'male' ? 'check-circle-fill' : 'circle'}
              color={watch('gender') === 'male' ? '#89B05F' : '#D1D1D1'}
              size={20}
            />
            <Text>{t(i18nKeys.common.male)}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setValue('gender', 'female')}
            className="mx-2 flex-row items-center"
          >
            <IconGeneral
              type="Octicons"
              name={
                watch('gender') === 'female' ? 'check-circle-fill' : 'circle'
              }
              color={watch('gender') === 'female' ? '#89B05F' : '#D1D1D1'}
              size={20}
            />
            <Text>{t(i18nKeys.common.female)}</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <View className="mt-auto justify-end p-3">
        <Text
          className="color-[#89B05F] mb-4 text-right font-medium"
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          {t(i18nKeys.auth.alreadyHaveAccount)}
        </Text>
        <GradientButton
          title={t(i18nKeys.auth.register)}
          additionalStyles={{
            width: '100%',
            backgroundColor: colors.primary,
            borderRadius: 10,
          }}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
