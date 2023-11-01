import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
  SectionList,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '@/hooks/redux.hook';
import {authActions, selectFCMToken} from '@/features/auth/auth.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ACCESS_TOKEN_KEY,
  ENCRYPTED_ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@/configs/constant';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuth} from '@/hooks/useAuth';
import {resetCurrentStore} from '@/features/store/store.slice';
import {i18nKeys} from '@/configs/i18n/i18n_configs';
import {useTranslation} from 'react-i18next';
import {ProfileStackParamList} from '@/routes/profile.route';
import ImageCustomer from '@/components/common/image-customer';
import {
  ACTION_PROFILE_SCREEN,
  GetSectionData,
} from './constants/profile.screen.constants';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import authServices from '@/features/auth/auth.services';
import {useMutation} from '@tanstack/react-query';
import {ProfileIcon} from './constants/icons';
import {color} from '@/configs/globalStyles';

const {height, width} = Dimensions.get('screen');
type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  'ProfileMainScreen'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const ProfileScreen = ({navigation}: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const {currentUser} = useAuth();
  const fcmToken = useAppSelector(selectFCMToken);
  const {t} = useTranslation();
  const {mutate: logout} = useMutation(
    async (params: {token: string}) => await authServices.logoutFCM(params),
    {
      onSuccess: data => {
        logOutUserOnApp();
      },
      onError: error => {
        console.log('[logoutFCM]', error);
      },
    },
  );
  const logOutUserOnApp = () => {
    AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
    AsyncStorage.removeItem(ENCRYPTED_ACCESS_TOKEN_KEY);

    dispatch(resetCurrentStore());
    dispatch(authActions.logout());
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <View style={styles.userInfoSection}>
        <View style={styles.avatar_name_wrapper}>
          <View style={styles.avatarWrapper}>
            <TouchableOpacity onPress={() => {}}>
              <ImageCustomer
                source={{
                  uri: currentUser?.imageUrl ? currentUser.imageUrl : '',
                }}
                resizeMode="stretch"
                widthImg={86}
                heightImg={86}
                borderRadius={86}
                style={styles.image}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.nameWrapper}>
            <Text style={[styles.title]} ellipsizeMode="tail" numberOfLines={1}>
              {currentUser?.fullName}
            </Text>
            <Text style={styles.mail}>{currentUser?.emailAddress}</Text>
          </View>
        </View>
      </View>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={GetSectionData()}
        keyExtractor={(item, index) => `${item.name}+${index}`}
        renderItem={({item}) => {
          const IconRow = item.icon;
          return (
            <TouchableOpacity
              onPress={() => {
                switch (item.event) {
                  case ACTION_PROFILE_SCREEN.INFOR_STORE:
                    navigation.navigate('EditProfileScreen', {});
                    break;
                  case ACTION_PROFILE_SCREEN.LANGUAGE:
                    navigation.navigate('LanguageScreen', {});
                    break;
                  case ACTION_PROFILE_SCREEN.SECURITY:
                    navigation.navigate('SettingStack', {
                      screen: 'SecurityScreen',
                      params: {},
                    });
                    break;
                  case ACTION_PROFILE_SCREEN.RATE:
                    navigation.navigate('RateStack', {
                      screen: 'RatingScreen',
                      params: {},
                    });
                    break;
                  default:
                    Toast.show({
                      text1: 'Coming soon',
                      text2: 'Update in next version',
                      visibilityTime: 1000,
                    });
                }
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: height * 0.012,
                paddingHorizontal: width * 0.04,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: width * 0.057,
                  aspectRatio: 1,
                  backgroundColor: '#DBE4EA',
                  borderRadius: width * 0.057,
                }}>
                <IconRow />
              </View>
              <Text
                style={{
                  color: '#2B5783',
                  fontSize: 15,
                  fontWeight: '600',
                  paddingLeft: width * 0.05,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({section: {title}}) => (
          <View
            style={{
              paddingVertical: height * 0.012,
              borderTopWidth: 2,
              borderColor: '#F1F2F8',
              backgroundColor: 'white',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#78B7EE',
                paddingHorizontal: width * 0.04,
              }}>
              {title}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: height * 0.012,
          paddingHorizontal: width * 0.04,
        }}
        onPress={() => {
          Alert.alert(t(i18nKeys.auth.confirmLogout), '', [
            {
              text: t(i18nKeys.common.cancel) as string,
            },
            {
              text: t(i18nKeys.common.ok) as string,
              style: 'destructive',
              onPress: () => {
                logout({token: fcmToken});
              },
            },
          ]);
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: width * 0.057,
            aspectRatio: 1,
            backgroundColor: color.red4,
            borderRadius: width * 0.057,
          }}>
          <ProfileIcon.LOGOUT color={color.red} />
        </View>
        <Text
          style={{
            color: color.red,
            fontSize: 15,
            fontWeight: '600',
            paddingLeft: width * 0.05,
          }}>
          {t(i18nKeys.auth.logout)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  wrapperScroll: {},
  userInfoSection: {
    paddingBottom: height * 0.013,
    borderBottomWidth: height * 0.003,
    borderColor: '#F1F2F8',
  },
  avatar_name_wrapper: {
    marginTop: 15,
    alignItems: 'center',
  },
  avatarWrapper: {},
  nameWrapper: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#707386',
    marginTop: height * 0.013,
    marginBottom: height * 0.01,
  },
  mail: {
    fontSize: 15,
    fontWeight: '400',
    color: '#707386',
    textAlign: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },

  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    height: 60,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  title1: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    color: '#333333',
  },

  tabTitleIcon: {
    marginHorizontal: 4,
  },

  image: {
    width: 86,
    height: 86,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
});

export default ProfileScreen;
