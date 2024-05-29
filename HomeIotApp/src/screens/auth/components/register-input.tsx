import globalStyles, { colors } from '@src/configs/constant/global-styles';
import React from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';

type TRegisterInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: any | undefined;
  required?: boolean;
};

const ImportantLabel = ({ label }: { label?: string }): JSX.Element => {
  return (
    <>
      <Text>{label}</Text>
      <Text style={{ color: colors.red, fontSize: 16 }}>*</Text>
    </>
  );
};

const RegisterInput = ({
  value,
  onChangeText,
  label,
  placeholder,
  secureTextEntry,
  required,
  error,
}: TRegisterInputProps): JSX.Element => {
  const [secureText, setSecureText] = React.useState<boolean>(true);

  return (
    <View
      style={{
        // paddingHorizontal: 15,
        paddingVertical: 5,
      }}
    >
      <TextInput
        mode="flat"
        label={required ? <ImportantLabel label={label} /> : label}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry ? secureText : false}
        onChangeText={onChangeText}
        value={value}
        style={{
          borderBottomColor: 'red',
          borderRadius: 5,
          backgroundColor: 'white',
        }}
        activeUnderlineColor={'#89B05F'}
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={!secureText ? 'eye' : 'eye-off-outline'}
              color={colors.primary}
              onPress={() => setSecureText(!secureText)}
            />
          ) : null
        }
      />
      {error && (
        <Text
          style={[
            globalStyles.errorMessage,
            { color: colors.red, paddingHorizontal: 15, paddingTop: 5 },
          ]}
        >
          {error.message}
        </Text>
      )}
    </View>
  );
};

export default RegisterInput;
