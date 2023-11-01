import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ListItem from '../components/list-item';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {ItemTabParamList} from '@/routes/item.route';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import IconGeneral from '@/components/common/icon-general';
import {ItemSorted} from '@/features/item/item.model';
import {color} from '@/configs/globalStyles';

const StockingTab = () => {
  const {t} = useTranslation();
  const route = useRoute<RouteProp<ItemTabParamList>>();
  const status = route.params.status;
  const [filter, setFilter] = React.useState<{
    orderBy: number | undefined;
  }>({
    orderBy: ItemSorted.LATEST,
  });

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: 'white',
          paddingVertical: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            setFilter({
              orderBy: ItemSorted.LATEST,
            });
          }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '500',
              color:
                filter.orderBy === ItemSorted.LATEST
                  ? color.primary
                  : '#6c757d',
            }}>
            {t(i18nKeys.item.status.default)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFilter({
              orderBy: undefined,
            });
          }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '500',
              color: filter.orderBy === undefined ? color.primary : '#6c757d',
            }}>
            {t(i18nKeys.item.status.oldest)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            if (filter.orderBy !== ItemSorted.STOCK_DESC) {
              setFilter({
                orderBy: ItemSorted.STOCK_DESC,
              });
            } else {
              setFilter({orderBy: ItemSorted.STOCK_ASC});
            }
          }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '500',
              color:
                filter.orderBy === ItemSorted.STOCK_ASC ||
                filter.orderBy === ItemSorted.STOCK_DESC
                  ? color.primary
                  : '#6c757d',
            }}>
            {t(i18nKeys.item.quantity)}
          </Text>
          <IconGeneral
            name={
              filter.orderBy !== ItemSorted.STOCK_ASC &&
              filter.orderBy !== ItemSorted.STOCK_DESC
                ? 'swap-vertical'
                : filter.orderBy === ItemSorted.STOCK_ASC
                ? 'arrow-up'
                : 'arrow-down'
            }
            type={'Ionicons'}
            color={
              filter.orderBy === ItemSorted.STOCK_ASC ||
              filter.orderBy === ItemSorted.STOCK_DESC
                ? color.primary
                : '#6c757d'
            }
            size={16}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            if (filter.orderBy !== ItemSorted.PRICE_DESC) {
              setFilter({
                orderBy: ItemSorted.PRICE_DESC,
              });
            } else {
              setFilter({orderBy: ItemSorted.PRICE_ASC});
            }
          }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '500',
              color:
                filter.orderBy === ItemSorted.PRICE_ASC ||
                filter.orderBy === ItemSorted.PRICE_DESC
                  ? color.primary
                  : '#6c757d',
            }}>
            {t(i18nKeys.item.create.price)}
          </Text>
          <IconGeneral
            name={
              filter.orderBy !== ItemSorted.PRICE_ASC &&
              filter.orderBy !== ItemSorted.PRICE_DESC
                ? 'swap-vertical'
                : filter.orderBy === ItemSorted.PRICE_ASC
                ? 'arrow-up'
                : 'arrow-down'
            }
            type={'Ionicons'}
            color={
              filter.orderBy === ItemSorted.PRICE_ASC ||
              filter.orderBy === ItemSorted.PRICE_DESC
                ? color.primary
                : '#6c757d'
            }
            size={16}
          />
        </TouchableOpacity>
      </View>
      <ListItem status={status} filter={filter} />
    </View>
  );
};

export default StockingTab;
