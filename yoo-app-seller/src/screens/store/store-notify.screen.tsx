import React, {useState} from 'react';

import {
  Alert,
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Surface, TouchableRipple} from 'react-native-paper';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import TopBar from '@/components/top-bar';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {color} from '@/configs/globalStyles';
import {PartnerStoreStackParamList} from '@/routes/store.route';
import IconGeneral from '@/components/common/icon-general';
import notifyServices from '@/features/notify/notify.service';
import {
  INotifyItem,
  NotifyState,
  UserAction,
} from '@/features/notify/notify.model';
import {OrderFormId} from '@/features/order/order.model';
import NotifyActions from './components/notify-actions';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import {useAppSelector} from '@/hooks/redux.hook';
import {selectCurrentStore} from '@/features/store/store.slice';

const NotifyRow = ({
  item,
  onPress,
}: {
  item: INotifyItem;
  onPress: () => void;
}) => {
  const [isVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableRipple
        onPress={onPress}
        onLongPress={() => {
          setModalVisible(true);
        }}>
        <Surface
          style={[
            styles.notifyRow,
            {
              backgroundColor:
                item.state === NotifyState.READ ? color.white : color.grey1,
            },
          ]}>
          <Avatar.Image
            source={
              JSON.parse(item.data).ImageUrl
                ? {uri: JSON.parse(item.data).ImageUrl}
                : require('@/assets/common/no-image.jpg')
            }
          />
          <View style={{width: '70%', marginHorizontal: 10}}>
            <Text>{item.notificationName}</Text>
            <Text style={{marginTop: 5, fontSize: 12}}>
              {JSON.parse(item.data).Message}
            </Text>
            <Text style={{marginTop: 5, fontSize: 11}}>
              {moment(item.creationTime).format('H:mm:ss')}
            </Text>
          </View>

          <IconGeneral
            type="MaterialCommunityIcons"
            name="dots-horizontal"
            size={20}
            onPress={() => {
              setModalVisible(true);
            }}
          />
        </Surface>
      </TouchableRipple>

      <NotifyActions
        isVisible={isVisible}
        setModalVisible={setModalVisible}
        notifyItem={item}
      />
    </>
  );
};

const StoreNotifyScreen = (): JSX.Element => {
  const queryClient = useQueryClient();
  const navigation =
    useNavigation<NavigationProp<PartnerStoreStackParamList>>();
  const {t} = useTranslation();
  const providerId = useAppSelector(selectCurrentStore);

  const {
    data: notifications,
    isRefetching,
    fetchNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['notify', providerId],
    queryFn: ({pageParam}) =>
      notifyServices.getAllNotify({
        skipCount: pageParam,
        providerId: providerId,
      }),

    getNextPageParam: (lastPage, allPages) => {
      let skip = 0;
      allPages.forEach(page => {
        if (page.items) {
          skip += page.items.length;
        }
      });

      if (skip < lastPage.totalCount) {
        return skip;
      }

      return null;
    },
  });

  const {mutate: markAsRead} = useMutation(
    (notifyId: string) => notifyServices.markAsRead(notifyId),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['notify']);
      },
      onError: () => {
        console.log('[NotifyActions] markAsRead error');
      },
    },
  );

  const {mutate: markAsAllRead} = useMutation(
    () => notifyServices.markAllAsRead(),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['notify']);
      },
      onError: () => {
        console.log('[NotifyActions] markAsAllRead error');
        Toast.show({
          type: 'error',
          text1: `${t(i18nKeys.common.errorMessage)}`,
        });
      },
    },
  );

  const {mutate: deleteAllNotify} = useMutation(
    () => notifyServices.deleteAllNotify(),
    {
      onSuccess: () => {
        queryClient.refetchQueries(['notify']);
      },
      onError: () => {
        console.log('[NotifyActions] deleteAllRead error');
        Toast.show({
          type: 'error',
          text1: `${t(i18nKeys.common.errorMessage)}`,
        });
      },
    },
  );

  const onPress = (item: INotifyItem) => {
    if (JSON.parse(item.data).Action === UserAction.CREATE_ORDER_SUCCESS) {
      navigation.navigate('Order', {
        screen: 'ListOrderScreen',
        params: {
          screen: 'PendingOrder',
          params: {
            formId: OrderFormId.WAITING,
          },
        },
      });
    } else if (
      JSON.parse(item.data).Action === UserAction.CANCEL ||
      JSON.parse(item.data).Action === UserAction.REQ_CANCEL
    ) {
      navigation.navigate('Order', {
        screen: 'ListOrderScreen',
        params: {
          screen: 'CancelOrder',
          params: {
            formId: OrderFormId.CANCELLATION_GET_ALL,
          },
        },
      });
    }

    if (item.state !== NotifyState.READ) {
      markAsRead(item.id);
    }
  };

  const getData = () => {
    let paginatedData: INotifyItem[] = [];
    notifications?.pages?.forEach(page => {
      paginatedData = [...paginatedData, ...page.items];
    });
    return paginatedData;
  };

  return (
    <View style={styles.container}>
      <TopBar title={t(i18nKeys.notify.title)} />

      <View
        style={{flexDirection: 'row', padding: 10, justifyContent: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => {
            markAsAllRead();
          }}>
          <IconGeneral
            name={'shield-checkmark-outline'}
            size={30}
            type="Ionicons"
            color={color.green1}
            style={{marginHorizontal: 15}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(t(i18nKeys.notify.actions.clearAllConfirm), '', [
              {
                text: t(i18nKeys.dialog.cancel) as string,
              },
              {
                style: 'destructive',
                text: t(i18nKeys.dialog.confirm) as string,
                onPress: () => {
                  deleteAllNotify();
                },
              },
            ]);
          }}>
          <IconGeneral
            name="trash-outline"
            size={30}
            type="Ionicons"
            color={color.red}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={() => {
              queryClient.refetchQueries(['notify']);
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        data={getData()}
        renderItem={({item}) => (
          <NotifyRow
            item={item}
            onPress={() => {
              onPress(item);
            }}
          />
        )}
        keyExtractor={item => String(item.id)}
        onEndReached={() => {
          const dataLength = getData().length;

          if (
            !isLoading &&
            notifications?.pages &&
            dataLength < notifications?.pages[0]?.totalCount
          ) {
            fetchNextPage();
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },

  notifyRow: {
    flexDirection: 'row',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    backgroundColor: color.white,
    justifyContent: 'space-between',
  },
});

export default StoreNotifyScreen;
