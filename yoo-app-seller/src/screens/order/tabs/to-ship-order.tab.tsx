import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ToShipOrderParamList} from '@/routes/order.route';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import ToShipGetAllTab from './to-ship-get-all.tab';
import ToShipGetProcessingTab from './to-ship-get-processing.tab';
import ToShipGetProcessedTab from './to-ship-get-processed.tab';

const Tab = createMaterialTopTabNavigator<ToShipOrderParamList>();

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
      case 'GetAll':
        return t(i18nKeys.order.toShip.getAll);
      case 'GetByProcessing':
        return t(i18nKeys.order.toShip.getToProcess);
      case 'GetByProcessed':
        return t(i18nKeys.order.toShip.getProcessed);
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

const ToShipOrderTab = () => {
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
        <Tab.Screen name="GetAll" component={ToShipGetAllTab} />
        <Tab.Screen name="GetByProcessing" component={ToShipGetProcessingTab} />
        <Tab.Screen name="GetByProcessed" component={ToShipGetProcessedTab} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ToShipOrderTab;
