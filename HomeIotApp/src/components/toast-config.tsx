import { colors } from '@src/configs/constant/global-styles';
import React from 'react';
import {
  BaseToast,
  ErrorToast,
  ToastConfig,
  ToastConfigParams,
  ToastProps,
} from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: (props: ToastConfigParams<ToastProps>): JSX.Element => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colors.green0 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 13,
      }}
    />
  ),

  error: (props: ToastConfigParams<ToastProps>): JSX.Element => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: colors.red1 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 13,
      }}
    />
  ),
};
