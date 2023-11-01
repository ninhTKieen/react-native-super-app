import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {useController, useFormContext} from 'react-hook-form';
const {width, height} = Dimensions.get('screen');
type Props = {
  label: string;
  error?: string;
  value?: string | null;
  id: string;
  type: 'objectInput' | 'input' | 'arrayObjectInput';
  idObject?: string;
  keyboardType?: string;
};
const InputItemAttribute = ({
  label,
  error,
  value,
  id,
  type,
  idObject,
  keyboardType,
}: Props) => {
  const {control, watch} = useFormContext();
  const {field} = useController({
    name: 'properties',
    control,
  });

  return (
    <View style={{paddingHorizontal: 10}}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder="Nhập thông tin"
        value={value ?? ''}
        keyboardType={keyboardType === 'number' ? 'numeric' : undefined}
        onChangeText={text => {
          switch (type) {
            case 'input':
              let newValue = {...watch('properties')};
              newValue[id] = text;
              field.onChange(newValue);
              break;
            case 'objectInput':
              if (idObject) {
                let newValueObject: any = watch('properties')
                  ? {...watch('properties')}
                  : {};
                let newObject: any = newValueObject[idObject]
                  ? newValueObject[idObject]
                  : {};
                newObject[id] = text;
                newValueObject[idObject] = newObject;
                field.onChange(newValueObject);
              }
              break;
            case 'arrayObjectInput':
              let newValueObject: any = watch('properties');
              if (idObject && newValueObject && newValueObject[idObject]) {
                let newArray: any = newValueObject[idObject];
                let newElement = newArray[newArray.length - 1];
                newElement[id] = text;
                newArray.pop();
                newArray.push(newElement);
                newValueObject[idObject] = newArray;
                field.onChange(newValueObject);
              }
          }
        }}
        style={{
          paddingHorizontal: 4,
          backgroundColor: 'white',
          paddingVertical: 15,
          borderRadius: 8,
        }}
      />
    </View>
  );
};

export default InputItemAttribute;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#707386',
    paddingVertical: height * 0.01,
  },
});
