import {
  Text,
  View,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import moment from 'moment';
import MessageComponent from './components/message-component';
import HeaderBoxChat from './components/header-chat-box';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChatStackParamList} from '@/routes/chat.route';
import {faker} from '@faker-js/faker';
import {useAppSelector} from '@/hooks/redux.hook';
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import chatServices from '@/features/chat/chat.services';
import SendBox from './components/send-box';
import {selecthubSignalR} from '@/features/chat/chat.slice';
import LineDatetime from './components/line-datetime';
import {IMessage, IPageMessage} from '@/features/chat/chat.model';
import AvatarImage from '@/components/common/avatar-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import ItemMessageProduct from './components/item-message-product';
import {selectCurrentStore} from '@/features/store/store.slice';

type Props = NativeStackScreenProps<ChatStackParamList, 'ChatboxScreen'>;

const {width, height} = Dimensions.get('screen');

const ChatboxScreen = ({route}: Props) => {
  const ref_flat_list = useRef<FlatList>(null);
  const customer = route.params.customer;
  const idStore = useAppSelector(selectCurrentStore);
  const queryClient = useQueryClient();
  const hubConnection = useAppSelector(selecthubSignalR);
  const [progress, setProgress] = useState(false);
  const [sending, setSending] = useState<IPageMessage[] | undefined>([]);
  // const [replyMess, setReplyMess] = useState(null);

  const onLoadMore = () => {
    if (
      data &&
      listMessage.length < data.pages[0].totalRecords &&
      !isLoading &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const compareDate = (date1?: Date, date2?: Date) => {
    if (!date2) {
      return false;
    }
    if (!date1) {
      return true;
    }
    const d1 = moment(date1?.toString().split('T')[0]);
    const d2 = moment(date2?.toString().split('T')[0]);

    if (d1.diff(d2, 'days') === 0) {
      return true;
    }
    return false;
  };
  const showAvatar = (item: IMessage, index: number) => {
    return (
      item.side === 2 &&
      (listMessage?.[index - 1]?.side !== item.side ||
        !compareDate(
          item?.creationTime,
          listMessage?.[index - 1]?.creationTime,
        ) ||
        listMessage?.[index - 1].typeMessage === 8)
    );
  };

  const {isLoading, data, fetchNextPage, isFetchingNextPage} = useInfiniteQuery(
    {
      queryKey: ['messages', customer?.friendUserId],
      queryFn: ({pageParam}) =>
        chatServices.getMessage({
          userId: customer?.friendUserId,
          tenantId: customer?.tenantId,
          providerId: customer?.providerId,
          skipCount: pageParam,
        }),

      getNextPageParam: (lastPage, allPages) => {
        let skip = 0;
        allPages.forEach(page => {
          if (page.data) {
            skip += page.data.length;
          }
        });

        if (skip < lastPage.totalRecords) {
          return skip;
        }
        return null;
      },
    },
  );

  const listMessage = data?.pages
    ? data.pages.flatMap((page: IPageMessage) => [...page.data])
    : [];

  const sendMess = (sendMessageData: {message: string; type: number}) => {
    const mess = {
      userTenantId: customer?.friendTenantId,
      messageRepliedId: null,
      userId: customer?.friendUserId,
      providerId: customer?.providerId,
      userImageUrl: customer?.friendImageUrl,
      message: sendMessageData.message,
      typeMessage: sendMessageData.type,
    };
    queryClient.setQueryData<InfiniteData<IPageMessage>>(
      ['messages', customer?.friendUserId],
      (
        oldData: InfiniteData<IPageMessage> | undefined,
      ): InfiniteData<IPageMessage> | undefined => {
        if (oldData) {
          oldData?.pages.map((page, i) => {
            if (i === 0) {
              page.data.unshift({
                // creationTime: moment().toDate(),
                message: sendMessageData.message,
                providerId: customer?.providerId ?? 0,
                readState: 0,
                receiverReadState: 0,
                side: 1,
                targetUserId: customer?.friendUserId ?? 0,
                typeMessage: sendMessageData.type,
                userId: customer?.userId ?? 0,
                id: 0,
                sharedMessageId: '',
                targetTenantId: customer?.friendTenantId ?? 0,
              });
            }
            return page;
          });
        }

        return oldData;
      },
    );
    const newValueSending = data?.pages ? [...data.pages] : [];
    setSending(newValueSending);

    hubConnection
      .invoke('ProviderSendMessageUser', mess)
      .then((res: any) => {
        console.log('done send', res);
      })
      .catch((err: any) => console.error('Lỗi gửi tin nhắn đến cửa hàng', err));
  };
  const deleteMess = (sendMessageData: IMessage) => {
    hubConnection
      .invoke('DeleteChatMessageBusiness', sendMessageData)
      .then((res: any) => {
        console.log('[done delete mess store]', res);
      })
      .catch((err: any) => {
        console.error(err);
        Alert.alert('Thu hồi tin nhắn thất bại');
      });
  };
  useEffect(() => {
    hubConnection.on('getBusinessChatMessage', (message: IMessage) => {
      if (
        message.targetUserId === customer?.friendUserId ||
        message.userId === customer?.friendUserId
      ) {
        queryClient.setQueryData(
          ['messages', customer?.friendUserId],
          (
            oldData: InfiniteData<IPageMessage> | undefined,
          ): InfiniteData<IPageMessage> | undefined => {
            if (oldData) {
              oldData?.pages.map((page, i) => {
                if (i === 0) {
                  page.data.unshift(message);
                  page.data.forEach((el, index) => {
                    if (!el.id) {
                      page.data.splice(index, 1);
                    }
                  });
                }
                page.totalRecords += 1;
                return page;
              });
            }

            return oldData;
          },
        );
        const newValueSent = data?.pages ? [...data?.pages] : [];
        setSending(newValueSent);
        queryClient.refetchQueries(['customer', idStore]);
      }
    });
    hubConnection.on('deleteBusinessChatMessage', (message: IMessage) => {
      if (
        message.targetUserId === customer?.friendUserId ||
        message.userId === customer?.friendUserId
      ) {
        queryClient.setQueryData(
          ['messages', customer?.friendUserId],
          (
            oldData: InfiniteData<IPageMessage> | undefined,
          ): InfiniteData<IPageMessage> => {
            const newData = oldData?.pages ? [...oldData.pages] : [];
            let numDel = 0;
            newData.forEach(item => {
              item.data.forEach((el, i) => {
                if (el.id === message.id) {
                  item.data.splice(i, 1);
                  numDel++;
                }
              });
            });
            newData.forEach(item => {
              item.totalRecords -= numDel;
            });
            return {
              pageParams: oldData?.pageParams ?? [],
              pages: newData,
            };
          },
        );
        const newValueDelete = data?.pages ? [...data?.pages] : [];
        setSending(newValueDelete);
        queryClient.refetchQueries(['customer', idStore]);
      }
    });
    return () => {
      hubConnection.off('getBusinessChatMessage');
      hubConnection.off('deleteBusinessChatMessage');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    return () => {
      queryClient.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{flex: 1}} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <HeaderBoxChat
          avatarUrl={customer?.friendImageUrl}
          name={customer?.friendName}
          isOnline={customer?.isOnline}
        />
        <FlatList
          ref={ref_flat_list}
          inverted
          ListFooterComponent={
            <View>{isLoading ? <ActivityIndicator /> : <View />}</View>
          }
          onEndReached={onLoadMore}
          style={{
            backgroundColor: '#eeeeee',
          }}
          // data={listMessage}
          data={
            data?.pages
              ? data.pages.flatMap((page: IPageMessage) => [...page.data])
              : []
          }
          contentContainerStyle={{
            paddingVertical: 10,
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => {
            if (!item.id) {
              return faker.datatype.uuid();
            }
            return item.id.toString();
          }}
          renderItem={({item, index}) => {
            return item.typeMessage === 8 ? (
              <ItemMessageProduct item={item} />
            ) : (
              <View>
                {compareDate(
                  item?.creationTime,
                  listMessage?.[index + 1]?.creationTime,
                ) ? null : (
                  <LineDatetime time={item?.creationTime} />
                )}
                <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                  {showAvatar(item, index) ? (
                    <AvatarImage
                      source={{uri: customer?.friendImageUrl}}
                      size={28}
                    />
                  ) : (
                    <View style={{width: 28, height: 28}} />
                  )}

                  <MessageComponent
                    // {...props}
                    mess={item}
                    emotionDisable={false}
                    // setReplyMess={setReplyMess}
                    deleteMess={deleteMess}
                  />
                </View>
              </View>
            );
          }}
        />
        {/* {replyMess ? (
        <View style={styles.pinContainer}>
          <View style={styles.pinContent}>
            {replyMess.typeMessage === 2 ? (
              <FastImage
                style={{
                  width: width / 9,
                  height: width / 9,
                }}
                source={{uri: replyMess.message}}
              />
            ) : null}
            <View>
              <Text style={{fontWeight: '500', fontSize: 14, color: '#333333'}}>
                {replyMess?.targetUserId !== userId
                  ? 'Tôi'
                  : customer?.friendName}
              </Text>
              <Text
                style={{fontWeight: '300', fontSize: 12, color: '#6c757d'}}
                numberOfLines={1}>
                {replyMess.typeMessage === 2 || replyMess.typeMessage === 5
                  ? '[Hình ảnh]'
                  : replyMess.message}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setReplyMess(null);
            }}>
            <MaterialCommunityIcons name="close" size={28} color={'#adb5bd'} />
          </TouchableOpacity>
        </View>
      ) : null} */}

        <SendBox
          scrollTopWhenSend={() => {
            ref_flat_list.current?.scrollToOffset({animated: true, offset: 0});
          }}
          sendMess={sendMess}
          setProgress={setProgress}
        />
        {progress && (
          <View
            style={{
              backgroundColor: 'black',
              opacity: 0.5,
              position: 'absolute',
              height: height,
              width: width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} />
            <Text style={{fontWeight: '500', color: '#fff'}}>Đang tải lên</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatboxScreen;
