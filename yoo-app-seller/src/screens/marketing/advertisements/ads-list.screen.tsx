import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import TopBar from '@/components/top-bar';
import AdAllTab from './tabs/all-tab';
import AdPendingTab from './tabs/pending-tab';
import AdOnGoingTab from './tabs/on-going-tab';
import IconGeneral from '@/components/common/icon-general';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  AdvertisementTabParamList,
  AdTabRoute,
  AdvertisementStackParamList,
} from '@/routes/marketing.route';
import {color} from '@/configs/globalStyles';
import {useNavigation, NavigationProp} from '@react-navigation/native';

const {width} = Dimensions.get('screen');
const Tabs = createMaterialTopTabNavigator<AdvertisementTabParamList>();

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
      case AdTabRoute.All:
        return t(i18nKeys.advertisement.tabs.all);
      case AdTabRoute.Pending:
        return t(i18nKeys.advertisement.tabs.pending);
      case AdTabRoute.OnGoing:
        return t(i18nKeys.advertisement.tabs.onGoing);
      default:
        return t(i18nKeys.order.updating);
    }
  };
  return (
    <Text
      style={{
        color: focused ? color.primary : color.grey9,
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

const AdsListScreen = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NavigationProp<AdvertisementStackParamList>>();

  return (
    <View style={styles.container}>
      <TopBar
        title={t(i18nKeys.advertisement.title)}
        right={
          <IconGeneral
            name={'addchart'}
            type="MaterialIcons"
            color={color.blue1}
            size={22}
            onPress={() => {
              navigation.navigate('CreateAdvertisementScreen');
            }}
          />
        }
      />
      <Tabs.Navigator
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
        <Tabs.Screen name="All" component={AdAllTab} />
        <Tabs.Screen name="Pending" component={AdPendingTab} />
        <Tabs.Screen name="OnGoing" component={AdOnGoingTab} />
      </Tabs.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AdsListScreen;
