import React, {useLayoutEffect} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainPageStore from './mainpage-store.screen';
import {PartnerStoreStackParamList} from '@/routes/store.route';
import ItemStack from '../items';
import {
  NavigationProp,
  RouteProp,
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useAppDispatch} from '@/hooks/redux.hook';
import {createItemActions} from '@/features/item/item.slice';
import EditStoreStack from './edit/edit-store.stack';
import CreateStoreStack from './create/create-store.stack';
import MarketingStack from '@/screens/marketing/marketing.stack';
import StatisticSaleScreen from '../statisticSale/statistic-sale.screen';
import ItemBookingStack from '../itemBooking/item-booking.stack';
import StoreDetailScreen from './store-detail.screen';
import ItemDefaultScreen from './item-default.screen';
import RatingStack from '../rating/index';
import StoreNotifyScreen from './store-notify.screen';

const Stack = createNativeStackNavigator<PartnerStoreStackParamList>();

const PartnerStoreStack = () => {
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<PartnerStoreStackParamList>>();
  const navigation =
    useNavigation<NavigationProp<PartnerStoreStackParamList>>();

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === 'PartnerStoreChatStack') {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
    // clear product in ItemStack
    if (routeName !== 'ItemStack') {
      dispatch(createItemActions.clear());
    }
  }, [route, navigation, dispatch]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'PartnerStoreMainPage'} component={MainPageStore} />
      <Stack.Screen name={'DetailStoreScreen'} component={StoreDetailScreen} />
      <Stack.Screen name={'ItemStack'} component={ItemStack} />
      <Stack.Screen name={'ItemBookingStack'} component={ItemBookingStack} />
      <Stack.Screen name={'EditStoreStack'} component={EditStoreStack} />
      <Stack.Screen name={'CreateStoreStack'} component={CreateStoreStack} />
      <Stack.Screen name={'MarketingStack'} component={MarketingStack} />
      <Stack.Screen name={'StatisticScreen'} component={StatisticSaleScreen} />
      <Stack.Screen name={'ItemDefaultScreen'} component={ItemDefaultScreen} />
      <Stack.Screen name={'RatingStack'} component={RatingStack} />
      <Stack.Screen name="PartnerStoreNotify" component={StoreNotifyScreen} />
    </Stack.Navigator>
  );
};

export default PartnerStoreStack;
