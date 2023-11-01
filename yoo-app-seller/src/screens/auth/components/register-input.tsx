import globalStyles, {color} from '@/configs/globalStyles';
import React from 'react';
import {View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation} from '@tanstack/react-query';
import {ICheckTenantAvailableRequest} from '@/features/auth/auth.model';
import authServices from '@/features/auth/auth.services';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

type Props = {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string | undefined;
  required?: boolean;
};

type InputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & Props;

const ImportantLabel = ({label}: {label?: string}): JSX.Element => {
  return (
    <>
      <Text>{label}</Text>
      <Text style={{color: color.red, fontSize: 16}}>*</Text>
    </>
  );
};

const RegisterInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  label,
  placeholder,
  secureTextEntry,
  control,
  name,
  required,
  error,
}: InputProps<TFieldValues, TName>): JSX.Element => {
  const {
    field: {value, onChange},
  } = useController({
    control,
    name,
  });

  const [secureText, setSecureText] = React.useState<boolean>(true);

  return (
    <View
      style={{
        // paddingHorizontal: 15,
        paddingVertical: 5,
      }}>
      <TextInput
        mode="flat"
        label={required ? <ImportantLabel label={label} /> : label}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry ? secureText : false}
        onChangeText={onChange}
        value={value}
        style={{
          borderBottomColor: 'red',
          borderRadius: 5,
          backgroundColor: 'white',
        }}
        activeUnderlineColor={color.blue1}
        right={
          secureTextEntry ? (
            <TextInput.Icon
              icon={!secureText ? 'eye' : 'eye-off-outline'}
              color="red"
              onPress={() => setSecureText(!secureText)}
            />
          ) : null
        }
      />
      {error && (
        <Text
          style={[
            globalStyles.errorMessage,
            {color: color.red, paddingHorizontal: 15, paddingTop: 5},
          ]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export const TenantInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(
  props: InputProps<TFieldValues, TName>,
): JSX.Element => {
  const [tenant, setTenant] = React.useState<string>('');

  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController({
    control: props.control,
    name: props.name,
  });

  const {mutate} = useMutation({
    mutationFn: (data: ICheckTenantAvailableRequest) => {
      return authServices.getTenant(data);
    },
    onSuccess: data => {
      onChange(data.tenantId !== null ? data.tenantId : 0);
    },
  });

  const onBlur = () => {
    if (tenant !== '') {
      mutate({tenancyName: tenant});
    } else {
      onChange(null);
    }
  };

  return (
    <View>
      <TextInput
        mode="flat"
        label={props.label}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        onChangeText={t => setTenant(t)}
        placeholderTextColor={color.blueDark}
        value={tenant}
        style={{
          borderBottomColor: 'red',
          borderRadius: 5,
          backgroundColor: 'white',
        }}
        activeUnderlineColor={color.blue1}
        left={<TextInput.Icon icon="city-variant-outline" color="red" />}
        right={
          <TextInput.Icon
            // eslint-disable-next-line react/no-unstable-nested-components
            icon={() => (
              <Icon
                name={
                  value !== 0 || tenant === ''
                    ? 'check-circle-outline'
                    : 'close-circle-outline'
                }
                size={23}
                color={value !== 0 || tenant === '' ? 'green' : color.red}
                style={{marginTop: 10}}
              />
            )}
          />
        }
        onBlur={onBlur}
      />
      {error && tenant && (
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

export default RegisterInput;
