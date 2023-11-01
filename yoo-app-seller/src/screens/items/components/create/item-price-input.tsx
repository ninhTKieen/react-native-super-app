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
}

const ItemPriceInput = ({
  label,
  isRequired,
  textInputValue,
}: IProps): JSX.Element => {
  const {control, watch} = useFormContext();
  const {field} = useController({
    name: 'modelList',
    control,
  });
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.labelWrapper}>
        <View style={{width: 40}}>
          <ItemIcon.Price />
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
          placeholder={t(i18nKeys.item.create.enterPrice) as string}
          value={field.value?.[0].currentPrice}
          onChangeValue={text => {
            field.onChange([
              {
                ...watch('modelList')?.[0],
                currentPrice: text,
                originalPrice: text,
              },
            ]);
          }}
          style={{padding: 0, minWidth: 20}}
          keyboardType="numeric"
          suffix="đ"
          precision={0}
          editable={textInputValue ? false : true}
          textAlign="right"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ItemPriceInput;
