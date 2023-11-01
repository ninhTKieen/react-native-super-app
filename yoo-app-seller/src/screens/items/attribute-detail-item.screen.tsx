import React from 'react';

import {View} from 'react-native';
import {Button} from 'react-native-paper';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useFieldArray, useFormContext} from 'react-hook-form';

import CommonInput from '@/components/common/common-input';
import TopBar from '@/components/top-bar';
import {ItemAttribute} from '@/features/item/item.model';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {color} from '@/configs/globalStyles';

const AttributeDetailScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();
  const {control, watch, setValue} = useFormContext();
  const attribute = (route.params as any).attribute as ItemAttribute;
  const {} = useFieldArray({
    name: 'attributeList',
    control,
  });
  const {t} = useTranslation();

  const setFieldValue = (value: Array<string>) => {
    setValue(
      'attributeList',
      watch('attributeList').map((item: any) => {
        if (item.id === attribute.id) {
          return {
            ...item,
            valueList: value,
          };
        }
        return item;
      }),
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TopBar title={t(i18nKeys.item.create.createAttributeTitle)} />
      <CommonInput attribute={attribute} setValue={setFieldValue} />
      <View style={{padding: 10}}>
        <Button
          mode="contained"
          onPress={() => {
            navigation.goBack();
          }}
          style={{borderRadius: 10}}
          buttonColor={color.primary}>
          {t(i18nKeys.common.save)}
        </Button>
      </View>
    </View>
  );
};

export default AttributeDetailScreen;
