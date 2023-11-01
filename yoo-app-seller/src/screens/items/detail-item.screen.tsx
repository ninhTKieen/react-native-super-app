import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Divider} from 'react-native-paper';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {useTranslation} from 'react-i18next';

import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {IItemModel} from '@/features/item/item.model';
import TopBar from '@/components/top-bar';
import RenderHTML from 'react-native-render-html';
import FastImage from 'react-native-fast-image';
import {ItemStackParamList} from '@/routes/item.route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ItemIcon} from './icon';
import {color} from '@/configs/globalStyles';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

type Props = NativeStackScreenProps<ItemStackParamList, 'ItemDetail'>;

const ItemDetailScreen = ({route}: Props): JSX.Element => {
  const {t} = useTranslation();
  const item = route.params.item;
  const [itemIndex, setItemIndex] = useState(0);
  const itemList = [
    ...item.imageUrlList.map(url => {
      return {
        imageUrl: url,
        name: null,
        currentPrice: null,
        originalPrice: null,
        stock: null,
      };
    }),
    ...(item.modelList as IItemModel[]).filter(_item => _item.imageUrl !== ''),
  ];
  const carouselRef = useRef<ICarouselInstance>(null);
  useEffect(() => {
    if (itemIndex < itemList.length) {
      carouselRef?.current?.scrollTo({index: itemIndex, animated: true});
    }
  }, [itemIndex, itemList.length]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <TopBar title={t(i18nKeys.item.create.detailItemTitle)} />
      <View style={styles.imageWrapper}>
        <Carousel
          ref={carouselRef}
          loop={false}
          data={itemList}
          scrollAnimationDuration={1000}
          width={screenWidth}
          height={screenHeight * 0.25}
          renderItem={({item: _item, index}) => (
            <View key={index} style={styles.slide}>
              <Image
                source={{uri: _item.imageUrl}}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          )}
          onSnapToItem={index => {
            setItemIndex(index);
          }}
        />

        <Divider />
        <View
          style={{
            padding: '2%',
          }}>
          <Text style={{fontSize: 12, fontWeight: '600', color: '#333'}}>
            {itemList[itemIndex]?.name
              ? itemList[itemIndex].name
              : item.modelList?.[itemIndex - item.imageUrlList.length]?.name
              ? item.modelList?.[itemIndex - item.imageUrlList.length]?.name
              : `${item.modelList?.length} ${t(
                  i18nKeys.item.detail.variationDescription,
                )}`}
          </Text>
          <FlatList
            data={item.modelList}
            keyExtractor={_item => String(_item.id)}
            renderItem={({item: _item, index}) => {
              return (
                <View style={{}}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (index === itemIndex - item.imageUrlList.length) {
                        setItemIndex(0);
                      } else {
                        setItemIndex(index + item.imageUrlList.length);
                      }
                    }}
                    key={index}>
                    {_item.imageUrl ? (
                      <FastImage
                        source={{uri: _item.imageUrl}}
                        style={[
                          styles.imgVariation,
                          {
                            borderWidth:
                              index === itemIndex - item.imageUrlList.length
                                ? 1
                                : 0,
                          },
                        ]}
                      />
                    ) : (
                      <FastImage
                        source={require('@/assets/images/no-image.jpg')}
                        style={[
                          styles.imgVariation,
                          {
                            borderWidth:
                              index === itemIndex - item.imageUrlList.length
                                ? 1
                                : 0,
                          },
                        ]}
                      />
                    )}
                  </TouchableWithoutFeedback>
                  <Text>{_item?.name}</Text>
                </View>
              );
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>
          {itemList[itemIndex]?.currentPrice
            ? itemList[itemIndex]?.currentPrice?.toLocaleString('vn-VN', {
                style: 'currency',
                currency: 'VND',
              })
            : item.minPrice === item.maxPrice
            ? item.minPrice.toLocaleString('vn-VN', {
                style: 'currency',
                currency: 'VND',
              })
            : `${item.minPrice.toLocaleString('vn-VN', {
                style: 'currency',
                currency: 'VND',
              })} - ${item.maxPrice.toLocaleString('vn-VN', {
                style: 'currency',
                currency: 'VND',
              })}`}
        </Text>

        {itemList[itemIndex]?.originalPrice ? (
          <Text
            style={{
              textDecorationLine: 'line-through',
              fontSize: 13,
              fontWeight: '400',
              color: '#adb5bd',
            }}>
            {itemList[itemIndex]?.originalPrice?.toLocaleString('vn-VN', {
              style: 'currency',
              currency: 'VND',
            })}{' '}
          </Text>
        ) : null}

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ItemIcon.Stock />
          <Text
            style={{
              fontSize: 13,
              marginVertical: 10,
              paddingLeft: 4,
              color: '#333',
              fontWeight: '400',
            }}>
            {`${t(i18nKeys.item.detail.stock)}: `}
            {itemList[itemIndex]?.stock
              ? itemList[itemIndex]?.stock
              : item.stock}
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={{fontSize: 14, marginTop: 5, fontWeight: '700'}}>
          {`${t(i18nKeys.item.detail.description)}:`}
        </Text>
        <RenderHTML
          source={{html: `${item.description}`}}
          contentWidth={screenWidth * 0.9}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageWrapper: {
    backgroundColor: '#FFFFFF',
  },

  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  name: {
    fontSize: 18,
    fontWeight: '500',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  price: {
    fontSize: 15,
    fontWeight: '500',
    color: color.primary,
    marginVertical: 5,
  },

  imgVariation: {
    width: screenWidth * 0.18,
    aspectRatio: 1,
    borderRadius: 4,
    padding: 20,
    borderColor: color.primary,
    marginRight: 10,
  },
  section: {padding: 10, backgroundColor: 'white', marginTop: '1%'},
});

export default ItemDetailScreen;
