import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {ModalComponentProp} from 'react-native-modalfy';
import {ModalStackParamsList} from '.';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

export interface IDialogModalProps {
  title: string;
  message: string;
  type: 'success' | 'error';
  onConfirm: () => void;
}

const SuccessHeader = (): JSX.Element => {
  return (
    <View
      style={{
        backgroundColor: '#27ae60',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        name="check-bold"
        size={40}
        color={'#fff'}
        style={{
          backgroundColor: '#2ecc71',
          padding: 25,
          borderRadius: 50,
          marginVertical: 25,
        }}
      />
    </View>
  );
};

const ErrorModal = (): JSX.Element => {
  return (
    <View
      style={{
        backgroundColor: '#c23616',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon
        name="close-circle-outline"
        size={40}
        color={'#fff'}
        style={{
          backgroundColor: '#e84118',
          padding: 25,
          borderRadius: 50,
          marginVertical: 25,
        }}
      />
    </View>
  );
};

const DialogModal = ({
  modal,
}: ModalComponentProp<
  ModalStackParamsList,
  IDialogModalProps,
  'DialogModal'
>): JSX.Element => {
  const {t} = useTranslation();
  return (
    <Modal
      isVisible={true}
      onBackdropPress={modal.closeModal}
      backdropOpacity={0.1}
      style={{}}>
      <View style={{backgroundColor: 'white', borderRadius: 20}}>
        {modal.params?.type === 'success' ? <SuccessHeader /> : <ErrorModal />}
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            {modal.params?.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'normal',
              paddingTop: 10,
              textAlign: 'center',
              paddingHorizontal: 40,
            }}>
            {modal.params?.message}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#2980b9',
              padding: 15,
              borderRadius: 15,
              // marginHorizontal: 20,
              marginBottom: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              modal.closeModal();
              modal.params?.onConfirm();
            }}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
              {t(i18nKeys.common.ok)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DialogModal;
