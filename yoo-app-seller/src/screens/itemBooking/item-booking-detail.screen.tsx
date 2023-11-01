import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import TopBar from '@/components/top-bar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ItemBookingStackParamList} from '@/routes/item-booking.route';
import {Divider} from 'react-native-paper';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import {IItemBookingModel} from '@/features/itemBooking/item-booking.model';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

type Props = NativeStackScreenProps<
  ItemBookingStackParamList,
  'ItemBookingDetail'
>;

const ItemBookingDetailScreen = ({route}: Props) => {
  const item = route.params.item;
  const {t} = useTranslation();

  const carouselRef = useRef<ICarouselInstance>(null);
  const [itemIndex, setItemIndex] = useState(0);

  const itemBookingList = [
    ...item.imageUrlList.map(url => {
      return {
        imageUrl: url,
        name: null,
        currentPrice: null,
        originalPrice: null,
        stock: null,
      };
    }),
    ...(item.modelList as IItemBookingModel[]).filter(
      _item => _item.imageUrl !== '',
    ),
  ];

  useEffect(() => {
    if (itemIndex < itemBookingList.length) {
      carouselRef?.current?.scrollTo({index: itemIndex, animated: true});
    }
  }, [itemIndex, itemBookingList.length]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <TopBar title={t(i18nKeys.common.detail)} />
      <Divider />
      <View style={styles.imageWrapper}>
        <Carousel
          ref={carouselRef}
          loop={false}
          data={itemBookingList}
          scrollAnimationDuration={1000}
          width={screenWidth}
          height={screenHeight * 0.25}
          renderItem={({item: _item, index}) => (
            <View key={index} style={styles.slide}>
              <FastImage
                source={{uri: _item.imageUrl as string}}
                resizeMode="contain"
                style={styles.image}
              />
            </View>
          )}
          onSnapToItem={index => {
            setItemIndex(index);
          }}
        />
      </View>
      <Text>{item.name}</Text>
    </View>
  );
};

export default ItemBookingDetailScreen;

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
