import React from 'react';
import {MarketingStackParamList} from '@/routes/marketing.route';
import MarketingMainPageScreen from './marketing-main-page.screen';
import PromotionStack from './promotions/promotion.stack';
import AdvertisementStack from './advertisements/ads.stack';
import FlashSaleStack from './flash-sale/flash-sale.stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VoucherStack from './vouchers/voucher.stack';

const Stack = createNativeStackNavigator<MarketingStackParamList>();

const MarketingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MarketingMainPage"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="MarketingMainPage"
        component={MarketingMainPageScreen}
      />
      <Stack.Screen name="VoucherStack" component={VoucherStack} />
      <Stack.Screen name="PromotionStack" component={PromotionStack} />
      <Stack.Screen name="AdvertisementStack" component={AdvertisementStack} />
      <Stack.Screen name="FlashSaleStack" component={FlashSaleStack} />
    </Stack.Navigator>
  );
};

export default MarketingStack;
