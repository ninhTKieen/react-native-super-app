import { NavigationProp, useNavigation } from '@react-navigation/native';
import AddIcon from '@src/assets/home-iot/common/add-round-outline.svg';
import { storage } from '@src/common/mmkv.storage';
import IconGeneral from '@src/components/icon-general';
import MainLayout from '@src/components/main.layout';
import {
  CURRENT_HOME_ID_KEY,
  CURRENT_HOME_ROLE_KEY,
} from '@src/configs/constant/constant.config';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { SceneRouteStackParamList } from '@src/configs/routes/scene.route';
import { EHomeRole } from '@src/features/home/home.model';
import homeService from '@src/features/home/home.service';
import { useHomeStore } from '@src/features/home/home.store';
import socketService from '@src/features/socket/socket.service';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  Pressable,
  Text,
  useWindowDimensions,
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import HomeListModal from '../home/components/home-list-modal';
import AutomationSceneTab from './components/automation-scene-tab';
import MomentSceneTab from './components/moment-scene-tab';

const MainSceneScreen = () => {
  const { t } = useTranslation();
  const layout = useWindowDimensions();

  const navigation =
    useNavigation<NavigationProp<SceneRouteStackParamList, 'MainScene'>>();

  const { currentHome, setCurrentHome } = useHomeStore();

  const hasCurrentHomeId = storage.contains(CURRENT_HOME_ID_KEY);
  const hasCurrentHomeRole = storage.contains(CURRENT_HOME_ROLE_KEY);
  const currentHomeId = storage.getNumber(CURRENT_HOME_ID_KEY);
  const currentHomeRole = storage.getString(CURRENT_HOME_ROLE_KEY);

  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const routes = useMemo(
    () => [
      { key: 'tapToRun', title: t(i18nKeys.scene.tapToRun) },
      { key: 'automations', title: t(i18nKeys.scene.automations) },
    ],
    [t],
  );

  const renderScene = useMemo(() => {
    return SceneMap({
      tapToRun: () => <MomentSceneTab estateId={currentHomeId as number} />,
      automations: () => (
        <AutomationSceneTab estateId={currentHomeId as number} />
      ),
    });
  }, [currentHomeId]);

  useQuery({
    queryKey: ['home/get-by-id', { id: currentHomeId }],
    queryFn: () => {
      const getHomeByIdPromise = async () => {
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
      };

      return getHomeByIdPromise();
    },
    retry: false,
    enabled: !!currentHomeId,
  });

  return (
    <MainLayout
      title={t(i18nKeys.scene.title)}
      center={
        <Pressable
          className="flex-row items-center justify-center"
          onPress={() => setIsVisible(true)}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
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
      right={
        <AddIcon
          width={30}
          height={30}
          onPress={() => {
            if (routes[index].key === 'tapToRun') {
              navigation.navigate('MomentScene', {
                screen: 'CreateMomentStack',
              });
            } else {
              navigation.navigate('AutomationScene', {
                screen: 'CreateAutomationStack',
              });
            }
          }}
          style={{
            display:
              hasCurrentHomeRole && currentHomeRole !== EHomeRole.Member
                ? 'flex'
                : 'none',
          }}
        />
      }
    >
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        className="h-full flex-1"
      >
        {hasCurrentHomeId && (
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
                  <Text
                    style={{
                      color: focused ? colors.primary : 'gray',
                      opacity: focused ? 1 : 0.5,
                      fontWeight: '500',
                      fontSize: 13,
                      textAlign: 'center',
                    }}
                  >
                    {route.title}
                  </Text>
                )}
              />
            )}
          />
        )}
      </ImageBackground>
      <HomeListModal isVisible={isVisible} setIsVisible={setIsVisible} />
    </MainLayout>
  );
};

export default MainSceneScreen;
