import React, {useState, useEffect} from 'react';

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {PartnerStoreStackParamList} from '@/routes/store.route';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import ParallaxImageCustomer from '@/components/parallax-image-customer';
import TopBar from '@/components/top-bar';
import {Menu} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {shadowConstants} from '@/configs/shadowStyles';
import {useCurrentStore} from '@/hooks/useCurrentStore';
import CardInforStore from './components/card-infor-store';
import {useMutation, useQueries, useQueryClient} from '@tanstack/react-query';
import storeService from '@/features/store/store.service';
import {useModal} from 'react-native-modalfy';
import {ModalStackParamsList} from '@/components/modals';
import Toast from 'react-native-toast-message';
import {resetCurrentStore} from '@/features/store/store.slice';
import {BANNER} from './utils/constants';

import FeatureBasicCard from './components/card-feature-basic';
import OrderCard from './components/card-order';
import CardStatistic from './components/card-statistic';
import StoreListModal from './components/store-list-modal';
import CardEmptyStore from './components/card-empty-store';
import storeApi from '@/features/store/store.service';
import moment from 'moment';
import {useAppDispatch} from '@/hooks/redux.hook';
import {StoreState, FormIdUpdateState} from '@/features/store/store.model';
import {color} from '@/configs/globalStyles';

const {width, height} = Dimensions.get('screen');
type Props = NativeStackScreenProps<
  PartnerStoreStackParamList,
  'PartnerStoreMainPage'
>;

