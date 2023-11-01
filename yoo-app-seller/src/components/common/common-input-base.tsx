import React, {useState} from 'react';

import {TextInput, RadioButton, Text} from 'react-native-paper';
import {Platform, TouchableWithoutFeedback, View} from 'react-native';
import {color} from '@/configs/globalStyles';
import {ItemAttribute} from '@/features/item/item.model';
import {useController, useFormContext} from 'react-hook-form';
import RNDatePickerModal from '../modals/rn-date-picker-modal';

interface AttributeTextInputProps {
  name: string;
  setValue: (value: Array<string>) => void;
  attribute: ItemAttribute;
}
export const AttributeTextInput = ({
  name,
  setValue,
  attribute,
}: AttributeTextInputProps): JSX.Element => {
  const {control} = useFormContext();
  const {field} = useController({
    name: 'attributeList',
    control,
  });

  return (
    <View>
      <TextInput
        mode="outlined"
        label={name}
        style={{height: 50, marginHorizontal: 10, backgroundColor: '#fff'}}
        theme={{colors: {primary: color.blue2}}}
        onChangeText={text => {
          setValue([text]);
        }}
        value={
          field.value.find((item: any) => item.id === attribute.id).valueList[0]
        }
      />
    </View>
  );
};

interface SelectInputProps {
  valueList: Array<string>;
  setValue: (value: Array<string>) => void;
  attribute: ItemAttribute;
}
export const SelectInput = ({
  valueList,
  setValue,
  attribute,
}: SelectInputProps): JSX.Element => {
  const {control} = useFormContext();
  const {field} = useController({
    name: 'attributeList',
    control,
  });

  return (
    <View>
      <RadioButton.Group
        onValueChange={text => {
          setValue([text]);
        }}
        value={
          field.value.find((item: any) => item.id === attribute.id).valueList[0]
        }>
        {valueList.map((value, index) => (
          <View key={index}>
            <TouchableWithoutFeedback onPress={() => setValue([value])}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <RadioButton color="#2D9CDB" value={value} />
                <Text>{value}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        ))}
      </RadioButton.Group>
    </View>
  );
};

interface TextAreaProps {
  name: string;
  setValue: (value: Array<string>) => void;
  attribute: ItemAttribute;
}
export const TextArea = ({
  name,
  setValue,
  attribute,
}: TextAreaProps): JSX.Element => {
  const {control} = useFormContext();
  const {field} = useController({
    name: 'attributeList',
    control,
  });

  return (
    <View>
      <TextInput
        mode="outlined"
        label={name}
        style={{height: 100, marginHorizontal: 10, backgroundColor: '#fff'}}
        theme={{colors: {primary: color.blue2}}}
        onChangeText={text => {
          setValue([text]);
        }}
        value={
          field.value.find((item: any) => item.id === attribute.id).valueList[0]
        }
        multiline
        textAlignVertical="top"
        numberOfLines={1}
      />
    </View>
  );
};

interface NumberInputProps {
  name: string;
  setValue: (value: Array<string>) => void;
  attribute: ItemAttribute;
}

export const NumberInput = ({
  name,
  setValue,
  attribute,
}: NumberInputProps): JSX.Element => {
  const {control} = useFormContext();
  const {field} = useController({
    name: 'attributeList',
    control,
  });

  return (
    <View>
      <TextInput
        mode="outlined"
        label={name}
        style={{height: 50, marginHorizontal: 10, backgroundColor: '#fff'}}
        theme={{colors: {primary: color.blue2}}}
        onChangeText={text => {
          setValue([text]);
        }}
        value={
          field.value.find((item: any) => item.id === attribute.id).valueList[0]
        }
        keyboardType="numeric"
      />
    </View>
  );
};

interface DateInputProps {
  name: string;
  setValue: (value: Array<string>) => void;
  attribute: ItemAttribute;
}
export const DateInput = ({
  name,
  setValue,
  attribute,
}: DateInputProps): JSX.Element => {
  const {control} = useFormContext();
  const {field} = useController({
    name: 'attributeList',
    control,
  });
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const showDatePicker = () => {
    setModalStatus(true);
  };

  return (
    <View>
      <TextInput
        editable={false}
        onPressIn={Platform.OS === 'ios' ? showDatePicker : () => {}}
        label={name}
        style={{
          marginHorizontal: 10,
          backgroundColor: '#fff',
          justifyContent: 'center',
          fontSize: 15,
          fontWeight: '400',
          color: '#333',
        }}
        mode="outlined"
        textColor={'#333333'}
        outlineColor={'#333333'}
        activeOutlineColor={'#0077b6'}
        left={<TextInput.Icon icon="calendar" />}
        value={
          field.value.find((item: any) => item.id === attribute.id).valueList[0]
        }
      />

      <RNDatePickerModal
        setModalStatus={setModalStatus}
        modalStatus={modalStatus}
        onChange={(date: string) => setValue([date])}
        defaultValue={new Date()}
      />
    </View>
  );
};
