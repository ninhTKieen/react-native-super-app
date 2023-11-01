import React from 'react';
import {Text, View, FlatList, Dimensions, RefreshControl} from 'react-native';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import orderService from '@/features/order/order.service';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStore} from '@/features/store/store.slice';
import OrderItem from '../components/order-item';
import IconGeneral from '@/components/common/icon-general';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import {IOrder} from '@/features/order/order.model';

const {height} = Dimensions.get('screen');
type Props = {
  formId: number;
};

const ListOrder = ({formId = 20}: Props) => {
  const {t} = useTranslation();
  const providerId = useAppSelector(selectCurrentStore);
  const queryClient = useQueryClient();

  const {isLoading, data, fetchNextPage, isRefetching} = useInfiniteQuery({
    queryKey: ['orders', providerId, formId],
    queryFn: ({pageParam}) =>
      orderService.getAllOrder({
        providerId: providerId,
        formId: formId,
        skipCount: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      let skip = 0;
      allPages.forEach(page => {
        if (page.orders) {
          skip += page.orders.length;
        }
      });

      if (skip < lastPage.totalRecords) {
        return skip;
      }
      return null;
    },
    enabled: !!providerId,
  });

  const getData = () => {
    let paginatedData: IOrder[] = [];
    data?.pages.forEach(page => {
      paginatedData = [...paginatedData, ...page.orders];
    });
    return paginatedData;
  };

  return (
    <FlatList
      data={getData()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={() => {
            queryClient.refetchQueries(['orders']);
          }}
        />
      }
      ListEmptyComponent={
        <View
          style={{
            height: height * 0.6,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <IconGeneral
            type="FontAwesome5"
            name="shopping-basket"
            size={56}
            color={'#ced4da'}
          />
          <Text style={{fontSize: 16, fontWeight: '500', color: '#adb5bd'}}>
            {t(i18nKeys.order.noOrder)}
          </Text>
        </View>
      }
      renderItem={({item}) => {
        return <OrderItem order={item} formId={formId} />;
      }}
      onEndReached={() => {
        const dataLength = getData().length;

        if (
          !isLoading &&
          data?.pages &&
          dataLength < data?.pages[0]?.totalRecords
        ) {
          fetchNextPage();
        }
      }}
    />
  );
};

export default ListOrder;
