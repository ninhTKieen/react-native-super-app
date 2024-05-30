import IconGeneral from '@src/components/icon-general';
import globalStyles, { colors } from '@src/configs/constant/global-styles';
import React, { useState } from 'react';
import {
  Platform,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

interface ILoginInput {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  error?: string;
  secureTextEntry?: boolean;
}

const LoginInput = ({
  label,
  placeholder = '',
  value = '',
  onChangeText,
  secureTextEntry = false,
  error,
}: ILoginInput): JSX.Element => {
  const { width } = useWindowDimensions();

  const [isSecurity, setIsSecurity] = useState(secureTextEntry);
  return (
    <View>
      <View
        className="relative mt-5 h-[42] flex-row items-center rounded-xl border border-[#89B05F] bg-white"
        style={{ width: width * 0.8 }}
      >
        <Text
          style={{
            backgroundColor: '#FFFFFF',
          }}
          className="absolute -top-3 left-4 z-50 bg-transparent font-semibold text-[#89B05F]"
        >
          {label}
        </Text>

        <TextInput
          autoCapitalize="none"
          secureTextEntry={isSecurity}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.grey4}
          placeholder={placeholder}
          className="h-[40px] w-11/12 p-2 text-[#484C63]"
          style={{
            paddingRight: secureTextEntry ? '15%' : '5%',
            paddingVertical: Platform.OS === 'android' ? 5 : 0,
          }}
        />
        {secureTextEntry && (
          <View>
            <IconGeneral
              type="Entypo"
              size={25}
              color={'#89B05F'}
              name={isSecurity ? 'eye' : 'eye-with-line'}
              onPress={() => setIsSecurity(!isSecurity)}
            />
          </View>
        )}
      </View>

      {error && (
        <Text
          className="mt-2 text-left text-red-500"
          style={[globalStyles.errorMessage]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default LoginInput;
