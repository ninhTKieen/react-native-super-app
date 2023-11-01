import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderSearch from './components/header-search';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChatStackParamList} from '@/routes/chat.route';
import IconGeneral from '@/components/common/icon-general';
import CustomerItem from './components/customer-item';
import {useQuery} from '@tanstack/react-query';
import {selectCurrentStore} from '@/features/store/store.slice';
import {useAppSelector} from '@/hooks/redux.hook';
import chatServices from '@/features/chat/chat.services';
import LoadingModal from '@/components/modals/loading-modal';

const {width} = Dimensions.get('screen');
export type Props = NativeStackScreenProps<
  ChatStackParamList,
  'SearchCustomerChatScreen'
>;

const SearchCustomerChatScreen = () => {
  const idStore = useAppSelector(selectCurrentStore);
  const [keywordSearch, setKeywordSearch] = useState<string | undefined>();
  const {isLoading, data, refetch} = useQuery({
    queryKey: ['customer', idStore, 'search'],
    queryFn: () =>
      chatServices.getListCustomer({
        providerId: idStore,
        keywordName: keywordSearch,
      }),
  });
  useEffect(() => {
    refetch();
  }, [keywordSearch, refetch]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <HeaderSearch isTextInput={true} submitSearch={setKeywordSearch} />
      <FlatList
        data={data}
        contentContainerStyle={{
          height: '100%',
        }}
        ListEmptyComponent={
          <View style={styles.containerEmpty}>
            <IconGeneral
              type="Ionicons"
              name="chatbox-ellipses-outline"
              color={'#ced4da'}
              size={width / 3.5}
            />

            <Text style={styles.txtEmpty}>Không tìm thấy người nào</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return item ? <CustomerItem customer={item} /> : null;
        }}
      />
      {isLoading && <LoadingModal />}
    </View>
  );
};

export default SearchCustomerChatScreen;
const styles = StyleSheet.create({
  txtEmpty: {
    fontSize: 16,
    color: '#adb5bd',
    fontWeight: '700',
  },
  containerEmpty: {
    height: '65%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
