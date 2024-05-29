import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeRouteStackParamList } from '@src/configs/routes/home.route';
import React from 'react';

import AddSubDevice from './add-sub-device.screen';
import DeviceCategoriesScreen from './device-categories.screen';
import DeviceDetailScreen from './device-detail.screen';
import MainHomeScreen from './main-home.screen';
import PairingDeviceScreen from './pairing-device.screen';
import ScanDeviceQrScreen from './scan-device-qr.screen';

const HomeStack = createNativeStackNavigator<HomeRouteStackParamList>();

const HomeNavigator = (): JSX.Element => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainHome"
    >
      <HomeStack.Screen name="MainHome" component={MainHomeScreen} />
      <HomeStack.Screen name="DeviceDetail" component={DeviceDetailScreen} />
      <HomeStack.Screen name="DeviceQRScan" component={ScanDeviceQrScreen} />
      <HomeStack.Screen name="PairingDevice" component={PairingDeviceScreen} />
      <HomeStack.Screen
        name="DeviceCategories"
        component={DeviceCategoriesScreen}
      />
      <HomeStack.Screen name="AddSubDevice" component={AddSubDevice} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
