import React from 'react';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import itemService from '@/features/item/item.service';
import {SafeAreaView, FlatList, RefreshControl, View, Text} from 'react-native';
import ListItemRow from './list-item-row';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectedSearchQuery} from '@/features/order/order.slice';
import {selectCurrentStore} from '@/features/store/store.slice';
import {IItem} from '@/features/item/item.model';
import LoadingListItemRow from './loading-list-item-row';
import IconGeneral from '@/components/common/icon-general';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';

const ListItem = ({
  status,
  filter,
}: {
  status: number;
  filter?: {
    orderBy: number | undefined;
  };
}): JSX.Element => {
  const providerId = useAppSelector(selectCurrentStore);
  const searchQuery = useAppSelector(selectedSearchQuery);
  const queryClient = useQueryClient();
  const {t} = useTranslation();

  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['items', status, filter, searchQuery, providerId],
    queryFn: ({pageParam}) =>
      itemService.getAll({
        providerId: providerId,
        skipCount: pageParam,
        formId: status,
        search: searchQuery,
        ...filter,
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
    let paginatedData: IItem[] = [];
    data?.pages.forEach(page => {
      paginatedData = [...paginatedData, ...page.items];
    });
    return paginatedData;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={getData()}
        renderItem={({item}) => <ListItemRow item={item} />}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={isFetching ? <LoadingListItemRow /> : null}
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
            refreshing={isRefetching}
            onRefresh={() => {
              queryClient.refetchQueries(['items', status]);
              // refetch();
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
      {/* {isLoading && <LoadingListItemRow />} */}
    </SafeAreaView>
  );
};

export default ListItem;
