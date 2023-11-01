import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Button, Switch} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useController, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {routes} from '@/routes';
import CurrencyInput from 'react-native-currency-input';
import ChooseImageModal from '@/components/modals/choose-image-modal';
import TopBar from '@/components/top-bar';
import httpUtil from '@/utils/http.util';
import {ItemIcon} from '@/screens/items/icon';
import {color} from '@/configs/globalStyles';
import {
  IDefaultModelList,
  IItemTierVariation,
} from '@/features/item/item.model';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');

const getImageList = (srcArr: Array<IDefaultModelList>) => {
  let indexTmp: number;
  let arr: string[] = [];

  srcArr.forEach(item => {
    if (item.tierIndex?.[0] !== indexTmp) {
      indexTmp = item.tierIndex[0];
      arr[item.tierIndex[0]] = item.imageUrl;
    }
  });

  return arr;
};

const checkDeepEqual = (
  arr1: Array<IDefaultModelList>,
  arr2: Array<IDefaultModelList>,
) => {
  //only check tierIndex
  if (arr1.length !== arr2.length) {
    return false;
  }
  const tmpArr1 = arr1.map(item => item.tierIndex);
  const tmpArr2 = arr2.map(item => item.tierIndex);
  return _.isEqual(tmpArr1, tmpArr2);
};

const checkEmptyFields = (arr: Array<IDefaultModelList>) => {
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    if (!obj.originalPrice || !obj.stock || !obj.sku) {
      return false;
    }
  }
  return true;
};

