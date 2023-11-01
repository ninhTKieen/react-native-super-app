import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import {TextInput, TextInputProps} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useModal} from 'react-native-modalfy';
import {ModalStackParamsList} from '@/components/modals';
import {color} from '@/configs/globalStyles';
import {ISupplierType} from '@/configs/i18n/constants/supplier-type-vi';
import IconGeneral from '@/components/common/icon-general';

interface typeButtonProps {
  data: ISupplierType[] | any;
  isButton: boolean;
}

type Props = {
  buttonProps?: typeButtonProps;
  important?: boolean;
};

type InputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & Props & TextInputProps;

const StoreInputText = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  defaultValue,
  buttonProps,
  label,
  important,
  disabled,
  ...textInputProps
}: InputProps<TFieldValues, TName>): JSX.Element => {
  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({
    name,
    control,
    defaultValue,
  });
  const {openModal} = useModal<ModalStackParamsList>();

  const [inputName, setInputName] = React.useState<string>('');

  React.useEffect(() => {
    let initialValue;
    if (
      buttonProps?.isButton === true &&
      defaultValue !== null &&
      buttonProps?.data
    ) {
      initialValue = buttonProps?.data.filter(
        (x: any) => x.value === defaultValue,
      );

      if (initialValue.length > 0) {
        setInputName(initialValue[0].label);
      }
    } else {
      setInputName('');
    }
  }, [inputName, buttonProps?.isButton, defaultValue, buttonProps?.data]);

  if (buttonProps?.isButton !== true) {
    return (
      <View style={{paddingHorizontal: 5, paddingVertical: 10}}>
        <Text style={styles.label}>
          {label}
          {important && <Text style={{color: 'red'}}>*</Text>}
        </Text>
        <TextInput
          value={value}
          mode="flat"
          onChangeText={text => {
            onChange(text);
          }}
          style={{
            marginBottom: 10,
            marginHorizontal: 0,
            maxHeight: 100,
            backgroundColor: '#fff',
          }}
          underlineStyle={{borderWidth: 0, marginHorizontal: 10}}
          activeUnderlineColor={'#3498db'}
          numberOfLines={textInputProps.multiline === true ? 5 : 1}
          {...textInputProps}
        />
        {error && (
          <Text style={{color: 'red', paddingHorizontal: 15}}>
            {error.message}
          </Text>
        )}
      </View>
    );
  } else {
    return (
      <View style={{paddingBottom: 20}}>
        <Text style={[styles.label, {paddingHorizontal: 20}]}>
          {label}
          {important && <Text style={{color: 'red'}}>*</Text>}
        </Text>
        <TouchableOpacity
          disabled={disabled}
          style={{
            backgroundColor: '#B7D4FF26',
            paddingVertical: 13,
            paddingHorizontal: 20,
            marginTop: 15,
            borderWidth: 2,
            borderColor: disabled ? 'rgba(176,218,255,0.2)' : '#B0DaFF',
            borderRadius: 150,
            marginHorizontal: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          onPress={() => {
            openModal('SelectListModal', {
              title: label as string,
              data: buttonProps?.data,
              onSelect: (item: string) => {
                onChange(item);
              },
              onSetName: (t: string) => {
                setInputName(t);
              },
              value: value,
            });
          }}>
          <Text
            style={{
              color: disabled ? 'rgba(135, 138, 156, 0.5)' : '#878A9C',
            }}>
            {inputName}
          </Text>
          <IconGeneral
            type="Ionicons"
            name="ios-chevron-down"
            size={24}
            color={disabled ? 'rgba(135, 138, 156, 0.5)' : '#878A9C'}
          />
        </TouchableOpacity>
        {error && (
          <Text style={{color: 'red', paddingHorizontal: 15}}>
            {error.message}
          </Text>
        )}
      </View>
    );
  }
};

export default StoreInputText;

const styles = StyleSheet.create({
  label: {
    color: color.blueDark1,
    fontSize: 17,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: color.blueDark1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 10,
  },
});
