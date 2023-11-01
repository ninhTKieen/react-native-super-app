import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import {ModalComponentProp} from 'react-native-modalfy';
import {ModalStackParamsList} from '.';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {color} from '@/configs/globalStyles';

export interface AddVariationModalProps {
  variation: Array<{
    value: string;
    isSelect: boolean;
  }>;
  setVariation: any;
  isEdit?: boolean;
  variationValue?: string;
  variationEditIndex?: number;
}

const AddVariationModal = (
  props: ModalComponentProp<
    ModalStackParamsList,
    AddVariationModalProps,
    'AddVariationModal'
  >,
): JSX.Element => {
  const modal = props.modal;
  const [textInput, setTextInput] = useState(
    modal.params?.variationValue || '',
  );
  const {t} = useTranslation();

  const addVariation = () => {
    const temp = [
      ...(modal.params?.variation as Array<{value: string; isSelect: boolean}>),
    ];
    if (textInput !== '') {
      temp.push({
        value: textInput,
        isSelect: true,
      });
    }
    modal.params?.setVariation(temp);
    modal.closeModal();
  };

  const editVariation = () => {
    const temp = [
      ...(modal.params?.variation as Array<{value: string; isSelect: boolean}>),
    ];
    temp[modal.params?.variationEditIndex as number].value = textInput;
    modal.params?.setVariation(temp);
    modal.closeModal();
  };

  return (
    <Modal
      isVisible={true}
      style={styles.modal}
      onBackButtonPress={modal.closeModal}
      onBackdropPress={modal.closeModal}
      backdropTransitionOutTiming={0}
      backdropTransitionInTiming={400}
      animationOutTiming={200}
      avoidKeyboard={true}
      animationInTiming={500}>
      <View style={styles.modalContainer}>
        <View style={styles.boxWrapperTop}>
          <Text style={{color: color.grey6}}>
            {modal.params?.isEdit
              ? t(i18nKeys.item.create.addVariation.editTitle)
              : t(i18nKeys.item.create.addVariation.title)}
          </Text>

          <TouchableWithoutFeedback onPress={() => modal.closeModal()}>
            <AntIcon name="close" size={20} color="#000" />
          </TouchableWithoutFeedback>
        </View>

        <View style={styles.boxWrapperTop}>
          <TextInput
            value={textInput}
            onChangeText={text => setTextInput(text)}
            style={{padding: 0, width: '90%'}}
            placeholder={
              t(i18nKeys.item.create.addVariation.placeholder) as string
            }
            onSubmitEditing={() => {
              modal.params?.isEdit ? editVariation() : addVariation();
            }}
          />
          <TouchableWithoutFeedback onPress={() => setTextInput('')}>
            <AntIcon name="closecircle" size={20} color={color.grey6} />
          </TouchableWithoutFeedback>
        </View>

        {/* Button save change */}
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '80%', marginBottom: 10}}>
            <Button
              mode="contained"
              disabled={textInput === ''}
              onPress={() => {
                modal.params?.isEdit ? editVariation() : addVariation();
              }}
              buttonColor={color.primary}
              style={{marginVertical: 10, borderRadius: 5}}>
              {modal.params?.isEdit
                ? t(i18nKeys.item.create.addVariation.edit)
                : t(i18nKeys.item.create.addVariation.create)}
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    bottom: 0,
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    maxHeight: '70%',
  },

  boxWrapperTop: {
    flexDirection: 'row',
    padding: 10,
    width: '100%',
    justifyContent: 'space-between',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
});

export default AddVariationModal;