const VariationTableRow = ({
  item,
  index,
  settingModelList,
  setSettingModelList,
}: {
  item: IDefaultModelList;
  index: number;
  settingModelList: Array<IDefaultModelList>;
  setSettingModelList: any;
}) => {
  const route = useRoute();
  const tierVariationList = (route.params as any)?.tierVariationList;

  const handlePriceChange = (text: number) => {
    const tmp = [...settingModelList];
    tmp[index].originalPrice = text;
    tmp[index].currentPrice = text;
    setSettingModelList(tmp);
  };

  const handleStockChange = (text: string) => {
    const tmp = [...settingModelList];
    tmp[index].stock = text;
    setSettingModelList(tmp);
  };

  const handleSkuChange = (text: string) => {
    const tmp = [...settingModelList];
    tmp[index].sku = text;
    setSettingModelList(tmp);
  };

  return (
    <View style={styles.tableRow}>
      <View style={{width: '30%'}}>
        <Text>
          {tierVariationList[0]?.optionList[item.tierIndex[0]]}{' '}
          {tierVariationList[1]?.optionList[item.tierIndex[1]]}
        </Text>
      </View>

      <View
        style={{
          width: '70%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CurrencyInput
          style={styles.input}
          value={item.originalPrice}
          onChangeValue={text => handlePriceChange(text as number)}
          keyboardType="numeric"
          precision={0}
        />
        <TextInput
          style={styles.input}
          value={item.stock}
          onChangeText={text => handleStockChange(text)}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          value={item.sku}
          onChangeText={text => handleSkuChange(text)}
        />
      </View>
    </View>
  );
};

const VariationInfoScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const route = useRoute();

  const defaultModelList = (route.params as any)
    ?.defaultModelList as Array<IDefaultModelList>;
  const {control} = useFormContext();
  const tierVariationList = (route.params as any)
    ?.tierVariationList as Array<IItemTierVariation>;
  const {field} = useController({
    name: 'modelList',
    control,
  });

  const [visibleChooseImg, setVisibleChooseImg] = useState(false);
  const [curImgIndex, setCurImgIndex] = useState(0);
  const [imageVariations, setImageVariations] = useState(
    Array<{
      name: string;
      tier: number | string;
    }>,
  );
  const [imageList, setImageList] = useState(
    field?.value &&
      checkDeepEqual(defaultModelList, field.value as Array<IDefaultModelList>)
      ? getImageList(field?.value)
      : [],
  );
  const [isSwitchOn, setIsSwitchOn] = useState(
    field?.value &&
      getImageList(field?.value).filter(image => image !== '').length > 0
      ? true
      : false,
  );

  const [settingModelList, setSettingModelList] = useState<
    Array<IDefaultModelList>
  >(
    field?.value &&
      checkDeepEqual(defaultModelList, field.value as Array<IDefaultModelList>)
      ? field.value
      : defaultModelList,
  );

  useEffect(() => {
    let tmp: Array<number> = [];
    let arrTmp: Array<{
      name: string;
      tier: number;
    }> = [];

    settingModelList.forEach(item => {
      if (item.tierIndex?.[0] !== tmp?.[0]) {
        tmp = item.tierIndex;
        arrTmp.push({
          name: tierVariationList?.[0]?.optionList?.[
            item.tierIndex[0]
          ] as string,
          tier: item.tierIndex[0],
        });
      }
    });
    setImageVariations(arrTmp);
  }, [settingModelList, tierVariationList]);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <TopBar title={t(i18nKeys.item.create.variationInfoTitle)} />
      <View style={styles.containerSwitchHasImg}>
        <View>
          <Text style={styles.txtSwitchHasImg}>
            {t(i18nKeys.item.create.addVariation.addImageVariation)} "
            {`${tierVariationList?.[0]?.name}`}"
          </Text>
          <Text style={styles.hintSwitchHasImg}>
            {t(i18nKeys.item.create.addVariation.addImageVariationDes)}
          </Text>
        </View>
        <Switch
          value={isSwitchOn}
          onValueChange={() => setIsSwitchOn(!isSwitchOn)}
          color={color.primary}
        />
      </View>

      {isSwitchOn && imageVariations.length > 0 && (
        <ScrollView
          style={{}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {imageVariations.map((item, index) => (
            <View key={index} style={{marginHorizontal: 10}}>
              {imageList?.[index] ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    setVisibleChooseImg(true);
                    setCurImgIndex(index);
                  }}>
                  <FastImage
                    source={{uri: imageList[index]}}
                    style={{width: 90, aspectRatio: 1}}
                  />
                </TouchableWithoutFeedback>
              ) : (
                <TouchableOpacity
                  style={styles.imageBox}
                  onPress={() => {
                    setVisibleChooseImg(true);
                    setCurImgIndex(index);
                  }}>
                  <View style={{alignItems: 'center', marginVertical: 10}}>
                    <ItemIcon.Picture />
                  </View>
                  <Text>{t(i18nKeys.common.addImage)}</Text>
                </TouchableOpacity>
              )}
              <View
                style={{
                  width: 90,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 2,
                  backgroundColor: color.primary,
                }}>
                <Text style={{color: '#fff'}}>{item.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <View style={{flexDirection: 'row', padding: 10}}>
        <View style={{width: '30%'}}>
          <Text>{t(i18nKeys.item.create.variations)}</Text>
        </View>
        <View
          style={{
            width: '70%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{width: '30%'}}>
            {t(i18nKeys.item.create.price)} (đ)
          </Text>
          <Text style={{width: '30%'}}>{t(i18nKeys.item.create.stock)}</Text>
          <Text style={{width: '30%'}}>Sku</Text>
        </View>
      </View>

      <FlatList
        data={settingModelList}
        renderItem={({item, index}) => (
          <VariationTableRow
            item={item}
            index={index}
            setSettingModelList={setSettingModelList}
            settingModelList={settingModelList}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 10}}
      />

      <Button
        mode="contained"
        style={{borderRadius: 20, margin: 20}}
        buttonColor={color.primary}
        disabled={
          (isSwitchOn && !(imageList.length > 0)) ||
          !checkEmptyFields(settingModelList)
        }
        onPress={() => {
          navigation.navigate(routes.item.create as never);
          const res = settingModelList.map(item => {
            return {
              ...item,
              imageUrl: isSwitchOn ? imageList[item.tierIndex[0]] : '',
            };
          });
          field.onChange(res);
        }}>
        {t(i18nKeys.common.save)}
      </Button>

      <ChooseImageModal
        multiple={false}
        visibleChooseImg={visibleChooseImg}
        setVisibleChooseImg={setVisibleChooseImg}
        compressImageMaxHeight={height}
        compressImageMaxWidth={width}
        setImages={(
          listImg: Array<{
            uri: string;
            width: number;
            height: number;
            type: string;
            size: number;
            name: string;
          }>,
        ) => {
          httpUtil
            .uploadImage({
              file: listImg[0],
            })
            .then(res => {
              console.log(res);
              const newImageList = [...imageList];
              newImageList[curImgIndex] = res.result.data;
              setImageList(newImageList);
            })
            .catch(err => {
              console.log('VARIATION IMG UPLOAD', err);
            });
        }}
      />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
  },

  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },

  input: {
    width: '30%',
    borderWidth: 1,
    padding: 0,
    height: 30,
    borderColor: '#eeeeee',
  },

  imageBox: {
    width: 90,
    aspectRatio: 1,
    borderColor: color.primary,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerSwitchHasImg: {
    padding: '2%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#eeeeee',
  },

  txtSwitchHasImg: {
    fontSize: 14,
    color: '#333',
    fontWeight: '400',
  },

  hintSwitchHasImg: {fontSize: 12, fontWeight: '400', color: '#adb5bd'},
});

export default VariationInfoScreen;
