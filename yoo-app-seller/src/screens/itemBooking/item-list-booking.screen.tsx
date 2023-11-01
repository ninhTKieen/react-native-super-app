/* eslint-disable react/no-unstable-nested-components */
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ItemBookingStackParamList} from '@/routes/item-booking.route';
import TopBar from '@/components/top-bar';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {Searchbar} from 'react-native-paper';
import {color} from '@/configs/globalStyles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  ItemBookingListStackParamList,
  ItemBookingListRoutes,
} from '@/routes/item-booking.route';
import {ItemDisplay} from '@/features/item/item.model';
import ListItemBooking from '@/screens/itemBooking/components/list-item-booking';

const {width, height} = Dimensions.get('screen');
const Tab = createMaterialTopTabNavigator<ItemBookingListStackParamList>();

type Props = NativeStackScreenProps<
  ItemBookingStackParamList,
  'ItemBookingList'
>;

const ItemListBookingScreen = ({navigation}: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
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
        case ItemBookingListRoutes.Available:
          return t(i18nKeys.itemBooking.active);
        case ItemBookingListRoutes.Hidden:
          return t(i18nKeys.item.hidden);
        case ItemBookingListRoutes.PendingApproval:
          return t(i18nKeys.item.pendingApproval);
        default:
          return t(i18nKeys.order.updating);
      }
    };
    return (
      <Text
        style={{
          color: focused ? color.primary : '#6c757d',
          fontSize: 14,
          fontWeight: focused ? '700' : '400',
          textAlign: 'center',
          width: 140,
        }}>
        {title()}
      </Text>
    );
  };

  return (
    <View style={{flex: 1}}>
      <TopBar title={t(i18nKeys.itemBooking.title)} />
      <View style={styles.searchBarWrapper}>
        <View style={{width: '100%'}}>
          <Searchbar
            elevation={0}
            value={searchQuery}
            onChangeText={query => setSearchQuery(query)}
            placeholderTextColor={'#C4C8D9'}
            selectionColor={'#C4C8D9'}
            placeholder={t(i18nKeys.item.search) as string}
            style={{
              borderRadius: height * 0.038,
              backgroundColor: '#F1F2F8',
            }}
            inputStyle={{
              fontWeight: '500',
              fontSize: 15.6,
            }}
            iconColor="#C4C8D9"
          />
        </View>
      </View>

      <Tab.Navigator
        initialLayout={{
          width: Dimensions.get('window').width,
        }}
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
            width: 150,
          },
          tabBarLabel: TabLabel,
        }}>
        <Tab.Screen
          name="Available"
          component={ListItemBooking}
          initialParams={{status: ItemDisplay.LIVE}}
        />

        <Tab.Screen
          name="PendingApproval"
          component={ListItemBooking}
          initialParams={{status: ItemDisplay.REVIEWING}}
        />

        <Tab.Screen
          name="Hidden"
          component={ListItemBooking}
          initialParams={{status: ItemDisplay.DELIST}}
        />
      </Tab.Navigator>

      <View style={{backgroundColor: 'transparent'}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CreateItemBooking', {});
          }}
          style={{
            backgroundColor: color.primary,
            paddingVertical: '3%',
            marginHorizontal: '4%',
            borderRadius: width * 0.2,
            alignItems: 'center',
            bottom: 0,
            marginBottom: 10,
          }}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: '500'}}>
            {t(i18nKeys.itemBooking.create.title)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemListBookingScreen;

const styles = StyleSheet.create({
  searchBarWrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
