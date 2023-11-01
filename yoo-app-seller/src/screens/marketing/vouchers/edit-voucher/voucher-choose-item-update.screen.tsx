import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TopBar from '@/components/top-bar';
import {Button, Searchbar} from 'react-native-paper';
import {useController, useForm, useFormContext} from 'react-hook-form';
import itemService from '@/features/item/item.service';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStore} from '@/features/store/store.slice';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import IconGeneral from '@/components/common/icon-general';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import {color} from '@/configs/globalStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {UpdateVoucherStackParamList} from '@/routes/marketing.route';
const {width} = Dimensions.get('screen');
type Props = NativeStackScreenProps<
  UpdateVoucherStackParamList,
  'UpdateChooseItem'
>;
const VoucherChooseItemUpdateScreen = ({navigation}: Props) => {
  const {control} = useFormContext();
  const {field} = useController({
    name: 'listItems',
    control,
  });
  const [textSearch, setTextSearch] = useState('');
  const [listChoose, setListChoose] = useState(field.value ?? []);
  const providerId = useAppSelector(selectCurrentStore);
  const queryClient = useQueryClient();
  const {t} = useTranslation();
  const {
    isLoading,
    data,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    isFetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['chooseItemVoucherUpdate', providerId],
    queryFn: ({pageParam}) =>
      itemService.getAll({
        providerId: providerId,
        skipCount: pageParam,
        formId: 11,
        search: textSearch,
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <TopBar title="Thêm sản phẩm" />
      <Searchbar
        placeholder="Nhập từ khóa sản phẩm"
        onChangeText={text => {
          setTextSearch(text);
        }}
        value={textSearch}
        inputStyle={{
          minHeight: '7%',
        }}
        style={{
          borderRadius: 8,
          marginHorizontal: '4%',
          paddingTop: 0,
        }}
        onEndEditing={() => {
          refetch();
        }}
        onClearIconPress={() => {
          setTextSearch('');
          refetch();
        }}
      />
      <FlatList
        data={data?.pages ? data.pages.flatMap(page => [...page.items]) : []}
        renderItem={({item}) => (
          <TouchableOpacity
            disabled={true}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: '4%',
              paddingTop: '4%',
              opacity: 0.7,
            }}
            onPress={() => {
              if (listChoose.includes(item.id)) {
                setListChoose(
                  listChoose.filter((el: number) => el !== item.id),
                );
              } else {
                setListChoose([...listChoose, item.id]);
              }
            }}>
            <IconGeneral
              type="Ionicons"
              name={
                listChoose.includes(item.id) ? 'checkbox' : 'square-outline'
              }
              size={24}
              color={listChoose.includes(item.id) ? '#0096c7' : '#333'}
            />

            <FastImage
              source={{
                uri: item.imageUrlList[0],
              }}
              style={styles.image}
            />
            <View
              style={{
                justifyContent: 'space-between',
                paddingLeft: '2%',
              }}>
              <Text>{item.name}</Text>
              <Text style={styles.price}>
                {Intl.NumberFormat('vi', {
                  style: 'currency',
                  currency: 'VND',
                }).format(item.minPrice ? item.minPrice : 0)}
              </Text>
              <Text style={styles.quantity}>{`${t(i18nKeys.item.quantity)}: ${
                item.stock
              }`}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
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
              refetch();
            }}
          />
        }
        onEndReached={() => {
          const dt = data?.pages
            ? data.pages.flatMap(page => [...page.items])
            : [];
          const dataLength = dt.length;

          if (
            !isLoading &&
            data?.pages &&
            dataLength < data?.pages[0]?.totalRecords
          ) {
            fetchNextPage();
          }
        }}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          paddingHorizontal: '4%',
          paddingVertical: '2%',
        }}>
        <Text>{listChoose.length} đã chọn</Text>
        {/* <Button
          mode="contained"
          buttonColor="#339FD9"
          style={{
            borderRadius: 8,
          }}
          labelStyle={{
            fontWeight: '500',
          }}
          onPress={() => {
            field.onChange(listChoose);
            navigation.goBack();
          }}>
          Thêm
        </Button> */}
      </View>
    </View>
  );
};

export default VoucherChooseItemUpdateScreen;

const styles = StyleSheet.create({
  image: {
    height: width * 0.18,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#ced4da',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '2%',
  },
  price: {
    color: color.primary,
    fontSize: 15,
    marginTop: '2%',
  },
  quantity: {
    fontSize: 13,
    fontWeight: '400',
    marginLeft: 5,
    color: '#6c757d',
  },
});
