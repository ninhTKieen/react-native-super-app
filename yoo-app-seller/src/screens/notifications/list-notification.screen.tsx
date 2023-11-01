import {Dimensions, Text, View} from 'react-native';
import React from 'react';
import TopBar from '@/components/top-bar';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width} = Dimensions.get('screen');
const ListNotificationScreen = () => {
  const {t} = useTranslation();
  return (
    <View style={{flex: 1}}>
      <TopBar title={t(i18nKeys.notifi.title)} left={<View />} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Ionicons
          name="md-notifications-circle"
          color={'#ced4da'}
          size={width / 3.5}
        />

        <Text
          style={{
            fontSize: 16,
            color: '#adb5bd',
            fontWeight: '700',
          }}>
          {t(i18nKeys.notifi.txtEmpty)}
        </Text>
      </View>
    </View>
  );
};

export default ListNotificationScreen;
