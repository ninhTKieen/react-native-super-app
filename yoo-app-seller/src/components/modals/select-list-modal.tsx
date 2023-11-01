import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {ModalComponentProp} from 'react-native-modalfy';
import {ModalStackParamsList} from '.';

export interface SelectListModalProps {
  title: string;
  data?: any[];
  onSelect: (item: any) => void;
  value?: number;
  onSetName: (name: string) => void;
}
// error modal
const SelectListModal = (
  props: ModalComponentProp<
    ModalStackParamsList,
    SelectListModalProps,
    'SelectListModal'
  >,
) => {
  const modal = props.modal;
  const data = props.modal.params?.data;

  return (
    <Modal
      isVisible={true}
      onBackdropPress={modal.closeModal}
      onBackButtonPress={modal.closeModal}
      style={{margin: 0, justifyContent: 'flex-end'}}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          maxHeight: '80%',
        }}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>
          {modal.params?.title}
        </Text>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => {
                modal.params?.onSelect(item.value);
                modal.closeModal();
                modal.params?.onSetName(item.label);
              }}>
              <Text
                style={[
                  {
                    fontWeight:
                      modal.params?.value === item.value ? 'bold' : 'normal',
                  },
                ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </Modal>
  );
};

export default SelectListModal;
