import {
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import IconGeneral from '@/components/common/icon-general';
import {useTranslation} from 'react-i18next';
import {RootStackParamList} from '@/navigations/auth-navigator';
import {ModalStackParamsList} from '@/components/modals';
import {useModal} from 'react-native-modalfy';
import * as yup from 'yup';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation} from '@tanstack/react-query';
import authServices from '@/features/auth/auth.services';
import Toast from 'react-native-toast-message';
import {AxiosError} from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifiCodeScreen'>;

const VerifiCodeScreen = ({navigation, route}: Props) => {
  const {t} = useTranslation();
  const {userId, email} = route.params;
  const {openModal, closeModal} = useModal<ModalStackParamsList>();
  const [hiddenPassword, setHiddenPassword] = useState(false);
  const resetPassSchema = yup
    .object({
      resetCode: yup
        .string()
        .required(t(i18nKeys.auth.forgetPass.verifiCode.required) as any),
      password: yup
        .string()
        .required(t(i18nKeys.auth.forgetPass.verifiCode.required) as any),
    })
    .required();
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm<{
    resetCode: string;
    password: string;
  }>({
    resolver: yupResolver(resetPassSchema),
  });
  const onSubmit = async (data: any) => {
    Keyboard.dismiss();
    openModal('LoadingModal');
    resetCodeCall({
      userId: userId,
      resetCode: data.resetCode,
      password: data.password,
    });
    // getVerifiCode(data.email);
  };

  const onError = (error: any) => {
    console.log(error);
  };
  const {mutate: resentCode} = useMutation(
    async (emailAddress: string) =>
      await authServices.sendPasswordResetCode({emailAddress: emailAddress}),
    {
      onSuccess: data => {
        closeModal('LoadingModal');
        navigation.navigate('VerifiCodeScreen', {
          userId: data.userId,
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
  const {mutate: resetCodeCall} = useMutation(
    async (data: {userId: number; resetCode: string; password: string}) =>
      await authServices.resetCode(data),
    {
      onSuccess: data => {
        closeModal('LoadingModal');
        navigation.navigate('Login');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: t(i18nKeys.auth.forgetPass.verifiCode.success) as string,
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
          text1: t(i18nKeys.auth.forgetPass.verifiCode.fail) as string,
          text2: t(i18nKeys.auth.forgetPass.verifiCode.detailFail) as string,
          visibilityTime: 2000,
        });
      },
      onSettled: () => {
        // closeModal('LoadingModal');
      },
    },
  );
  return (
    <View style={[styles.container]}>
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
        <Text style={styles.text_header}>Verification Code</Text>
      </View>
      <View style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{fontSize: 15, fontWeight: '500', color: '#BDBDBD'}}>
            {t(i18nKeys.auth.forgetPass.sendCode.hint)}
          </Text>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              {t(i18nKeys.auth.forgetPass.sendCode.hintResent)}
            </Text>
            <Pressable
              onPress={() => {
                if (email) {
                  resentCode(email);
                }
              }}>
              <Text style={{color: '#2D9CDB', fontSize: 15, fontWeight: '500'}}>
                {` ${t(i18nKeys.auth.forgetPass.sendCode.resent)}`}
              </Text>
            </Pressable>
          </View>
          {Object.keys(resetPassSchema?.fields)?.map((field, index) => {
            return (
              <View key={index} style={{}}>
                <View style={styles.action}>
                  <Controller
                    control={control}
                    name={field as any}
                    rules={{
                      required: {
                        value: true,
                        message: t(
                          i18nKeys.auth.forgetPass.verifiCode.required,
                        ),
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        value={value}
                        placeholderTextColor={'#BDBDBD'}
                        placeholder={
                          field === 'password'
                            ? (t(
                                i18nKeys.auth.forgetPass.verifiCode
                                  .passwordPlaceholder,
                              ) as string)
                            : (t(
                                i18nKeys.auth.forgetPass.verifiCode
                                  .verifiPlaceholder,
                              ) as string)
                        }
                        style={[styles.textInput]}
                        secureTextEntry={field === 'password' && hiddenPassword}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />
                  {field === 'password' ? (
                    <Pressable
                      style={{marginRight: 20}}
                      onPress={() => setHiddenPassword(!hiddenPassword)}>
                      {hiddenPassword ? (
                        <IconGeneral
                          type="Feather"
                          name="eye-off"
                          color="grey"
                          size={20}
                        />
                      ) : (
                        <IconGeneral
                          type="Feather"
                          name="eye"
                          color="grey"
                          size={20}
                        />
                      )}
                    </Pressable>
                  ) : null}
                </View>
                <Text style={{color: 'red', fontSize: 10}}>
                  {field === 'password'
                    ? errors.password?.message
                    : errors.resetCode?.message}
                </Text>
              </View>
            );
          })}

          <View style={styles.button}>
            <TouchableOpacity
              // disabled={true}
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
                  {'Xác minh'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default VerifiCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  footer: {
    flex: Platform.OS === 'ios' ? 5 : 7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 10,
  },
  text_header: {
    color: '#333333',
    fontWeight: '700',
    fontSize: 24,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 16,
  },
  action: {
    flexDirection: 'row',
    // marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    // paddingBottom: 5,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -5,
    color: '#333333',
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 12,
    paddingTop: 19,
    paddingLeft: 0,
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: '#828282',
    fontSize: 15,
    fontWeight: '500',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOk: {
    backgroundColor: '#90be6d',
  },
  buttonCancel: {
    backgroundColor: '#c9184a',
  },
  txtBtn: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  containerIconModal: {
    alignItems: 'center',
  },
  titleModalSuccess: {
    textAlign: 'center',
    fontSize: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
