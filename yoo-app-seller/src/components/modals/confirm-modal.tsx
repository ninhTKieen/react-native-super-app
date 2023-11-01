import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {color} from '@/configs/globalStyles';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

export interface ConfirmModalProps {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  onPressConfirm: () => void;
  onPressCancel: () => void;
  message: string;
  textStyle?: any;
  textComponent?: React.ReactNode;
}

const ConfirmModal = (modal: ConfirmModalProps) => {
  const {t} = useTranslation();
  return (
    <View>
      <Modal
        isVisible={modal.isVisible}
        onBackdropPress={() => modal.setVisible(false)}
        onBackButtonPress={() => modal.setVisible(false)}
        backdropOpacity={0.1}
        animationIn={'slideInUp'}
        animationOut={'fadeOut'}
        animationOutTiming={200}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.container}>
          {modal.textComponent ? (
            modal.textComponent
          ) : (
            <Text style={styles.message}>{modal.message}</Text>
          )}

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={modal.onPressCancel}
              style={[styles.button]}>
              <Text style={[styles.text, {color: color.blueDark1}]}>
                {t(i18nKeys.common.cancel)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                modal.onPressConfirm();
                modal.setVisible(false);
              }}
              style={[styles.button, {backgroundColor: color.blueDark1}]}>
              <Text style={[styles.text, {color: color.white}]}>
                {t(i18nKeys.common.ok)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    maxWidth: '80%',
    paddingVertical: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 20,
  },
  button: {
    borderColor: color.blueDark1,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  text: {
    fontWeight: '600',
    fontSize: 14,
  },
});
