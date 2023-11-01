import {
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import {color} from '@/configs/globalStyles';

type Props = {
  value?: string | undefined;
  label: string;
  required?: boolean;
  placeholder?: string;
  onChangeText: (text: string) => void;
  error: string;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  multiline?: boolean;
};
const {height} = Dimensions.get('screen');
const InputNormal = ({
  value,
  label,
  required,
  placeholder,
  onChangeText,
  error,
  keyboardType,
  maxLength,
  multiline,
}: Props) => {
  return (
    <View>
      <View style={styles.labelContainer}>
        <View>
          <Text style={styles.inputTitle}>
            {label}
            {required && <Text style={{color: color.red}}>{' *'}</Text>}
          </Text>
        </View>

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={'#ced4da'}
          value={value}
          onChangeText={onChangeText}
          style={{
            minHeight: height * 0.05,
            backgroundColor: 'white',
            paddingHorizontal: 0,
          }}
          multiline={multiline}
          keyboardType={keyboardType}
          maxLength={maxLength}
          activeUnderlineColor={color.primary}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputNormal;

const styles = StyleSheet.create({
  inputTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: color.primary,
  },

  labelContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingTop: 15,
  },

  typeInput: {
    borderColor: color.primary,
    borderWidth: 1,
    padding: 15,
    marginVertical: 5,
    borderRadius: 30,
  },
  errorText: {
    color: color.red,
    paddingHorizontal: 10,
    fontSize: 11,
  },
});
