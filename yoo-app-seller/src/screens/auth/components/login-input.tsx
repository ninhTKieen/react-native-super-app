import {View, Text, TextInput, Platform, Dimensions} from 'react-native';
import React, {useState} from 'react';
import globalStyles, {color} from '@/configs/globalStyles';
import EntypoIcon from 'react-native-vector-icons/Entypo';

interface ILoginInput {
  placeholder: string;
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  error: string | undefined;
  secureTextEntry: boolean | false;
}

const width = Dimensions.get('window').width;

const LoginInput = ({
  placeholder = '',
  value = '',
  onChangeText,
  error = '',
  secureTextEntry = false,
}: ILoginInput): JSX.Element => {
  const [isSecurity, setIsSecurity] = useState(secureTextEntry);
  return (
    <View>
      <View
        style={[
          {
            backgroundColor: color.grey,
            borderRadius: 17,
            width: width * 0.8,
            flexDirection: 'row',
            borderColor: color.blue1,
            borderWidth: 1,
            alignItems: 'center',
            marginTop: 10,
            height: 42,
          },
        ]}>
        <TextInput
          autoCapitalize="none"
          secureTextEntry={isSecurity}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={color.grey4}
          placeholder={placeholder}
          style={[
            {
              width: '90%',
              color: color.blueDark,
              paddingVertical: Platform.OS === 'android' ? 5 : 0,
              paddingLeft: '5%',
              paddingRight: secureTextEntry ? '15%' : '5%',
              height: 40,
            },
          ]}
        />
        {secureTextEntry && (
          <View>
            <EntypoIcon
              size={25}
              color={color.green0}
              name={isSecurity ? 'eye' : 'eye-with-line'}
              onPress={() => setIsSecurity(!isSecurity)}
            />
          </View>
        )}
      </View>
      <Text
        style={[
          globalStyles.errorMessage,
          {color: color.red, paddingHorizontal: 15},
        ]}>
        {error}
      </Text>
    </View>
  );
};

export default LoginInput;
