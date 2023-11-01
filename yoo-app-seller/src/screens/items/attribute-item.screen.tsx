import React from 'react';

import {ScrollView, View, Text, Pressable, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useQuery} from '@tanstack/react-query';
import {useAppSelector} from '@/hooks/redux.hook';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useFieldArray, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {AxiosError} from 'axios';

import TopBar from '@/components/top-bar';
import itemService from '@/features/item/item.service';
import {selectedCategory} from '@/features/item/item.slice';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {ItemAttribute} from '@/features/item/item.model';
import {color} from '@/configs/globalStyles';
import {ItemStackParamList} from '@/routes/item.route';

type AttributeScreenProps = NavigationProp<
  ItemStackParamList,
  'ItemAttributeDetail'
>;

const AttributeScreen = (): JSX.Element => {
  const navigation = useNavigation<AttributeScreenProps>();
  const {control, watch} = useFormContext();
  const {append} = useFieldArray({
    name: 'attributeList',
    control,
  });
  const {t} = useTranslation();
  const category = useAppSelector(selectedCategory);
  const {data: attributeList, isLoading} = useQuery({
    queryKey: ['attributeList', category?.id],
    queryFn: () => itemService.getItemAttributes(category.id),
    onError: error => {
      console.log('error', (error as AxiosError).response?.data);
    },
    onSuccess: res => {
      if (!watch('attributeList').length) {
        res.forEach(attribute => {
          append({
            id: attribute.id,
            unitList: [],
            valueList: [],
          });
        });
      }
    },
    enabled: !!category?.id,
  });

  const onSubmit = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#fff'}}>
      <TopBar title={t(i18nKeys.item.create.attributesTitle)} />
      {!isLoading &&
        ((attributeList as ItemAttribute[])?.length > 0 ? (
          <View>
            {attributeList?.map(attribute => {
              return (
                <View key={attribute.id}>
                  <Pressable
                    style={styles.labelWrapper}
                    onPress={() =>
                      navigation.navigate('ItemAttributeDetail', {
                        attribute,
                      })
                    }>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <MCIcon
                        name="newspaper-variant-multiple"
                        size={25}
                        color="#34495e"
                        style={{paddingRight: 5}}
                      />

                      <Text style={{fontWeight: 'bold'}}>
                        {attribute.name}
                        {attribute.isRequired && (
                          <Text style={{color: 'red'}}>{' *'}</Text>
                        )}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '30%',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{textAlign: 'left', width: '80%'}}>
                        {watch('attributeList')
                          ?.find((item: any) => item.id === attribute.id)
                          ?.valueList.join()?.length > 12
                          ? `${watch('attributeList')
                              ?.find((item: any) => item.id === attribute.id)
                              ?.valueList.join()
                              .slice(0, 12)} ...`
                          : watch('attributeList')
                              ?.find((item: any) => item.id === attribute.id)
                              ?.valueList.join()}
                      </Text>
                      <MCIcon name="chevron-right" size={25} color="gray" />
                    </View>
                  </Pressable>
                </View>
              );
            })}

            <View style={{padding: 10}}>
              <Button
                mode="contained"
                buttonColor={color.primary}
                style={{borderRadius: 10}}
                onPress={onSubmit}>
                {t(i18nKeys.common.save)}
              </Button>
            </View>
          </View>
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <MCIcon
              name="emoticon-confused-outline"
              size={50}
              color={color.primary}
            />
            <Text>{t(i18nKeys.item.create.empty)}</Text>
          </View>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},

  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default AttributeScreen;
