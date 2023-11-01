import React from 'react';
import {Text, View, FlatList, Dimensions, RefreshControl} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStore} from '@/features/store/store.slice';
import IconGeneral from '@/components/common/icon-general';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import bookingService from '@/features/booking/booking.service';
import BookingItem from './booking-item';
import {IBooking} from '@/features/booking/booking.model';

const {height} = Dimensions.get('screen');
type Props = {
  formId: number;
};

const ListBooking = ({formId = 20}: Props) => {
  const {t} = useTranslation();

  const providerId = useAppSelector(selectCurrentStore);
  const {data, isFetching, refetch, fetchNextPage, isLoading} =
    useInfiniteQuery({
      queryKey: ['booking', providerId, formId],
      queryFn: ({pageParam}) =>
        bookingService.getAllBooking({
          providerId: providerId,
          formId: formId,
          skipCount: pageParam,
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
  const getData = () => {
    let paginatedData: IBooking[] = [];
    data?.pages?.forEach(page => {
      paginatedData = [...paginatedData, ...page.items];
    });
    return paginatedData;
  };
  return (
    <FlatList
      data={getData()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isFetching} onRefresh={refetch} />
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
        return <BookingItem booking={item} formId={formId} />;
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

export default ListBooking;
