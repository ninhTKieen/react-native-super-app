import React from 'react';

import {View, StyleSheet, Text, TextInput} from 'react-native';
import {useController, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ItemIcon} from '@/screens/items/icon';
import {color} from '@/configs/globalStyles';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

interface IProps {
  label: string;
  isRequired?: boolean;
  textInputValue?: number | null;
}

const ItemStockInput = ({
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
          <ItemIcon.Quantity />
        </View>

        <Text
          style={{
            fontWeight: '500',
            fontSize: 16,
            lineHeight: 16,
            color: color.grey6,
          }}>
          {label}
          {isRequired && <Text style={{color: color.red}}>{' *'}</Text>}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {textInputValue !== null && textInputValue !== undefined ? (
          <Text>{textInputValue}</Text>
        ) : (
          <TextInput
            placeholder={t(i18nKeys.item.create.enterStock) as string}
            value={watch('modelList')?.[0]?.stock?.toString()}
            inputMode="numeric"
            onChangeText={text => {
              field.onChange([
                {
                  ...watch('modelList')?.[0],
                  stock: text,
                },
              ]);
            }}
            style={{padding: 0, minWidth: 20}}
            keyboardType="numeric"
            textAlign="right"
          />
        )}
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

export default ItemStockInput;
