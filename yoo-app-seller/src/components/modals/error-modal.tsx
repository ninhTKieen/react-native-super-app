import React from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import {ModalComponentProp} from 'react-native-modalfy';
import {ModalStackParamsList} from '.';

interface ErrorModalProps {
  message: string;
}

// error modal
const ErrorModal = (
  props: ModalComponentProp<
    ModalStackParamsList,
    ErrorModalProps,
    'ErrorModal'
  >,
) => {
  const modal = props.modal;
  console.log('msg', modal.params?.message);
  return (
    <Modal
      isVisible={true}
      onBackdropPress={modal.closeModal}
      onBackButtonPress={modal.closeModal}
      swipeDirection="down"
      style={{margin: 0, justifyContent: 'flex-end'}}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={300}>
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Error Modal</Text>
      </View>
    </Modal>
  );
};

export default ErrorModal;
