import React, {useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {useAppSelector, useAppDispatch} from '@/hooks/redux.hook';
import {createItemActions, selectedCategory} from '@/features/item/item.slice';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useFormContext} from 'react-hook-form';
import TopBar from '@/components/top-bar';
import PressableLabel from '@/screens/items/components/create/press-label';
import ItemPriceInput from '@/screens/items/components/create/item-price-input';
import ItemStockInput from '@/screens/items/components/create/item-stock-input';
import ImageList from '@/screens/items/components/create/image-list';
import {AxiosError} from 'axios';
import itemService from '@/features/item/item.service';
import httpUtil from '@/utils/http.util';
import {ICreateItem, IItemTierVariation} from '@/features/item/item.model';
import {ItemStackParamList} from '@/routes/item.route';
import {IItemModel} from '@/features/item/item.model';
import {ItemIcon} from '@/screens/items/icon';
import {color} from '@/configs/globalStyles';

type CreateItemScreenNavigationProp = NavigationProp<
  ItemStackParamList,
  'CreateItem'
>;

type CreateItemScreenRouteProp = RouteProp<ItemStackParamList, 'CreateItem'>;

const CreateItemScreen = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const category = useAppSelector(selectedCategory);
  const navigation = useNavigation<CreateItemScreenNavigationProp>();
  const route = useRoute<CreateItemScreenRouteProp>();
  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: {errors},
  } = useFormContext<ICreateItem>();
  const queryClient = useQueryClient();

  const {data: attributeList, isLoading} = useQuery({
    queryKey: ['attributeList', category?.id],
    queryFn: () => itemService.getItemAttributes(category.id),
    onError: error => {
      console.log('error', (error as AxiosError).response?.data);
    },
    enabled: !!category?.id,
  });

  const {mutate: itemMutate} = useMutation(
    async (data: ICreateItem) => {
      const response = await httpUtil.uploadListImage({
        files: data.imageUrlList,
      });
      data.imageUrlList = response.result.data;
      if (!data.tierVariationList?.length) {
        data.modelList[0].imageUrl = response.result.data[0];
      }
      return await itemService.createItem({
        item: data,
      });
    },
    {
      onSuccess: _data => {
        Toast.show({
          type: 'success',
          text1: t(i18nKeys.item.create.success) as string,
        });
        queryClient.refetchQueries(['items']);
        navigation.goBack();
        reset();
      },
      onError: error => {
        console.log((error as AxiosError).message);
        Toast.show({
          type: 'error',
          text1: t(i18nKeys.common.error) as string,
          text2: t(i18nKeys.item.create.error) as string,
        });
        navigation.goBack();
        reset();
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

  const onSubmit = async (data: any) => {
    itemMutate(data);
  };

  //check if go back, reset all data
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if (e.data.action.type === 'GO_BACK') {
        reset();
        dispatch(createItemActions.clear());
      }
    });
    return unsubscribe;
  }, [navigation, reset, dispatch]);

  useEffect(() => {
    if (route.params?.idStore) {
      setValue('providerId', route.params.idStore, {
        shouldValidate: true,
      });
    }
  }, [route.params?.idStore, setValue]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView behavior={'position'}>
        <TopBar title={t(i18nKeys.item.create.title)} />
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
          onPress={() => {
            navigation.navigate('ItemCategory', {});
          }}
          textInputValue={category?.name}
        />
        <View style={{paddingHorizontal: 10, backgroundColor: '#fff'}}>
          {errors.categoryId && (
            <Text style={{color: 'red'}}>{errors?.categoryId.message}</Text>
          )}
        </View>
        <Divider />

        {category?.id && !isLoading && (
          <>
            <View>
              <PressableLabel
                label={t(i18nKeys.item.create.attributes)}
                iconLeft={ItemIcon.Attribute}
                isRequired={true}
                onPress={() => {
                  navigation.navigate('ItemAttribute', {});
                }}
                textInputValue={`${
                  watch('attributeList')?.filter(
                    (attribute: any) => attribute.valueList?.length > 0,
                  ).length || 0
                }/${attributeList?.length ? attributeList?.length : 0}`}
              />
            </View>
            <Divider />
          </>
        )}
        <PressableLabel
          label={t(i18nKeys.item.create.variations)}
          iconLeft={ItemIcon.Variation}
          onPress={() => {
            navigation.navigate('CreateItemVariant', {});
          }}
          textInputValue={
            watch('tierVariationList')?.length > 0 &&
            watch('modelList')?.length > 0
              ? titleVariant(watch('tierVariationList'))
              : undefined
          }
        />
        <Divider />

        <ItemPriceInput
          label={t(i18nKeys.item.create.price)}
          isRequired={true}
          textInputValue={
            watch('tierVariationList')?.length > 0 &&
            watch('modelList')?.length > 0
              ? totalPrice(watch('modelList'))
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
            watch('tierVariationList')?.length > 0 &&
            watch('modelList')?.length > 0
              ? watch('modelList').reduce(
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
                dispatch(createItemActions.clear());
              }}>
              {t(i18nKeys.common.clear)}
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  input: {
    width: '90%',
    height: 50,
    marginBottom: 20,
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
  },
});

export default CreateItemScreen;
