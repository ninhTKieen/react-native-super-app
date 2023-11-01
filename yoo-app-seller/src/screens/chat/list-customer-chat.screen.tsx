import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChatStackParamList} from '@/routes/chat.route';
import HeaderSearch from './components/header-search';
import chatServices from '@/features/chat/chat.services';
import CustomerItem, {LoadingCustomerItem} from './components/customer-item';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStore} from '@/features/store/store.slice';
import {selecthubSignalR} from '@/features/chat/chat.slice';
import {IMessage} from '@/features/chat/chat.model';

const {width, height} = Dimensions.get('screen');
export type Props = NativeStackScreenProps<
  ChatStackParamList,
  'ListCustomerChatScreen'
>;
const ListCustomerChatScreen = () => {
  const idStore = useAppSelector(selectCurrentStore);
  const {isLoading, data, refetch, isRefetching} = useQuery({
    queryKey: ['customer', idStore],
    queryFn: () => chatServices.getListCustomer({providerId: idStore}),
  });
  const hubConnection = useAppSelector(selecthubSignalR);
  useEffect(() => {
    hubConnection.on('getBusinessChatMessage', (message: IMessage) => {
      refetch();
    });
    hubConnection.on('deleteBusinessChatMessage', (message: IMessage) => {
      refetch();
    });
    return () => {
      hubConnection.off('getBusinessChatMessage');
      hubConnection.off('deleteBusinessChatMessage');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <HeaderSearch />
      {isLoading ? (
        <FlatList
          data={Array.from(Array(10).keys())}
          showsVerticalScrollIndicator={false}
          renderItem={() => {
            return <LoadingCustomerItem />;
          }}
        />
      ) : (
        <FlatList
          data={data}
          contentContainerStyle={{
            // height: '100%',
            paddingBottom: height * 0.1,
          }}
          ListEmptyComponent={
            <View style={styles.containerEmpty}>
              <Ionicons
                name="chatbox-ellipses-outline"
                color={'#ced4da'}
                size={width / 3.5}
              />

              <Text style={styles.txtEmpty}>Chưa có tin nhắn nào</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return item ? <CustomerItem customer={item} /> : null;
          }}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        />
      )}
    </View>
  );
};

export default ListCustomerChatScreen;

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
