import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import ImageCustomer from '@/components/common/image-customer';
import MoneyIcon from '../../../assets/statistic/money-sales.svg';
import SellIcon from '../../../assets/statistic/sell.svg';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';

const {width, height} = Dimensions.get('screen');

const ItemRankingList = ({data}: {data: any[]}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      {data?.map((item, index) => {
        const itemDto =
          item.itemDto && JSON.parse(item.itemDto)
            ? JSON.parse(item.itemDto)
            : null;
        return item.itemDto && item.itemDto !== 'null' ? (
          <View key={index} style={styles.itemRow}>
            <ImageCustomer
              source={{
                uri: itemDto.ImageUrlList ? itemDto.ImageUrlList[0] : '',
              }}
              widthImg={width * 0.2}
              heightImg={width * 0.2}
              style={{
                width: width * 0.2,
                aspectRatio: 1,
                borderRadius: 10,
              }}
            />
            <View
              style={{
                paddingLeft: width * 0.04,
                justifyContent: 'space-around',
              }}>
              <Text
                style={{
                  color: '#878A9C',
                  fontSize: 16,
                  fontWeight: '600',
                }}
                numberOfLines={1}>
                {itemDto?.Name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MoneyIcon />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    paddingLeft: 4,
                    color: '#878A9C',
                  }}>
                  {t(i18nKeys.statistic.sales.name)}:{' '}
                  <Text
                    style={{
                      color: '#75A3C7',
                    }}>
                    {Intl.NumberFormat('vi', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(item?.sales ? item?.sales : 0)}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <SellIcon />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    paddingLeft: 4,
                    color: '#878A9C',
                  }}>
                  {t(i18nKeys.statistic.sales.totalSales)}:{' '}
                  <Text
                    style={{
                      color: '#75A3C7',
                    }}>
                    {item?.count}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        ) : null;
      })}
    </View>
  );
};

export default ItemRankingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  itemRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F2F8',
    paddingVertical: height * 0.035,
    paddingHorizontal: width * 0.04,
  },
});
