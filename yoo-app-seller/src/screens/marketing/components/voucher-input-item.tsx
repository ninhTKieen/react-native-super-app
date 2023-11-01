import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CurrencyInput from 'react-native-currency-input';
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  set,
  useController,
  useFormContext,
} from 'react-hook-form';
import {IVoucherCreate} from '@/features/voucher/voucher.model';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {color} from '@/configs/globalStyles';

type Props = {
  pressable: boolean;
  suffix?: ' đ' | ' %';
  label: string;
  disabled?: boolean;
};

type InputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = UseControllerProps<TFieldValues, TName> & Props;

const VoucherInputItem = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  name,
  control,
  defaultValue,
  label,
  pressable,
  suffix,
  disabled,
}: InputProps<TFieldValues, TName>): JSX.Element => {
  const {watch, setValue, getValues} = useFormContext<IVoucherCreate>();
  const [isFocused, setIsFocused] = React.useState(false);

  const {
    field: {value, onChange},
    fieldState: {error},
  } = useController({
    name,
    control,
    defaultValue,
  });
  return (
    <>
      <View style={styles.container}>
        <Text style={{maxWidth: '50%'}}>{label}</Text>
        <View style={styles.inputWrapper}>
          {pressable && (
            <TouchableOpacity
              disabled={disabled}
              onPress={() => {
                if (value > 0) {
                  onChange(value - 1);
                }
              }}>
              <Icon
                name={'minus'}
                size={16}
                color={disabled ? color.grey6 : color.blueDark}
              />
            </TouchableOpacity>
          )}
          <CurrencyInput
            editable={!disabled}
            value={value}
            onChangeValue={data => onChange(data)}
            precision={0}
            delimiter="."
            suffix={pressable ? '' : suffix}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              flexGrow: 1,
              textAlign: pressable ? 'center' : 'left',
              maxWidth: pressable ? '80%' : '100%',
              paddingRight: pressable ? 0 : 3,
              paddingVertical: 0,
              borderBottomWidth: 1,
              paddingBottom: 10,
              borderColor: isFocused ? color.blue2 : color.grey8,
              color: disabled ? color.grey6 : color.blueDark,
            }}
            minValue={0}
            maxValue={500000}
          />
          {pressable && (
            <TouchableOpacity
              disabled={disabled}
              onPress={() => {
                if (value < 200000) {
                  onChange(value + 1);
                }
              }}>
              <Icon
                name={'plus'}
                size={16}
                style={{width: 16}}
                color={disabled ? color.grey6 : color.blueDark}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {error && <Text style={{color: 'red'}}>{error.message}</Text>}
    </>
  );
};

export default VoucherInputItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 25,
  },
  text: {},
  input: {},
  inputWrapper: {
    flexDirection: 'row',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    paddingHorizontal: 3,
  },
});
