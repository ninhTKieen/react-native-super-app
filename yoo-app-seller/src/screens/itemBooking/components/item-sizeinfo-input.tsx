import React from 'react';

import {View, StyleSheet, Text} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import {useController, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ItemIcon} from '@/screens/items/icon';
import {color} from '@/configs/globalStyles';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

interface IProps {
  label: string;
  isRequired?: boolean;
  textInputValue?: string | null;
  error?: string;
}

const ItemSizeInfoInput = ({
  label,
  isRequired,
  textInputValue,
  error,
}: IProps): JSX.Element => {
  const {control, watch} = useFormContext();
  const {field} = useController({
    name: 'sizeInfo',
    control,
  });
  const {t} = useTranslation();
  console.log(error);

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
      <View style={styles.container}>
        <View style={styles.labelWrapper}>
          <View style={{width: 40}}>
            <ItemIcon.Attribute />
          </View>
          <View>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 16,
                color: color.grey6,
              }}>
              {label}
              {isRequired && <Text style={{color: color.red}}>{' *'}</Text>}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CurrencyInput
            placeholder={
              t(i18nKeys.itemBooking.create.enterAttribute) as string
            }
            value={field.value?.currentPrice}
            onChangeValue={text => {
              field.onChange(text);
            }}
            style={{padding: 0, minWidth: 20}}
            keyboardType="numeric"
            suffix="đ"
            precision={0}
            editable={textInputValue ? false : true}
          />
        </View>
      </View>
      {error && <Text style={styles.errTxt}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  errTxt: {
    color: 'red',
    paddingBottom: 5,
    fontSize: 12,
    fontWeight: '500',
    paddingTop: 10,
  },
});

export default ItemSizeInfoInput;
