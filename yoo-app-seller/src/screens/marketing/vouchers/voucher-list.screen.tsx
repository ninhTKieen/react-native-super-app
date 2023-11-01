import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TopBar from '@/components/top-bar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  VoucherStackParamList,
  VoucherTabParamList,
} from '@/routes/marketing.route';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import IncomingVoucherTab from '../tabs/incoming-voucher.tab';
import RunningVoucherTab from '../tabs/running-voucher.tab';
import ExpiredVoucherTab from '../tabs/expired-voucher.tab';
import {color} from '@/configs/globalStyles';
import {Button} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<
  VoucherStackParamList,
  'VoucherListScreen'
> & {};

const width = Dimensions.get('screen').width;

const Tab = createMaterialTopTabNavigator<VoucherTabParamList>();

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
      case 'IncomingVoucher':
        return t(i18nKeys.voucher.incoming);
      case 'RunningVoucher':
        return t(i18nKeys.voucher.ongoing);
      case 'ExpiredVoucher':
        return t(i18nKeys.voucher.expired);
      default:
        return t(i18nKeys.voucher.updating);
    }
  };
  return (
    <Text
      style={{
        color: focused ? color.blueDark1 : color.grey8,
        fontSize: 14,
        fontWeight: focused ? '700' : '400',
        minWidth: width * 0.3,
        textAlign: 'center',
      }}>
      {title()}
    </Text>
  );
};

const VoucherListScreen = ({navigation}: Props): JSX.Element => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <TopBar title={t(i18nKeys.voucher.title)} />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarIndicatorStyle: {
            backgroundColor: '#0077b6',
          },
          tabBarLabel: TabLabel,
        }}>
        <Tab.Screen name="IncomingVoucher" component={IncomingVoucherTab} />
        <Tab.Screen name="RunningVoucher" component={RunningVoucherTab} />
        <Tab.Screen name="ExpiredVoucher" component={ExpiredVoucherTab} />
      </Tab.Navigator>
      <Button
        onPress={() => {
          navigation.navigate('CreateVoucherStack', {
            screen: 'CreateVoucherScreen',
            params: {
              type: 1,
              scope: 1,
            },
          });
        }}
        style={{
          backgroundColor: color.blueDark1,
          marginTop: 5,
          marginHorizontal: '4%',
          marginVertical: '4%',
        }}
        labelStyle={{color: color.white, fontWeight: '600'}}>
        {t(i18nKeys.voucher.create.title)}
      </Button>
    </View>
  );
};

export default VoucherListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
});
