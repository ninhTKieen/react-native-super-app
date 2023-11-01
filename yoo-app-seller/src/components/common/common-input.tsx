import React from 'react';

import {View, StyleSheet} from 'react-native';
import {ItemAttributeType, ItemAttribute} from '@/features/item/item.model';
import {
  AttributeTextInput,
  DateInput,
  NumberInput,
  SelectInput,
  TextArea,
} from './common-input-base';

interface CommonInputProps {
  attribute: ItemAttribute;
  setValue: (value: Array<string>) => void;
}

const CommonInput = ({attribute, setValue}: CommonInputProps): JSX.Element => {
  const {inputType} = attribute;

  return (
    <View style={styles.container}>
      {inputType === ItemAttributeType.TextInput && (
        <AttributeTextInput
          name={attribute.name}
          setValue={setValue}
          attribute={attribute}
        />
      )}
      {inputType === ItemAttributeType.TextArea && (
        <TextArea
          name={attribute.name}
          setValue={setValue}
          attribute={attribute}
        />
      )}
      {inputType === ItemAttributeType.NumberInput && (
        <NumberInput
          name={attribute.name}
          setValue={setValue}
          attribute={attribute}
        />
      )}
      {inputType === ItemAttributeType.DateTime && (
        <DateInput
          name={attribute.name}
          setValue={setValue}
          attribute={attribute}
        />
      )}
      {inputType === ItemAttributeType.Select && (
        <SelectInput
          valueList={attribute.valueList as Array<string>}
          setValue={setValue}
          attribute={attribute}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CommonInput;
