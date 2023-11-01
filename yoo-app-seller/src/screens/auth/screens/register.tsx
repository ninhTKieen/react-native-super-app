import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navigations/auth-navigator';
import RegisterInput, {TenantInput} from '../components/register-input';
import globalStyles, {color} from '@/configs/globalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  ILoginPayload,
  IRegisterPayload,
  IToken,
} from '@/features/auth/auth.model';
import {useRegisterValidator} from '@/validators/auth/auth.validator';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useMutation} from '@tanstack/react-query';
import authServices from '@/features/auth/auth.services';
import {useModal} from 'react-native-modalfy';
import {ModalStackParamsList} from '@/components/modals';
import {useAppDispatch} from '@/hooks/redux.hook';
import {authActions} from '@/features/auth/auth.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN_KEY} from '@/configs/constant';
import AppLogo from '../components/logo-app';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen = ({navigation}: Props): JSX.Element => {
  const {t, i18n} = useTranslation();
  //useForm
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm<IRegisterPayload>({
    resolver: useRegisterValidator(),
    defaultValues: {
      confirmPolicy: false,
    },
  });

  const onSubmit = (data: any) => {
    console.log('data', data);
    openModal('LoadingModal');
    register(data);
  };

  const onError = (error: any) => {
    console.log('error', error);
  };
  const language = i18n.language;
  React.useEffect(() => {
    i18n.loadLanguages(language);
  }, [i18n, language]);
  const [confirmPolicy, setConfirmPolicy] = React.useState(false);

  // const {t} = useTranslation();
  const dispatch = useAppDispatch();

  const {openModal, closeModal} = useModal<ModalStackParamsList>();

  const {mutate: register} = useMutation({
    mutationFn: async (data: IRegisterPayload) => authServices.register(data),
    onSuccess: () => {
      openModal('DialogModal', {
        message: t(i18nKeys.auth.register.successMessage),
        title: t(i18nKeys.auth.register.successTittle),
        onConfirm: () => {
          closeModal('DialogModal');
          login({
            userNameOrEmailAddress: getValues('emailAddress'),
            password: getValues('password'),
          });
        },
        type: 'success',
      });
    },

    onError: (error: any) => {
      console.log('error', error.response?.data.error.message);
      openModal('DialogModal', {
        message: error.response?.data.error.message,
        title: t(i18nKeys.auth.register.errorTitle),
        onConfirm: () => {
          closeModal('DialogModal');
          navigation.goBack();
        },
        type: 'error',
      });
    },

    onSettled: () => {
      closeModal('LoadingModal');
    },
  });

  const {mutate: login} = useMutation({
    mutationFn: async (data: ILoginPayload) => authServices.login(data),
    onSuccess: data => {
      dispatch(authActions.loginSuccess(data));
      AsyncStorage.setItem(ACCESS_TOKEN_KEY, (data as IToken).accessToken);
    },

    onError: () => {
      dispatch(authActions.loginFailed());
      navigation.goBack();
    },
  });

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{
          flex: 1,
          marginBottom: 10,
        }}>
        <View>
          <View
            style={{
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingVertical: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={30} color={color.blueDark} />
            </TouchableOpacity>
            <View />
          </View>

          <View style={{alignItems: 'center', paddingBottom: 15}}>
            <AppLogo />
          </View>

          <View style={styles.section}>
            {/* <TenantInput
              label={
                t(i18nKeys.auth.register.urbanArea) +
                '/ ' +
                t(i18nKeys.auth.register.apartment)
              }
              // placeholder="Urban area/ apartment"
              placeholder={
                t(i18nKeys.auth.register.urbanArea) +
                '/ ' +
                t(i18nKeys.auth.register.apartment)
              }
              control={control}
              name="tenantId"
              error={errors.tenantId?.message}
            /> */}

            <RegisterInput
              label={t(i18nKeys.auth.register.surname) as never}
              placeholder={t(i18nKeys.auth.register.surname) as never}
              control={control}
              name="surname"
              error={errors.surname?.message}
              required
            />
            <RegisterInput
              label={t(i18nKeys.auth.register.name) as never}
              placeholder={t(i18nKeys.auth.register.name) as never}
              control={control}
              name="name"
              error={errors.name?.message}
              required
            />
            <RegisterInput
              label={t(i18nKeys.auth.register.username) as never}
              placeholder={t(i18nKeys.auth.register.surname) as never}
              control={control}
              name="userName"
              error={errors.userName?.message}
              required
            />
            <RegisterInput
              label={t(i18nKeys.auth.register.email) as never}
              placeholder="Email"
              control={control}
              name="emailAddress"
              error={errors.emailAddress?.message}
              required
            />
            <RegisterInput
              label={t(i18nKeys.auth.register.password) as never}
              placeholder="Password"
              control={control}
              name="password"
              secureTextEntry
              error={errors.password?.message}
              required
            />
            <RegisterInput
              label={t(i18nKeys.auth.register.confirmPassword) as never}
              placeholder="Confirm Password"
              control={control}
              name="confirmPassword"
              secureTextEntry
              error={errors.confirmPassword?.message}
              required
            />
            <Button
              style={{alignSelf: 'flex-end'}}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Text style={styles.text}>
                {t(i18nKeys.auth.register.haveAccount)}{' '}
                <Text style={{color: color.blue6}}>
                  {t(i18nKeys.auth.register.login)}
                </Text>
              </Text>
            </Button>
          </View>
        </View>

        <View style={styles.section2}>
          <View style={{paddingVertical: 10}}>
            <View style={styles.policy}>
              <TouchableOpacity
                onPress={() => {
                  const newstate = !confirmPolicy;
                  setConfirmPolicy(newstate);
                  setValue('confirmPolicy', newstate);
                }}>
                <Icon
                  name={!confirmPolicy ? 'crop-square' : 'checkbox-marked'}
                  size={20}
                  color={!confirmPolicy ? '#000' : color.blue2}
                />
              </TouchableOpacity>
              <Text style={[styles.text, {flexGrow: 1, paddingLeft: 5}]}>
                {t(i18nKeys.auth.register.agree)}{' '}
                <Text
                  style={{color: color.blue6}}
                  onPress={() => {
                    navigation.navigate('LicenseScreen', {});
                  }}>
                  {`${t(i18nKeys.auth.register.tof)} ${t(
                    i18nKeys.auth.register.and,
                  )} ${t(i18nKeys.auth.register.pl)}`}
                </Text>
              </Text>
            </View>
            {errors.confirmPolicy && (
              <Text
                style={[
                  globalStyles.errorMessage,
                  {color: color.red, paddingHorizontal: 15, paddingBottom: 10},
                ]}>
                {errors.confirmPolicy?.message}
              </Text>
            )}
            <Button
              style={{
                borderRadius: 5,
                backgroundColor: color.blue1,
                height: 50,
                justifyContent: 'center',
              }}
              onPress={handleSubmit(onSubmit, onError)}>
              <Text
                style={{fontSize: 18, color: color.white, fontWeight: '500'}}>
                {t(i18nKeys.auth.register.submit)}
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 25,
    paddingVertical: 18,
    color: color.blueDark,
  },
  section: {
    paddingHorizontal: 25,
  },
  text: {
    fontSize: 13,
    color: color.blue1,
  },
  section2: {
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  policy: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
  },
});

export default RegisterScreen;
