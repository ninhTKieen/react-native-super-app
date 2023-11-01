import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import TopBar from '@/components/top-bar';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useNavigation} from '@react-navigation/native';
import {useController, useFormContext} from 'react-hook-form';
import CurrencyInput from 'react-native-currency-input';
import {IItemModel} from '@/features/item/item.model';
import {Button, Switch} from 'react-native-paper';
import {color} from '@/configs/globalStyles';
import {ItemIcon} from '@/screens/items/icon';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ChooseImageModal from '@/components/modals/choose-image-modal';
import httpUtil from '@/utils/http.util';

const {width, height} = Dimensions.get('window');

const getImageList = (srcArr: Array<IItemModel>) => {
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

const VariationTableRow = ({
  item,
  index,
  tierVariationList,
  settingModelList,
  setSettingModelList,
}: {
  item: IItemModel;
  index: number;
  tierVariationList: any;
  settingModelList: Array<IItemModel>;
  setSettingModelList: React.Dispatch<React.SetStateAction<IItemModel[]>>;
}) => {
  const handlePriceChange = (text: number) => {
    const tmp = [...settingModelList];
    tmp[index].originalPrice = text;
    tmp[index].currentPrice = text;
    setSettingModelList(tmp);
  };

  const handleStockChange = (text: string) => {
    const tmp = [...settingModelList];
    tmp[index].stock = Number(text);
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
          value={item.stock.toString()}
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

const EditVariationInfoScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {control} = useFormContext();

  const {field: modelList} = useController({
    name: 'modelList',
    control,
  });

  const {field: tierVariationList} = useController({
    name: 'tierVariationList',
    control,
  });
  const [settingModelList, setSettingModelList] = useState<Array<IItemModel>>(
    modelList.value,
  );
  const [visibleChooseImg, setVisibleChooseImg] = useState(false);
  const [curImgIndex, setCurImgIndex] = useState(0);
  const [imageVariations, setImageVariations] = useState(
    Array<{
      name: string;
      tier: number | string;
    }>,
  );
  const [imageList, setImageList] = useState(getImageList(modelList.value));
  const [isSwitchOn, setIsSwitchOn] = useState(
    modelList?.value &&
      getImageList(modelList?.value).filter(image => image !== '').length > 0
      ? true
      : false,
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
          name: tierVariationList.value?.[0]?.optionList?.[
            item.tierIndex[0]
          ] as string,
          tier: item.tierIndex[0],
        });
      }
    });
    setImageVariations(arrTmp);
  }, [settingModelList, tierVariationList.value]);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <TopBar title={t(i18nKeys.item.edit.itemVariantInfo)} />

      {tierVariationList.value.length > 0 ? (
        <>
          <View style={styles.containerSwitchHasImg}>
            <View>
              <Text style={styles.txtSwitchHasImg}>
                {t(i18nKeys.item.create.addVariation.addImageVariation)} "
                {`${tierVariationList.value?.[0]?.name}`}"
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
            <View style={{flexDirection: 'row'}}>
              <FlatList
                data={imageVariations}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View key={index} style={{marginHorizontal: 10}}>
                    {imageList?.[index] ? (
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setVisibleChooseImg(true);
                          setCurImgIndex(index);
                        }}>
                        <Image
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
                        <View
                          style={{alignItems: 'center', marginVertical: 10}}>
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
                )}
              />
            </View>
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
              <Text style={{width: '30%'}}>
                {t(i18nKeys.item.create.stock)}
              </Text>
              <Text style={{width: '30%'}}>Sku</Text>
            </View>
          </View>

          <FlatList
            data={settingModelList}
            renderItem={({item, index}) => (
              <VariationTableRow
                item={item}
                index={index}
                tierVariationList={tierVariationList.value}
                settingModelList={settingModelList}
                setSettingModelList={setSettingModelList}
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
            onPress={() => {
              navigation.goBack();
              const res = settingModelList.map(item => {
                return {
                  ...item,
                  imageUrl: isSwitchOn ? imageList[item.tierIndex[0]] : '',
                };
              });
              modelList.onChange(res);
            }}>
            {t(i18nKeys.common.save)}
          </Button>
        </>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <MCIcon
            name="emoticon-confused-outline"
            size={50}
            color={color.primary}
          />
          <Text>{t(i18nKeys.item.edit.emptyVariant)}</Text>
        </View>
      )}

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
    flex: 1,
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
});

export default EditVariationInfoScreen;
