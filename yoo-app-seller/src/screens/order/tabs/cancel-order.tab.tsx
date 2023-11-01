import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CancelOrderParamList, CancelOrderRouteName} from '@/routes/order.route';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import CancelOrderGetAllTab from './cancel-order-get-all.tab';
import CancelOrderToRespondTab from './cancel-order-to-respond.tab';
import CancelOrderCancelledTab from './cancel-order-cancelled';

const Tab = createMaterialTopTabNavigator<CancelOrderParamList>();

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
      case CancelOrderRouteName.GET_ALL:
        return t(i18nKeys.order.cancel.getAll);
      case CancelOrderRouteName.WAIT_RESPONSE:
        return t(i18nKeys.order.cancel.toRespond);
      case CancelOrderRouteName.CANCELLED:
        return t(i18nKeys.order.cancel.cancelled);
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
        minWidth: width * 0.3,
        textAlign: 'center',
      }}>
      {title()}
    </Text>
  );
};

const CancelOrderTab = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: false,
          tabBarIndicatorStyle: {
            backgroundColor: 'transparent',
          },
          tabBarLabel: TabLabel,
          swipeEnabled: false,
        }}>
        <Tab.Screen name="GetAll" component={CancelOrderGetAllTab} />
        <Tab.Screen
          name="WaitingResponse"
          component={CancelOrderToRespondTab}
        />
        <Tab.Screen name="Cancelled" component={CancelOrderCancelledTab} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CancelOrderTab;
