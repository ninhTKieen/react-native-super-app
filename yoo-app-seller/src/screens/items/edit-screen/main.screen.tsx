import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Toast from 'react-native-toast-message';
import TopBar from '@/components/top-bar';
import PressableLabel from '@/screens/items/components/create/press-label';
import ItemPriceInput from '@/screens/items/components/create/item-price-input';
import ItemStockInput from '@/screens/items/components/create/item-stock-input';
import ImageList from '@/screens/items/components/create/image-list';
import {EditItemStackParamList} from '@/routes/item.route';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {
  IItem,
  IItemModel,
  IItemTierVariation,
} from '@/features/item/item.model';
import itemServices from '@/features/item/item.service';
import {ItemIcon} from '@/screens/items/icon';
import {color} from '@/configs/globalStyles';
import httpUtil from '@/utils/http.util';
import {AxiosError} from 'axios';

type EditItemScreenNavigationProp = NavigationProp<
  EditItemStackParamList,
  'EditItem'
>;

type EditItemScreenRouteProp = RouteProp<EditItemStackParamList, 'EditItem'>;

const EditItemScreen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<EditItemScreenNavigationProp>();
  const route = useRoute<EditItemScreenRouteProp>();
  const item = route.params.item;
  const {t} = useTranslation();
  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: {errors},
  } = useFormContext<IItem>();

  const {data: category} = useQuery({
    queryKey: ['item-category', item.categoryId],
    queryFn: () =>
      itemServices.getCategoryById({
        id: item.categoryId as number,
      }),
  });

  const {data: attributeList} = useQuery({
    queryKey: ['attributeList', category?.id],
    queryFn: () => itemServices.getItemAttributes(item.categoryId as number),
    onError: error => {
      console.log('error', (error as AxiosError).response?.data);
    },
    enabled: !!category?.id,
  });

  const {mutate: updateItem} = useMutation(
    async (data: IItem) => {
      const imageObjectList = data.imageUrlList.filter(
        image => typeof image === 'object',
      );
      const imageUrlList = data.imageUrlList.filter(
        image => typeof image === 'string',
      );
      if (imageObjectList.length > 0) {
        const response = await httpUtil.uploadListImage({
          files: imageObjectList,
        });
        data.imageUrlList = [...imageUrlList, ...response.result.data];
      }

      return await itemServices.updateItem({
        item: data,
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries(['items']);
        Toast.show({
          type: 'success',
          text1: t(i18nKeys.common.success) as string,
          text2: t(i18nKeys.item.edit.statusSuccess) as string,
        });
        navigation.goBack();
      },
      onError: err => {
        console.log('Err', err);
        Toast.show({
          type: 'error',
          text1: t(i18nKeys.item.edit.statusError) as string,
          text2: t(i18nKeys.common.errorMessage) as string,
        });
        navigation.goBack();
      },
    },
  );

  const totalPrice = (modelList: Array<IItemModel>) => {
    const priceList = modelList.map(model => Number(model.currentPrice));
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);
    if (minPrice === maxPrice) {
      return `${minPrice}đ`;
    }
    return `${minPrice}đ - ${maxPrice}đ`;
  };

  const titleVariant = (tierVariationList: Array<IItemTierVariation>) => {
    if (tierVariationList?.length === 2) {
      const tierOneOptions = tierVariationList[0].optionList as Array<string>;
      const tierTwoOptions = tierVariationList[1].optionList as Array<string>;
      let result = '';
      for (let i = 0; i < tierOneOptions.length; i++) {
        for (let j = 0; j < tierTwoOptions.length; j++) {
          result += `${tierOneOptions[i]} ${tierTwoOptions[j]}, `;
        }
      }
      return result.slice(0, -2);
    } else {
      const tierOptions = tierVariationList[0].optionList as Array<string>;

      return tierOptions?.join(', ');
    }
  };

  const onSubmit = (data: IItem) => {
    // console.log(data);
    updateItem(data);
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <TopBar title={t(i18nKeys.item.edit.title)} />

      <ImageList />
      <View style={{paddingHorizontal: 10, backgroundColor: '#fff'}}>
        {errors.imageUrlList && (
          <Text style={{color: 'red'}}>{errors?.imageUrlList.message}</Text>
        )}
      </View>

      <View style={styles.labelContainer}>
        <View>
          <Text style={styles.inputTitle}>
            {t(i18nKeys.item.create.name)}
            <Text style={{color: color.red}}>{' *'}</Text>
          </Text>
        </View>

        <TextInput
          placeholder={t(i18nKeys.item.create.enterName) as string}
          value={watch('name')}
          onChangeText={text =>
            setValue('name', text, {
              shouldValidate: true,
            })
          }
          style={{height: 50}}
        />
        {errors.name && (
          <Text style={{color: 'red'}}>{errors?.name.message}</Text>
        )}
      </View>
      <View style={{height: 5, backgroundColor: '#F1F2F8'}} />

      <View style={styles.labelContainer}>
        <View>
          <Text style={styles.inputTitle}>
            {t(i18nKeys.item.create.description)}
            <Text style={{color: color.red}}>{' *'}</Text>
          </Text>
        </View>

        <TextInput
          placeholder={t(i18nKeys.item.create.enterDescription) as string}
          value={watch('description')}
          onChangeText={text =>
            setValue('description', text, {
              shouldValidate: true,
            })
          }
          textAlignVertical="top"
          multiline={true}
          style={{height: 100}}
        />
        {errors.description && (
          <Text style={{color: 'red'}}>{errors?.description.message}</Text>
        )}
      </View>
      <View style={{height: 5, backgroundColor: '#F1F2F8'}} />

      <PressableLabel
        label={t(i18nKeys.item.create.category)}
        iconLeft={ItemIcon.Category}
        isRequired={true}
        textInputValue={category?.name}
      />
      <Divider />

      <PressableLabel
        label={t(i18nKeys.item.create.attributes)}
        iconLeft={ItemIcon.Attribute}
        isRequired={true}
        onPress={() => {}}
        textInputValue={`${
          watch('attributeList')?.filter(
            (attribute: any) => attribute.valueList?.length > 0,
          ).length || 0
        }/${attributeList?.length}`}
      />
      <Divider />

      <PressableLabel
        label={t(i18nKeys.item.create.variations)}
        iconLeft={ItemIcon.Variation}
        textInputValue={
          (watch('tierVariationList')?.length as number) > 0 &&
          (watch('modelList')?.length as number) > 0
            ? titleVariant(watch('tierVariationList') as IItemTierVariation[])
            : undefined
        }
        onPress={() => {
          navigation.navigate('EditVariantInfo');
        }}
      />
      <Divider />

      <ItemPriceInput
        label={t(i18nKeys.item.create.price)}
        isRequired={true}
        textInputValue={
          (watch('tierVariationList')?.length as number) > 0 &&
          (watch('modelList')?.length as number) > 0
            ? totalPrice(watch('modelList') as IItemModel[])
            : null
        }
      />
      <View style={{paddingHorizontal: 10, backgroundColor: '#fff'}}>
        {errors.modelList && (
          <Text style={{color: 'red'}}>{errors?.modelList.message}</Text>
        )}
      </View>
      <Divider />

      <ItemStockInput
        label={t(i18nKeys.item.create.stock)}
        isRequired={true}
        textInputValue={
          (watch('tierVariationList')?.length as number) > 0 &&
          (watch('modelList')?.length as number) > 0
            ? (watch('modelList') as IItemModel[]).reduce(
                (total: number, model: any) =>
                  Number(total) + Number(model.stock),
                0,
              )
            : null
        }
      />
      <View style={{paddingHorizontal: 10, backgroundColor: '#fff'}}>
        {errors.modelList && (
          <Text style={{color: 'red'}}>{errors?.modelList.message}</Text>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          flex: 1,
        }}>
        <View style={{flex: 1.5}}>
          <Button
            textColor={color.primary}
            mode="outlined"
            style={{borderColor: color.primary}}
            onPress={() => {
              reset();
              navigation.goBack();
            }}>
            {t(i18nKeys.common.cancel)}
          </Button>
        </View>
        <View style={{width: 20}} />

        <View style={{flex: 1.5}}>
          <Button
            mode="contained"
            buttonColor={color.primary}
            onPress={handleSubmit(onSubmit)}>
            {t(i18nKeys.common.save)}
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inputTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: color.primary,
  },

  labelContainer: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingTop: 15,
    marginTop: 10,
  },
});

export default EditItemScreen;
