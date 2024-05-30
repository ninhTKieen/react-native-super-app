import { NavigationProp, useNavigation } from '@react-navigation/native';
import AddIcon from '@src/assets/home-iot/common/add-round-outline.svg';
import PressureIcon from '@src/assets/home-iot/devices/icons/sensor/air-quality.svg';
import HumidIcon from '@src/assets/home-iot/devices/icons/sensor/humid.svg';
import { storage } from '@src/common/mmkv.storage';
import IconGeneral from '@src/components/icon-general';
import MainLayout from '@src/components/main.layout';
import {
  CURRENT_HOME_ID_KEY,
  CURRENT_HOME_ROLE_KEY,
} from '@src/configs/constant/constant.config';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { HomeRouteStackParamList } from '@src/configs/routes/home.route';
import deviceService from '@src/features/devices/device.service';
import { EHomeRole } from '@src/features/home/home.model';
import homeService from '@src/features/home/home.service';
import { useHomeStore } from '@src/features/home/home.store';
import socketService from '@src/features/socket/socket.service';
import weatherService from '@src/features/weather/weather.service';
import { getCurrentDate } from '@src/utils/date.util';
import { useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import GetLocation from 'react-native-get-location';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import { Text as PaperText } from 'react-native-paper';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import AreaList from './components/area-list';
import DeviceList from './components/device-list';
import HomeListModal from './components/home-list-modal';

const MainHomeScreen = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<HomeRouteStackParamList>>();
  const { t } = useTranslation();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isImgVisible, setIsImgVisible] = useState(false);
  const [curLocation, setCurLocation] = useState<{
    latitude: number | undefined;
    longitude: number | undefined;
  }>({
    latitude: undefined,
    longitude: undefined,
  });

  const hasCurrentHomeId = storage.contains(CURRENT_HOME_ID_KEY);
  const hasCurrentHomeRole = storage.contains(CURRENT_HOME_ROLE_KEY);
  const currentHomeId = storage.getNumber(CURRENT_HOME_ID_KEY);
  const currentHomeRole = storage.getString(CURRENT_HOME_ROLE_KEY);

  const { currentHome, setCurrentHome } = useHomeStore();

  const getHomeById = useCallback(async () => {
    try {
      const home = await homeService.getHomeById(currentHomeId as number);
      socketService.send({
        channel: '/estates/join-room',
        data: {
          estateId: home.id,
        },
      });
      setCurrentHome(home);
      return home;
    } catch {
      throw Promise.reject();
    }
  }, [currentHomeId, setCurrentHome]);

  useQuery({
    queryKey: ['home/get-by-id', { id: currentHomeId }],
    queryFn: () => getHomeById(),
    retry: false,
    enabled: hasCurrentHomeId,
  });

  const curWeatherQuery = useQuery({
    queryKey: ['get/current-weather'],
    queryFn: () =>
      weatherService.getWeatherByCoordinates(
        curLocation.latitude as number,
        curLocation.longitude as number,
      ),
    enabled: !!curLocation.latitude && !!curLocation.longitude,
  });

  const devicesQuery = useQuery({
    queryKey: ['devices/get-all', { homeId: currentHomeId }],
    queryFn: () =>
      deviceService.getAllDevices({
        estateId: currentHomeId as number,
      }),
    enabled: hasCurrentHomeId && !!currentHomeId,
  });

  const getRoomsQuery = useQuery({
    queryKey: ['home/get-all-rooms', { homeId: currentHomeId }],
    queryFn: () => homeService.getRoomFromHome(currentHomeId as number),
    enabled: hasCurrentHomeId && !!currentHomeId,
  });

  const routes = useMemo(
    () => [
      { key: 'devices', title: t(i18nKeys.device.all) },
      { key: 'rooms', title: t(i18nKeys.home.settings.rooms.title) },
    ],
    [t],
  );

  const renderScene = useMemo(() => {
    const scenes: any = {
      devices: () => <DeviceList deviceList={devicesQuery.data} />,
      rooms: () => <AreaList areaList={getRoomsQuery.data?.items} />,
    };

    return SceneMap(scenes);
  }, [devicesQuery.data, getRoomsQuery.data?.items]);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then((location) => {
        setCurLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  }, []);

  return (
    <MainLayout
      title={t(i18nKeys.home.title)}
      right={
        <AddIcon
          width={30}
          height={30}
          onPress={() => {
            navigation.navigate('DeviceCategories', {});
          }}
          style={{
            display:
              hasCurrentHomeRole && currentHomeRole !== EHomeRole.Member
                ? 'flex'
                : 'none',
          }}
        />
      }
      center={
        <Pressable
          className="flex-row items-center justify-center"
          onPress={() => setIsVisible(true)}
        >
          <Text className="text-base font-bold text-[#515151]">
            {currentHome?.name || t(i18nKeys.home.choose)}
          </Text>
          <IconGeneral
            type="MaterialCommunityIcons"
            name={isVisible ? 'menu-up' : 'menu-down'}
            size={20}
            style={{ marginLeft: 5 }}
          />
        </Pressable>
      }
    >
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        className="h-full flex-1"
      >
        <LinearGradient
          colors={['#F0F0F0', '#FDFBFB']}
          className="m-[10px] rounded-2xl border-2 border-solid border-[#FFFFFF] p-3 shadow-[0px_1px_15px_0px_rgba(0,0,0,0.3)]"
        >
          <View>
            <Text className="text-right text-[15px] text-[#44A093]">
              {getCurrentDate()}
            </Text>
          </View>
          <View className="flex-row">
            <View className="w-3/5">
              <Text className="text-[40px] font-bold text-[#ACC981]">
                {curWeatherQuery.data?.main?.temp &&
                  Math.round(curWeatherQuery.data.main.temp - 273.15)}
                °C
              </Text>

              <Text className="text-[20px] font-bold text-[#ACC981]">
                {curWeatherQuery.data?.main &&
                  `${Math.round(
                    curWeatherQuery.data.main.temp_min - 273.15,
                  )} °C - ${Math.round(
                    curWeatherQuery.data.main.temp_max - 273.15,
                  )} °C`}
              </Text>

              <View className="mt-4 flex-row justify-between">
                <View className="flex-row">
                  <HumidIcon width={33} height={33} />
                  <View className="ml-2">
                    <Text className="text-[14px] font-normal">
                      {t(i18nKeys.device.humidity)}
                    </Text>
                    <Text className="text-[16px] font-semibold text-[#ACC981]">
                      {curWeatherQuery.data?.main?.humidity &&
                        Math.round(curWeatherQuery.data.main.humidity)}
                      %
                    </Text>
                  </View>
                </View>

                <View className="flex-row">
                  <PressureIcon width={33} height={33} />
                  <View className="ml-2">
                    <Text className="text-[14px] font-normal">
                      {t(i18nKeys.device.pressure)}
                    </Text>
                    <Text className="text-[16px] font-semibold text-[#ACC981]">
                      {curWeatherQuery.data?.main?.pressure &&
                        Math.round(curWeatherQuery.data.main.pressure)}{' '}
                      hPa
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="w-2/5 items-end">
              <FastImage
                source={{
                  uri: `http://openweathermap.org/img/w/${curWeatherQuery.data?.weather[0].icon}.png`,
                }}
                className="mx-4 h-28 w-28"
              />
            </View>
          </View>
        </LinearGradient>
        {currentHomeId && (
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(_props) => (
              <TabBar
                {..._props}
                indicatorStyle={{
                  backgroundColor: colors.primary,
                  borderRadius: 1,
                }}
                style={{
                  backgroundColor: 'transparent',
                  borderColor: '#FFFFFF',
                  borderWidth: 2,
                  shadowColor: 'transparent',
                }}
                tabStyle={{
                  alignItems: 'center',
                }}
                android_ripple={{ color: 'transparent' }}
                renderLabel={({ route, focused }) => (
                  <PaperText
                    style={{
                      color: focused ? colors.primary : 'gray',
                      opacity: focused ? 1 : 0.5,
                      fontWeight: '500',
                      fontSize: 13,
                      textAlign: 'center',
                    }}
                  >
                    {route.title}
                  </PaperText>
                )}
              />
            )}
          />
        )}
      </ImageBackground>

      {currentHome && (
        <ImageView
          images={
            currentHome?.imageFileUrls?.map((url) => ({ uri: url })) || []
          }
          imageIndex={0}
          visible={isImgVisible}
          onRequestClose={() => setIsImgVisible(false)}
          FooterComponent={({ imageIndex }) => (
            <Text
              style={{ color: 'white', marginBottom: 50, textAlign: 'center' }}
            >
              {imageIndex + 1}/{currentHome?.imageFileUrls?.length}
            </Text>
          )}
        />
      )}

      <HomeListModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </MainLayout>
  );
};

export default MainHomeScreen;
