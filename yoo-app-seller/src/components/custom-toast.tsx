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
      style={{borderLeftColor: '#5cb85c'}}
      contentContainerStyle={{paddingHorizontal: 15}}
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
      style={{borderLeftColor: '#d9534f'}}
      contentContainerStyle={{paddingHorizontal: 15}}
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
