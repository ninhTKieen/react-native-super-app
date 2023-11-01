import React from 'react';
import {Dimensions, Text, View} from 'react-native';

import TopBar from '@/components/top-bar';
import IconGeneral from '@/components/common/icon-general';
import {useTranslation} from 'react-i18next';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {BookingTabParamList} from '@/routes/booking.route';
import PendingBookingTab from './tabs-booking/pending-booking.tab';
import ConfirmedBookingTab from './tabs-booking/confirmed-booking.tab';
import CompleteBookingTab from './tabs-booking/complete-booking.tab';
import CancelBookingTab from './tabs-booking/cancel-booking.tab';
import RefundBookingTab from './tabs-booking/refund-booking.tab';
import {BookingFormId} from '@/features/booking/booking.model';

const {width} = Dimensions.get('screen');
const Tab = createMaterialTopTabNavigator<BookingTabParamList>();

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
      case 'PendingBooking':
        return t(i18nKeys.order.pending);
      case 'ConfirmedBooking':
        return t(i18nKeys.order.toShip.title);
      case 'CompleteBooking':
        return t(i18nKeys.order.complete);
      case 'CancelBooking':
        return t(i18nKeys.order.cancel.title);
      case 'RefundBooking':
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
        minWidth: width * 0.3,
        textAlign: 'center',
      }}>
      {title()}
    </Text>
  );
};

const ListBookingScreen = () => {
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
            maxWidth: width * 0.3,
            marginLeft: width * 0.045,
          },
          tabBarPressColor: 'transparent',
          tabBarLabel: TabLabel,
        }}>
        <Tab.Screen
          name="PendingBooking"
          component={PendingBookingTab}
          initialParams={{formId: BookingFormId.WAITING}}
        />
        <Tab.Screen
          name="ConfirmedBooking"
          component={ConfirmedBookingTab}
          initialParams={{formId: BookingFormId.CONFIRMED}}
        />
        <Tab.Screen
          name="CompleteBooking"
          component={CompleteBookingTab}
          initialParams={{formId: BookingFormId.COMPLETED}}
        />
        <Tab.Screen
          name="CancelBooking"
          component={CancelBookingTab}
          initialParams={{formId: BookingFormId.CANCELLATION_GET_ALL}}
        />
        <Tab.Screen
          name="RefundBooking"
          component={RefundBookingTab}
          initialParams={{formId: BookingFormId.RETURN_REFUND}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default ListBookingScreen;
