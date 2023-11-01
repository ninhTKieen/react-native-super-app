import React from 'react';
import {Text, View, Dimensions} from 'react-native';

import TopBar from '@/components/top-bar';
import IconGeneral from '@/components/common/icon-general';
import PendingOrderTab from './tabs/pending-order.tab';
import ToShipOrderTab from './tabs/to-ship-order.tab';
import ShippingOrderTab from './tabs/shipping-order.tab';
import CompleteOrderTab from './tabs/complete-order.tab';
import CancelOrderTab from './tabs/cancel-order.tab';
import RefundOrderTab from './tabs/refund-order.tab';
import {useTranslation} from 'react-i18next';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {OrderTabParamList} from '@/routes/order.route';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {OrderFormId} from '@/features/order/order.model';

const Tab = createMaterialTopTabNavigator<OrderTabParamList>();

const {width} = Dimensions.get('screen');

const TabLabel = ({
  focused,
  children,
}: {
  focused: boolean;
  color: string;
  children: string;
}) => {
  const {t} = useTranslation();

  const title = () => {
    switch (children) {
      case 'PendingOrder':
        return t(i18nKeys.order.pending);
      case 'ToShipOrder':
        return t(i18nKeys.order.toShip.title);
      case 'ShippingOrder':
        return t(i18nKeys.order.shipping);
      case 'CompleteOrder':
        return t(i18nKeys.order.complete);
      case 'CancelOrder':
        return t(i18nKeys.order.cancel.title);
      case 'RefundOrder':
        return t(i18nKeys.order.refund);
      default:
        return t(i18nKeys.order.updating);
    }
  };
  return (
    <Text
      style={{
        color: focused ? '#0077b6' : '#6c757d',
        fontSize: 14,
        fontWeight: focused ? '700' : '400',
        textAlign: 'center',
        paddingHorizontal: 10,
        minWidth: width * 0.3,
      }}>
      {title()}
    </Text>
  );
};

const ListOrderScreen = () => {
  const {t} = useTranslation();
  return (
    <View style={{flex: 1}}>
      <TopBar
        title={t(i18nKeys.order.title)}
        right={
          <IconGeneral
            name={'search'}
            type="Fontisto"
            color={'#333'}
            size={22}
          />
        }
      />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: {
            backgroundColor: '#0077b6',
          },
          tabBarStyle: {
            borderBottomWidth: 0.3,
            borderColor: '#ced4da',
          },
          tabBarItemStyle: {
            width: 'auto',
          },
          tabBarPressColor: 'transparent',
          tabBarLabel: TabLabel,
        }}>
        <Tab.Screen
          name="PendingOrder"
          component={PendingOrderTab}
          initialParams={{formId: OrderFormId.WAITING}}
        />
        <Tab.Screen name="ToShipOrder" component={ToShipOrderTab} />
        <Tab.Screen
          name="ShippingOrder"
          component={ShippingOrderTab}
          initialParams={{formId: OrderFormId.SHIPPING}}
        />
        <Tab.Screen
          name="CompleteOrder"
          component={CompleteOrderTab}
          initialParams={{formId: OrderFormId.COMPLETED}}
        />
        <Tab.Screen
          name="CancelOrder"
          component={CancelOrderTab}
          initialParams={{formId: OrderFormId.CANCELLATION_GET_ALL}}
        />
        <Tab.Screen
          name="RefundOrder"
          component={RefundOrderTab}
          initialParams={{formId: OrderFormId.RETURN_REFUND}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default ListOrderScreen;
