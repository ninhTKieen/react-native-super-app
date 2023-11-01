import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {RouteProp, useRoute} from '@react-navigation/native';
import {PartnerStoreStackParamList} from '@/routes/store.route';
import itemService from '@/features/item/item.service';
import TopBar from '@/components/top-bar';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import IconGeneral from '@/components/common/icon-general';
const {width, height} = Dimensions.get('screen');
const ItemDefaultScreen = () => {
  const route =
    useRoute<RouteProp<PartnerStoreStackParamList, 'ItemDefaultScreen'>>();
  const storeInfor = route.params.storeInfor;
  const {data, isLoading} = useQuery({
    queryKey: ['ItemDefault', storeInfor.id],
    queryFn: () =>
      itemService.getAll({
        providerId: route.params.storeInfor.id,
        formId: 10,
        orderBy: 1,
        IsItemBooking: true,
      }),
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <TopBar title="Sản phẩm" />
      {data?.items[0] && (
        <View
          style={{
            flex: 1,
          }}>
          <Carousel
            // ref={carouselRef}
            loop={false}
            data={data?.items[0].imageUrlList ?? []}
            scrollAnimationDuration={1000}
            width={width}
            height={height * 0.25}
            renderItem={({item: _item, index}) => (
              <View key={index} style={styles.slide}>
                <FastImage
                  source={{uri: _item}}
                  resizeMode="cover"
                  style={styles.image}
                />
              </View>
            )}
            // onSnapToItem={index => {
            //   setItemIndex(index);
            // }}
          />
          <View
            style={{
              backgroundColor: 'white',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              marginTop: 10,
              flex: 1,
              paddingHorizontal: '4%',
              paddingVertical: '2%',
            }}>
            <Text
              style={{
                color: '#339FD9',
                fontSize: 20,
                fontWeight: '600',
              }}>
              {data?.items[0].name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 5,
              }}>
              <IconGeneral
                type="Ionicons"
                name="location-sharp"
                color={'#78B7EE'}
                size={20}
              />

              <Text
                style={{
                  color: '#707386',
                  fontSize: 16,
                  fontWeight: '500',
                  paddingLeft: 4,
                }}
                numberOfLines={2}>
                {storeInfor.address}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 5,
              }}>
              <IconGeneral
                type="Ionicons"
                name="call"
                color={'#78B7EE'}
                size={18}
              />

              <Text
                style={{
                  color: '#707386',
                  fontSize: 16,
                  fontWeight: '500',
                  paddingLeft: 4,
                }}>
                {storeInfor.phoneNumber}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: '500',
                    color: '#707386',
                  }}>
                  Đánh giá:{' '}
                  <IconGeneral
                    name="star"
                    type="Ionicons"
                    size={16}
                    color={'#FFD066'}
                  />
                  <Text
                    style={{
                      color: '#78B7EE',
                    }}>{` ${data?.items[0].ratePoint.toFixed(1)} `}</Text>
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#B0DAFF',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 8,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontWeight: '600',
                  }}>
                  {data?.items[0].minPrice === data?.items[0].maxPrice
                    ? data?.items[0].minPrice.toLocaleString('vn-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })
                    : `${data?.items[0].minPrice.toLocaleString('vn-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}-${data?.items[0].minPrice.toLocaleString('vn-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}`}
                </Text>
              </View>
            </View>
            {data?.items[0].description && (
              <Text
                style={{
                  paddingVertical: '2%',
                }}>
                Mô tả: {data?.items[0].description}
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default ItemDefaultScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
});
