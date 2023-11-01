import React from 'react';

import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {ItemBookingListStackParamList} from '@/routes/item-booking.route';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {useRoute, RouteProp} from '@react-navigation/native';
import {IItemBooking} from '@/features/itemBooking/item-booking.model';
import IconGeneral from '@/components/common/icon-general';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStore} from '@/features/store/store.slice';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import LoadingListItemRow from '@/screens/items/components/loading-list-item-row';
import ListItemBookingRow from '@/screens/itemBooking/components/list-item-booking-row';
import itemBookingService from '@/features/itemBooking/item-booking.service';

type ItemListBookingScreenRouteProp = RouteProp<
  ItemBookingListStackParamList,
  'Available'
>;

const ListItemBooking = () => {
  const route = useRoute<ItemListBookingScreenRouteProp>();
  const status = route.params.status;
  const providerId = useAppSelector(selectCurrentStore);
  const queryClient = useQueryClient();
  const {t} = useTranslation();
  const {isLoading, data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    {
      queryKey: ['itembooking', status],
      queryFn: ({pageParam}) =>
        itemBookingService.getAll({
          providerId: providerId,
          skipCount: pageParam,
          formId: status,
          isItemBooking: true,
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
    },
  );
  const getData = () => {
    let paginatedData: IItemBooking[] = [];
    data?.pages.forEach(page => {
      paginatedData = [...paginatedData, ...page.items];
    });
    return paginatedData;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getData()}
        renderItem={({item}) => <ListItemBookingRow item={item} />}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isFetchingNextPage ? <LoadingListItemRow /> : null}
        ListEmptyComponent={
          isLoading ? null : (
            <View
              style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconGeneral
                name="inbox"
                type="FontAwesome5"
                color={'#ced4da'}
                size={56}
              />
              <Text style={{color: '#adb5bd', fontSize: 18, fontWeight: '500'}}>
                {t(i18nKeys.item.noProduct)}
              </Text>
            </View>
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              queryClient.refetchQueries(['itembooking']);
            }}
          />
        }
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
      {isLoading && <LoadingListItemRow />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ListItemBooking;
