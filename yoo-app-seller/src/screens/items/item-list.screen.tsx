/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';

import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';

import TopBar from '@/components/top-bar';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {ItemDisplay} from '@/features/item/item.model';
import {ItemStackParamList, ItemTabParamList} from '@/routes/item.route';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useAppDispatch} from '@/hooks/redux.hook';
import {orderActions} from '@/features/order/order.slice';
import StockingTab from './tab-list-item/stocking.tab';
import OutOfStockTab from './tab-list-item/out-of-stock.tab';
import HiddenTab from './tab-list-item/hidden.tab';
import PendingApproveTab from './tab-list-item/pending-approve.tab';
import SuspendedTab from './tab-list-item/suspended.tab';
import {color} from '@/configs/globalStyles';
import AddIcon from '@/assets/item/icons/Union.svg';
import IconGeneral from '@/components/common/icon-general';

const {width, height} = Dimensions.get('screen');

type ItemListScreenNavigationProp = NavigationProp<
  ItemStackParamList,
  'CreateItem'
>;
type ItemListScreenRouteProp = RouteProp<ItemStackParamList, 'CreateItem'>;
const Tab = createMaterialTopTabNavigator<ItemTabParamList>();

const ItemListScreen = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation<ItemListScreenNavigationProp>();
  const route = useRoute<ItemListScreenRouteProp>();
  const {t} = useTranslation();
  const TabLabel = ({
    focused,
    children,
  }: {
    focused: boolean;
    color: string;
    children: string;
  }) => {
    const title = () => {
      switch (children) {
        case 'InStockTab':
          return t(i18nKeys.item.inStock);
        case 'OutOfStockTab':
          return t(i18nKeys.item.outOfStock);
        case 'HiddenTab':
          return t(i18nKeys.item.hidden);
        case 'PendingApproveTab':
          return t(i18nKeys.item.pendingApproval);
        case 'SuspendedTab':
          return t(i18nKeys.item.suspended);
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
          paddingHorizontal: 8,
          textAlign: 'center',
        }}>
        {title()}
      </Text>
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.getParent()?.addListener('focus', () => {
      dispatch(orderActions.setSearchQuery(''));
      setSearchQuery('');
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  return (
    <View style={styles.container}>
      <TopBar
        title={t(i18nKeys.item.title)}
        styleTitle={{
          fontSize: 18,
          fontWeight: '700',
          color: color.grey9,
        }}
        left={
          <View style={styles.iconBack}>
            <IconGeneral
              type="Ionicons"
              name="chevron-back-outline"
              color={color.grey9}
              size={24}
            />
          </View>
        }
      />
      <View style={styles.searchBarWrapper}>
        <View style={{width: '100%'}}>
          <Searchbar
            elevation={0}
            value={searchQuery}
            onChangeText={query => setSearchQuery(query)}
            onIconPress={() => {
              dispatch(orderActions.setSearchQuery(searchQuery));
            }}
            placeholderTextColor={color.grey8}
            onSubmitEditing={() => {
              dispatch(orderActions.setSearchQuery(searchQuery));
            }}
            onClearIconPress={() => {
              setSearchQuery('');
              dispatch(orderActions.setSearchQuery(''));
            }}
            selectionColor={color.grey8}
            placeholder={t(i18nKeys.item.search) as string}
            style={{
              borderRadius: height * 0.038,
              height: height * 0.05,
              backgroundColor: color.grey7,
            }}
            inputStyle={{
              fontWeight: '500',
              fontSize: 15.6,
              marginVertical: -10,
            }}
            iconColor={color.grey8}
          />
        </View>
      </View>

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
          tabBarLabel: TabLabel,
        }}>
        <Tab.Screen
          name="InStockTab"
          component={StockingTab}
          initialParams={{status: ItemDisplay.LIVE}}
        />
        <Tab.Screen
          name="PendingApproveTab"
          component={PendingApproveTab}
          initialParams={{status: ItemDisplay.REVIEWING}}
        />
        <Tab.Screen
          name="OutOfStockTab"
          component={OutOfStockTab}
          initialParams={{status: ItemDisplay.SOLD_OUT}}
        />
        <Tab.Screen
          name="HiddenTab"
          component={HiddenTab}
          initialParams={{status: ItemDisplay.DELIST}}
        />
        <Tab.Screen
          name="SuspendedTab"
          component={SuspendedTab}
          initialParams={{status: ItemDisplay.SUSPENDED}}
        />
      </Tab.Navigator>

      <View
        style={{
          backgroundColor: 'white',
          alignItems: 'center',
          paddingBottom: height * 0.02,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateItem', {
              idStore: route.params.idStore,
            });
          }}
          style={styles.btnAdd}>
          <Text style={styles.txtBtnAdd}>{t(i18nKeys.item.addNew)}</Text>
          <AddIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },

  searchBarWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  tabItem: {
    justifyContent: 'center',
    padding: 10,
  },

  textLabel: {
    fontWeight: '500',
    fontSize: 13,
    textAlign: 'center',
  },

  iconBack: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.062,
    aspectRatio: 1,
    backgroundColor: '#F1F2F8',
    borderRadius: width * 0.062,
  },

  btnAdd: {
    flexDirection: 'row',
    backgroundColor: '#75A3C7',
    width: '80%',
    justifyContent: 'center',
    paddingVertical: height * 0.012,
    borderRadius: height * 0.04,
    alignItems: 'center',
  },

  txtBtnAdd: {
    paddingRight: 4,
    color: '#fff',
    fontSize: 15.6,
    fontWeight: '600',
  },
});

export default ItemListScreen;
