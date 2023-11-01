import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import TopBar from '@/components/top-bar';
import IconGeneral from '@/components/common/icon-general';
import ChooseImageModal, {
  ImageProps,
} from '@/components/modals/choose-image-modal';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import adServices from '@/features/advertisement/ad.service';
import httpUtil from '@/utils/http.util';

import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';
import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {color} from '@/configs/globalStyles';
import {ItemIcon} from '@/screens/items/icon';
import {IItem, ItemDisplay} from '@/features/item/item.model';
import itemService from '@/features/item/item.service';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStore} from '@/features/store/store.slice';
import {useForm} from 'react-hook-form';
import {ICreateAdData} from '@/features/advertisement/ad.model';
import {useAdValidator} from '@/validators/advertisement/ad.validator';
import {yupResolver} from '@hookform/resolvers/yup';
import {AxiosError} from 'axios';

const {width, height} = Dimensions.get('screen');

const DropDownItem = ({item}: {item: IItem}): JSX.Element => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
      }}>
      <FastImage
        source={{
          uri: item.imageUrlList[0],
        }}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
        }}
      />
      <Text
        style={{
          marginHorizontal: 10,
        }}>
        {item.name}
      </Text>
    </View>
  );
};

const CreateAdScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const providerId = useAppSelector(selectCurrentStore);
  const [currentItem, setCurrentItem] = useState<IItem>();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [visibleChooseImg, setVisibleChooseImg] = useState<boolean>(false);
  const adSchema = useAdValidator();

  const {
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: {errors},
  } = useForm<ICreateAdData>({
    mode: 'onChange',
    resolver: yupResolver(adSchema),
    defaultValues: {
      tenantId: 0,
      providerId,
    },
  });

  const {
    isLoading,
    data: items,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['items', providerId],
    queryFn: ({pageParam}) =>
      itemService.getAll({
        providerId: providerId,
        skipCount: pageParam,
        formId: ItemDisplay.LIVE,
      }),

    getNextPageParam: (lastPage, allPages) => {
      let skip = 0;
      allPages.forEach(page => {
        if (page.items) {
          skip += page.items.length;
        }
      });

      if (skip < lastPage.totalRecords) {
        return skip;
      }
      return null;
    },
  });

  const {mutate: adMutate} = useMutation(
    async (data: ICreateAdData) => {
      const response = await httpUtil.uploadImage({
        file: data.imageUrl as ImageProps,
      });
      console.log('Response', response);
      data.imageUrl = response.result.data;
      return await adServices.createAd(data);
    },
    {
      onSuccess: _data => {
        Toast.show({
          type: 'success',
          text1: t(i18nKeys.advertisement.create.success) as string,
        });
        reset();
      },
      onError: error => {
        console.log((error as AxiosError).message);
        Toast.show({
          type: 'error',
          text1: t(i18nKeys.common.error) as string,
          text2: t(i18nKeys.advertisement.create.error) as string,
        });
        navigation.goBack();
        reset();
      },
    },
  );

  const getData = () => {
    let paginatedData: IItem[] = [];
    items?.pages.forEach(page => {
      paginatedData = [...paginatedData, ...page.items];
    });
    return paginatedData;
  };

  const onSubmit = (data: any) => {
    console.log('Data', data);
    adMutate(data);
  };

  const onError = (error: any) => {
    console.log('Error', error);
  };

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <KeyboardAvoidingView behavior="position">
        <TopBar title={t(i18nKeys.advertisement.create.title)} />

        <TouchableOpacity
          style={{alignItems: 'center', marginTop: 10}}
          onPress={() => {
            setVisibleChooseImg(true);
          }}>
          {watch('imageUrl') ? (
            <>
              <FastImage
                source={{
                  uri: (watch('imageUrl') as ImageProps).uri,
                }}
                style={{
                  width: width - 20,
                  height: 250,
                  borderRadius: 10,
                }}
              />
            </>
          ) : (
            <>
              <View style={styles.imageWrapper}>
                <View style={{alignItems: 'center', marginVertical: 10}}>
                  <ItemIcon.Picture />
                </View>

                <Text
                  style={{
                    textAlign: 'center',
                    color: color.primary,
                    fontSize: 20,
                  }}>
                  {t(i18nKeys.common.addImage)}
                </Text>
              </View>
            </>
          )}
        </TouchableOpacity>
        <View style={{paddingHorizontal: 10}}>
          {errors.imageUrl && (
            <Text style={{color: 'red'}}>{errors?.imageUrl.message}</Text>
          )}
        </View>

        <View style={{paddingHorizontal: 10, marginTop: 10}}>
          <Text
            style={{
              color: color.primary,
              fontWeight: '600',
              fontSize: 18,
            }}>
            {t(i18nKeys.store.createForm.description)}
          </Text>
          <TextInput
            placeholder={t(i18nKeys.store.createForm.placeholder) as string}
            onChangeText={text => {
              setValue('descriptions', text);
            }}
            textAlignVertical="top"
            multiline={true}
            style={styles.descriptionInput}
            placeholderTextColor={color.grey9}
          />
        </View>
        <View style={{paddingHorizontal: 10}}>
          {errors.descriptions && (
            <Text style={{color: 'red'}}>{errors?.descriptions.message}</Text>
          )}
        </View>

        <View style={{paddingHorizontal: 10, marginVertical: 10}}>
          <Text
            style={{
              color: color.primary,
              fontWeight: '600',
              fontSize: 18,
            }}>
            {t(i18nKeys.advertisement.create.chooseItem)}
          </Text>

          <Dropdown
            autoScroll={true}
            showsVerticalScrollIndicator={false}
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={{fontSize: 16}}
            selectedTextStyle={{fontSize: 16}}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={getData()}
            search
            maxHeight={300}
            placeholder={
              !isFocus
                ? `${t(i18nKeys.advertisement.create.chooseItem)}`
                : '...'
            }
            searchPlaceholder={`${t(i18nKeys.item.search)}...`}
            value={currentItem}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setCurrentItem(item);
              setValue('itemId', item.id);
              setValue('categoryId', item.categoryId as number);
              setValue('typeBusiness', item.type);
              setIsFocus(false);
            }}
            labelField={'name'}
            valueField={'id'}
            renderItem={item => <DropDownItem item={item} />}
            renderLeftIcon={() => (
              <IconGeneral
                type="AntDesign"
                name="Safety"
                color={isFocus ? 'blue' : 'black'}
                size={20}
              />
            )}
            flatListProps={{
              onEndReached: () => {
                const dataLength = getData().length;

                if (
                  !isLoading &&
                  items?.pages &&
                  dataLength < items?.pages[0]?.totalRecords
                ) {
                  fetchNextPage();
                }
              },
            }}
          />
        </View>
        <View style={{paddingHorizontal: 10}}>
          {errors.itemId && (
            <Text style={{color: 'red'}}>{errors?.itemId.message}</Text>
          )}
        </View>

        <View
          style={{
            marginTop: 'auto',
            backgroundColor: 'white',
            alignItems: 'center',
            paddingBottom: height * 0.02,
          }}>
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={handleSubmit(onSubmit, onError)}>
            <Text style={styles.txtBtnAdd}>
              {t(i18nKeys.advertisement.create.title)}
            </Text>
          </TouchableOpacity>
        </View>

        <ChooseImageModal
          multiple={false}
          compressImageMaxHeight={height}
          compressImageMaxWidth={width}
          visibleChooseImg={visibleChooseImg}
          setVisibleChooseImg={setVisibleChooseImg}
          setImages={(listImg: Array<ImageProps>) => {
            setValue('imageUrl', listImg[0]);
          }}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },

  imageWrapper: {
    width: width - 20,
    height: 250,
    borderStyle: 'dashed',
    borderColor: color.primary,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: 'center',
  },

  descriptionInput: {
    minHeight: 100,
    backgroundColor: color.grey7,
    borderRadius: 10,
    padding: 8,
  },

  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  btnAdd: {
    flexDirection: 'row',
    backgroundColor: color.primary,
    width: '80%',
    justifyContent: 'center',
    paddingVertical: height * 0.012,
    borderRadius: height * 0.04,
    alignItems: 'center',
  },

  txtBtnAdd: {
    paddingRight: 4,
    color: color.white,
    fontSize: 15.6,
    fontWeight: '600',
  },
});

export default CreateAdScreen;
