import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TopBar from '@/components/top-bar';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {SettingStackParamList} from '@/routes/profile.route';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslation} from 'react-i18next';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import IconGeneral from '@/components/common/icon-general';
import Toast from 'react-native-toast-message';

const SecurityScreen = () => {
  const navigation = useNavigation<NavigationProp<SettingStackParamList>>();
  const {t} = useTranslation();

  return (
    <View>
      <TopBar title={'Security'} />
      <View
        style={{
          backgroundColor: '#fff',
          marginTop: 20,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChangePasswordScreen', {});
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <Icon name="lock" size={25} color="#2c3e50" />
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 16,
              }}>
              {t(i18nKeys.profile.changePassword.title)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: '#fff',
          marginTop: 5,
          paddingHorizontal: 10,
          paddingVertical: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            Toast.show({
              text1: t(i18nKeys.common.comingSoon) as string,
              text2: t(i18nKeys.common.comingSoonMsg) as string,
              visibilityTime: 1000,
              type: 'success',
            });
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <IconGeneral
              type="AntDesign"
              name="deleteuser"
              size={25}
              color="#2c3e50"
            />
            <Text
              style={{
                paddingLeft: 10,
                fontSize: 16,
              }}>
              {t(i18nKeys.profile.login.deleteAccount)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({});
