import * as React from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import Modal from 'react-native-modal';

const LoadingModal = (): JSX.Element => {
  return (
    //svg
    <Modal
      isVisible={true}
      style={{
        margin: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      backdropOpacity={0.1}>
      <ActivityIndicator
        animating={true}
        color={MD2Colors.deepPurple600}
        size={50}
        style={{backgroundColor: 'white', borderRadius: 10, padding: 25}}
      />
    </Modal>
  );
};

export default LoadingModal;
