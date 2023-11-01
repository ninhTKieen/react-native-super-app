import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from 'react-native-paper';
import Modal from 'react-native-modal';
import IconGeneral from '@/components/common/icon-general';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import {color} from '@/configs/globalStyles';

interface IProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  declineReason: string;
  setDeclineReason: React.Dispatch<React.SetStateAction<string>>;
  onPressOk: () => void;
}

const DeclineReasonModal = ({
  modalVisible,
  setModalVisible,
  declineReason,
  setDeclineReason,
  onPressOk,
}: IProps): JSX.Element => {
  const {t} = useTranslation();

  return (
    <Modal
      isVisible={modalVisible}
      style={styles.modal}
      onBackdropPress={() => {
        setModalVisible(false);
      }}
      onBackButtonPress={() => {
        setModalVisible(false);
      }}
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={400}
      animationOutTiming={200}
      avoidKeyboard={true}
      animationInTiming={500}>
      <View style={styles.modalContainer}>
        <Text style={{textAlign: 'center'}}>
          {t(i18nKeys.order.cancelReasonTitle)}
        </Text>

        <View style={styles.boxWrapperTop}>
          <TextInput
            multiline={true}
            value={declineReason}
            onChangeText={text => setDeclineReason(text)}
            style={{padding: 0, width: '90%'}}
            placeholder={t(i18nKeys.order.enterCancelReason) as string}
          />
          <TouchableWithoutFeedback onPress={() => setDeclineReason('')}>
            <IconGeneral
              name="closecircle"
              type="AntDesign"
              size={20}
              color={color.grey6}
            />
          </TouchableWithoutFeedback>
        </View>

        <View style={{marginVertical: 10}}>
          <Button
            onPress={() => {
              onPressOk();
            }}
            disabled={!declineReason}
            buttonColor={color.primary}
            mode="contained">
            {t(i18nKeys.common.ok)}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },

  modalContainer: {
    backgroundColor: color.white,
    borderRadius: 10,
    padding: 20,
    minHeight: 100,
  },

  boxWrapperTop: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'space-between',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default DeclineReasonModal;
