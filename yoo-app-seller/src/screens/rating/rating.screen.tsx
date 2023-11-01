import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import TopBar from '@/components/top-bar';
import RateListStar from './components/rate-list-star';
import ButtonFilterRate from './components/button-filter-rate';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import rateService from '@/features/rate/rate.service';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStore} from '@/features/store/store.slice';
import RateItem from './components/rate-item';
import {IPageRate} from '@/features/rate/rate.model';

const RatingScreen = () => {
  const [filterStar, setFilterStar] = useState(0);
  const currentStore = useAppSelector(selectCurrentStore);
  const {data, fetchNextPage, refetch, isRefetching} = useInfiniteQuery({
    queryKey: ['allRating'],
    queryFn: ({pageParam}) =>
      rateService.getRate({
        ProviderId: currentStore,
        Type: 1,
        SkipCount: pageParam,
        Rating: filterStar === 0 ? undefined : 6 - filterStar,
      }),
    getNextPageParam: (lastPage, allPage) => {
      if (allPage) {
        const skipCount = allPage.flat().length;
        return skipCount;
      }
      return 0;
    },
  });
  const {data: countRateData} = useQuery({
    queryKey: ['rateCount'],
    queryFn: () =>
      rateService.getCountRate({
        ProviderId: currentStore,
        Type: 1,
      }),
  });
  useEffect(() => {
    refetch();
  }, [filterStar, refetch]);

  return (
    <View>
      <TopBar title="Đánh giá Shop" />
      <View
        style={{
          marginTop: '1%',
          height: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-end',
            backgroundColor: 'white',
            paddingBottom: '5%',
            paddingTop: '2%',
            paddingLeft: '3%',
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text style={styles.TotalTxtRate}>{countRateData?.ratePoint}</Text>
            <RateListStar pointStar={5} size={14} />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingLeft: '3%',
            }}>
            {['Tất cả', '5 sao', '4 sao', '3 sao', '2 sao', '1 sao'].map(
              (item, index) => {
                let countRate = 0;
                switch (index) {
                  case 0:
                    countRate = countRateData?.countRate ?? 0;
                    break;
                  case 1:
                    countRate = countRateData?.countRating?.five ?? 0;
                    break;
                  case 2:
                    countRate = countRateData?.countRating?.four ?? 0;
                    break;
                  case 3:
                    countRate = countRateData?.countRating?.three ?? 0;
                    break;
                  case 4:
                    countRate = countRateData?.countRating?.two ?? 0;
                    break;
                  case 5:
                    countRate = countRateData?.countRating?.one ?? 0;
                    break;
                  default:
                    countRate = 0;
                    break;
                }
                return (
                  <ButtonFilterRate
                    key={index}
                    title={item}
                    numberRate={countRate}
                    selected={filterStar === index}
                    setSelected={() => {
                      setFilterStar(index);
                    }}
                  />
                );
              },
            )}
          </View>
        </View>
        <FlatList
          data={
            data?.pages
              ? data?.pages.flatMap((page: IPageRate | undefined) =>
                  page?.pageData ? [...page.pageData] : [],
                )
              : []
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return item ? <RateItem data={item} /> : null;
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => {
                refetch();
              }}
            />
          }
          onEndReached={() => {
            const dataList = data?.pages
              ? data?.pages.flatMap((page: IPageRate | undefined) =>
                  page?.pageData ? [...page.pageData] : [],
                )
              : [];
            if (
              data?.pages[0] &&
              dataList.length < data.pages[0]?.totalRecord
            ) {
              fetchNextPage();
            }
          }}
        />
      </View>
    </View>
  );
};

export default RatingScreen;

const styles = StyleSheet.create({
  TotalTxtRate: {
    fontSize: 40,
    fontWeight: '600',
    color: '#707386',
  },
});