const MainPageStore = ({navigation}: Props) => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);

  const dispatch = useAppDispatch();
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const {t} = useTranslation();
  const queryClient = useQueryClient();
  const {openModal, closeModal} = useModal<ModalStackParamsList>();

  const {currentStore, currentStoreInfor, isLoading} = useCurrentStore();
  const {mutate: deleteStore} = useMutation({
    mutationFn: (id: number) => storeService.deleteProvider({id}),

    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.store.delSuccess) as string,
      });
      queryClient.refetchQueries(['providers']);
      dispatch(resetCurrentStore());
    },

    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.store.delError) as string,
      });
    },

    onSettled: () => {
      closeModal('LoadingModal');
      navigation.navigate('PartnerStoreMainPage', {});
    },
    onMutate: () => {
      openModal('LoadingModal');
    },
  });

  const {mutate: updateStateOfStore} = useMutation({
    mutationFn: ({id, state}: {id: number; state: number}) =>
      storeService.updateStateOfProvider({id, formId: state}),

    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success) as string,
        text2: t(i18nKeys.store.delSuccess) as string,
      });
      queryClient.refetchQueries(['providers']);
      queryClient.refetchQueries(['currentStoreInfo', currentStoreInfor?.id]);
    },

    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error) as string,
        text2: t(i18nKeys.store.delError) as string,
      });
    },

    onSettled: () => {
      closeModal('LoadingModal');
      navigation.navigate('PartnerStoreMainPage', {});
    },
    onMutate: () => {
      openModal('LoadingModal');
    },
  });

  const results = useQueries({
    queries: [
      {
        queryKey: ['providers'],
        queryFn: () => storeApi.getAllProviders(),
        onError: () => {
          console.log('[providers mainpage-store]');
        },
        enabled: !!currentStore,
      },
      {
        queryKey: ['CountOrders'],
        queryFn: () => storeApi.getCountOrders({providerId: currentStore}),
        onError: () => {
          console.log('[CountOrders mainpage-store]');
        },
        enabled: !!currentStore,
      },
      {
        queryKey: ['Revenue'],
        queryFn: () =>
          storeApi.getRevenue({
            providerId: currentStore,
            year: moment().toDate().getFullYear(),
            type: 1,
          }),
        onError: () => {
          console.log('[Revenue mainpage-store]');
        },
        enabled: !!currentStore,
      },
    ],
  });

  useEffect(() => {
    results[0].refetch();
    results[1].refetch();
    results[2].refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStore]);

  return (
    <View style={styles.container}>
      <TopBar
        title=""
        styleContainer={styles.headerContainer}
        left={<View />}
        center={
          currentStore || results[0].data?.length !== 0 ? (
            <TouchableOpacity
              onPress={() => {
                setVisibleModal(true);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.headerTxt}>
                {currentStoreInfor?.name && currentStore
                  ? currentStoreInfor.name
                  : t(i18nKeys.store.detail)}
              </Text>
              <Ionicons name="chevron-down-sharp" color={'#333333'} size={18} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setVisibleModal(true);
              }}>
              <Text style={styles.headerTxt}>
                {currentStoreInfor?.name && currentStore
                  ? currentStoreInfor.name
                  : t(i18nKeys.store.detail)}
              </Text>
            </TouchableOpacity>
          )
        }
        right={
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={{
              backgroundColor: '#fff',
            }}
            style={{
              minWidth: width * 0.5,
            }}
            anchor={
              <MaterialCommunityIcons
                name="dots-horizontal"
                color="#333333"
                size={20}
                onPress={openMenu}
              />
            }>
            <Menu.Item
              disabled={!currentStore}
              leadingIcon="application-edit-outline"
              onPress={() => {
                navigation.navigate('EditStoreStack', {
                  screen: 'EditMainPage',
                  params: {
                    inforStore: currentStoreInfor,
                  },
                });
                closeMenu();
              }}
              title={t(i18nKeys.store.edit)}
            />

            <Menu.Item
              disabled={!currentStore}
              leadingIcon="delete-outline"
              onPress={() => {
                Alert.alert(t(i18nKeys.store.delConfirm), '', [
                  {
                    text: t(i18nKeys.common.cancel) as string,
                  },
                  {
                    text: t(i18nKeys.common.ok) as string,
                    style: 'destructive',
                    onPress: () => {
                      closeMenu();
                      if (currentStoreInfor?.id) {
                        deleteStore(currentStoreInfor?.id);
                      }
                    },
                  },
                ]);
              }}
              title={t(i18nKeys.store.delete)}
            />

            <Menu.Item
              disabled={!currentStore}
              leadingIcon="database-eye-off-outline"
              theme={{colors: {primary: 'green'}}}
              onPress={() => {
                if (currentStoreInfor?.state === StoreState.ACTIVE) {
                  Alert.alert(t(i18nKeys.dialog.confirmTitle), '', [
                    {
                      text: t(i18nKeys.common.cancel) as string,
                    },
                    {
                      text: t(i18nKeys.common.ok) as string,
                      style: 'destructive',
                      onPress: () => {
                        updateStateOfStore({
                          id: currentStoreInfor?.id as number,
                          state: FormIdUpdateState.BLOCK,
                        });
                        closeMenu();
                      },
                    },
                  ]);
                } else {
                  updateStateOfStore({
                    id: currentStoreInfor?.id as number,
                    state: FormIdUpdateState.ACTIVATE,
                  });
                  closeMenu();
                }
              }}
              title={
                currentStoreInfor?.state === StoreState.ACTIVE
                  ? t(i18nKeys.store.suspend)
                  : t(i18nKeys.store.reactivate)
              }
            />
          </Menu>
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={
              results[0].isFetching &&
              results[1].isFetching &&
              results[2].isFetching
            }
            onRefresh={() => {
              results[0].refetch();
              results[1].refetch();
              results[2].refetch();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: '#fff',
          paddingBottom: '5%',
        }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
          }}>
          {/* {currentStoreInfor?.imageUrls && !isLoading ? ( */}
          <ParallaxImageCustomer
            data={BANNER}
            resizeMode="stretch"
            styleImg={{
              borderRadius: 8,
              height: height * 0.15,
              width: width * 0.913,
            }}
            sliderHeight={height * 0.15}
            sliderWidth={width}
            autoPlay={true}
            loop
          />
        </View>
        {currentStore ? (
          <View>
            <CardInforStore
              avatarUrl={currentStoreInfor?.imageUrls[0]}
              name={currentStoreInfor?.name}
              email={currentStoreInfor?.email}
              countRate={currentStoreInfor?.countRate}
              ratePoint={currentStoreInfor?.ratePoint}
              isLoading={isLoading}
              isSuspended={currentStoreInfor?.state === StoreState.SUSPENDED}
            />
            {currentStoreInfor?.state === StoreState.SUSPENDED && (
              <View
                style={{
                  paddingHorizontal: width * 0.04,
                  marginTop: 10,
                }}>
                <Text style={{color: color.red1}}>
                  {t(i18nKeys.store.suspendTitle)}
                </Text>
              </View>
            )}
            <OrderCard data={results[1].data} />
            <FeatureBasicCard currentStoreInfor={currentStoreInfor} />
            <CardStatistic dataChart={results[2].data} />
          </View>
        ) : (
          <CardEmptyStore onPress={() => setVisibleModal(true)} />
        )}
      </ScrollView>

      <StoreListModal
        isVisible={visibleModal}
        setVisible={setVisibleModal}
        currentStoreId={currentStore}
      />
    </View>
  );
};

export default MainPageStore;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '3%',
    paddingHorizontal: '4%',
    borderBottomWidth: 2,
    borderColor: '#dee2e6',
  },
  headerTxt: {
    fontSize: 15,
    color: '#333333',
    fontWeight: '500',
  },
  containerCard: {
    backgroundColor: 'white',
    ...shadowConstants[1],
    borderRadius: 8,
    marginHorizontal: '3%',
    marginTop: '4%',
  },
  titleCard: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontWeight: '500',
    color: '#333333',
    fontSize: 14,
  },
  txtContentCard: {
    fontSize: 13,
    fontWeight: '400',
    color: '#333333',
  },
  cardReport: {
    paddingHorizontal: '2%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: '2%',
  },
  txtRevenue: {
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    paddingVertical: '1%',
  },
  labelRevenue: {color: '#c8b1e4', fontSize: 14, fontWeight: '400'},
  containerCountOrder: {
    backgroundColor: 'white',
    ...shadowConstants[1],
    marginHorizontal: '7%',
    borderRadius: 8,
    paddingVertical: '3%',
    paddingHorizontal: '4%',
    top: '-9%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  contentCountOrder: {
    fontSize: 14,
    color: '#adb5bd',
    fontWeight: '400',
    paddingRight: '2%',
  },
});
