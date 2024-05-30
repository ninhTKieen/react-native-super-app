import { NavigationProp, useNavigation } from '@react-navigation/native';
import ArrowRight from '@src/assets/arrow-right.svg';
import FaQIcon from '@src/assets/faq-gradient.svg';
import HomeIcon from '@src/assets/home-gradient.svg';
import LogoutIcon from '@src/assets/home-iot/common/off-icon.svg';
import SettingsIcon from '@src/assets/settings-gradient.svg';
import SettingsOutlineIcon from '@src/assets/settings-outline.svg';
import MainLayout from '@src/components/main.layout';
import globalStyles, { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { IndividualRouteStackParamList } from '@src/configs/routes/individual/individual.route';
import authService from '@src/features/auth/auth.service';
import { useAuthStore } from '@src/features/auth/auth.store';
import { useHomeStore } from '@src/features/home/home.store';
import { useAuth } from '@src/hooks/use-auth.hook';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const MainIndividualScreen = () => {
  const navigation =
    useNavigation<
      NavigationProp<IndividualRouteStackParamList, 'MainIndividual'>
    >();
  const { currentUser } = useAuth();
  const { t } = useTranslation();

  const { logout } = useAuthStore();
  const { clearCurrentHome } = useHomeStore();

  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: (_data) => {
      logout();
      clearCurrentHome();
    },
    onError: () => {
      logout();
      clearCurrentHome();
    },
  });

  return (
    <MainLayout title={t(i18nKeys.individual.title)}>
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={[styles.surface, styles.directionRow]}>
              <View className="h-20 w-20 overflow-hidden rounded-full border-2 border-white p-2">
                {currentUser?.imageUrl ? (
                  <FastImage
                    className="h-full w-full"
                    source={{
                      uri: currentUser?.imageUrl,
                    }}
                    style={{ backgroundColor: colors.transparent }}
                  />
                ) : (
                  <View className="h-full w-full items-center justify-center bg-[#EEEEEE]">
                    <Text className="text-4xl font-bold text-[#515151]">
                      {currentUser?.fullName?.[0]}
                    </Text>
                  </View>
                )}
              </View>

              <View className="ml-3 flex-1" style={{ flex: 1, marginLeft: 10 }}>
                <Text className="text-2xl font-medium text-[#515151]">
                  {currentUser?.userName}
                </Text>
              </View>

              <SettingsOutlineIcon width={30} height={30} />
            </View>
          </TouchableOpacity>

          <View
            className="m-3 rounded-xl border-2 border-white bg-[#F7F7F7] p-3"
            style={globalStyles.commonShadowContainer}
          >
            <TouchableOpacity
              className="mb-6 flex-row items-center justify-between"
              onPress={() =>
                navigation.navigate('HomeManagement', {
                  screen: 'MainHomeManagement',
                  params: {
                    userId: currentUser?.id as number,
                  },
                })
              }
            >
              <HomeIcon width={35} height={35} />
              <View className="ml-3 flex-1">
                <Text className="text-lg font-medium text-[#515151]">
                  {t(i18nKeys.individual.homeManagement)}
                </Text>
              </View>

              <ArrowRight width={18} height={18} />
            </TouchableOpacity>

            <TouchableOpacity
              className="mb-6 flex-row items-center justify-between"
              onPress={() => {
                navigation.navigate('Settings');
              }}
            >
              <SettingsIcon width={35} height={35} />
              <View className="ml-3 flex-1">
                <Text className="text-lg font-medium text-[#515151]">
                  {t(i18nKeys.settings.title)}
                </Text>
              </View>

              <ArrowRight width={18} height={18} />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between">
              <FaQIcon width={35} height={35} />
              <View className="ml-3 flex-1">
                <Text className="text-lg font-medium text-[#515151]">
                  {t(i18nKeys.individual.faq)} &{' '}
                  {t(i18nKeys.individual.feedback)}
                </Text>
              </View>

              <ArrowRight width={18} height={18} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="mb-3 mt-auto w-11/12 flex-row items-center justify-center self-center rounded-full bg-red-500 p-2"
            onPress={() => logoutMutation.mutate()}
          >
            <LogoutIcon width={25} height={25} />
            <Text className="mx-2 font-medium text-white">
              {t(i18nKeys.auth.logout)}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },

  surface: {
    padding: 8,
    margin: 8,
    borderRadius: 8,
  },

  icon: {
    marginRight: 8,
    fontSize: 30,
    color: colors.primary,
  },

  directionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default MainIndividualScreen;
