import React from 'react';
import globalStyles, {color} from '@/configs/globalStyles';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {IChangePasswordForm} from '@/features/profile/profile.model';
import {useController, useFormContext} from 'react-hook-form';

type Props = {
  name: 'currentPassword' | 'newPassword' | 'confirmPassword';
  label?: string;
};

const ChangePasswordInput = ({name, label}: Props): JSX.Element => {
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);
  const {control} = useFormContext<IChangePasswordForm>();
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController({
    name,
    control,
  });

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        label={label}
        activeOutlineColor={'#0077b6'}
        activeUnderlineColor={'#0077b6'}
        outlineColor="gray"
        secureTextEntry={secureTextEntry}
        onChangeText={onChange}
        value={value}
        right={
          <TextInput.Icon
            icon={secureTextEntry ? 'eye' : 'eye-off'}
            color={color.blue1}
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          />
        }
      />
      {error && (
        <Text
          style={[
            globalStyles.errorMessage,
            {color: color.red, paddingHorizontal: 15, paddingTop: 5},
          ]}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
  },
  wrapper: {
    marginBottom: 20,
  },
});

export default ChangePasswordInput;
