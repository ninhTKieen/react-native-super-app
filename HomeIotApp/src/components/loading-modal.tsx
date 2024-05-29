import { colors } from '@src/configs/constant/global-styles';
import React from 'react';
import Modal from 'react-native-modal';
import { ActivityIndicator } from 'react-native-paper';

const LoadingModal = ({ isVisible }: { isVisible: boolean }): JSX.Element => {
  return (
    <Modal
      style={{
        margin: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isVisible}
    >
      <ActivityIndicator
        animating={true}
        color={colors.primary}
        size={50}
        style={{ backgroundColor: 'white', borderRadius: 10, padding: 25 }}
      />
    </Modal>
  );
};

export default LoadingModal;
