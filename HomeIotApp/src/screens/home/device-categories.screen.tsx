import MainLayout from '@src/components/main.layout';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import deviceService from '@src/features/devices/device.service';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import DeviceCategoryList from './components/device-category-list';

const DeviceCategoriesScreen = () => {
  const { t } = useTranslation();

  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();

  const deviceCategoriesQuery = useQuery({
    queryKey: ['device-categories/get-all'],
    queryFn: () => deviceService.getAllDeviceCategories(),
  });

  const routes = [
    ...(deviceCategoriesQuery.data?.map((deviceCategory, categIndex) => ({
      key: categIndex.toString(),
      title: t(
        i18nKeys.device.parentType[
          deviceCategory.name as keyof typeof i18nKeys.device.parentType
        ] ?? deviceCategory.name,
      ),
    })) || []),
  ];

  const renderScene = useMemo(() => {
    const scenes: any = {};

    deviceCategoriesQuery.data?.forEach((deviceCategory, categIndex) => {
      scenes[categIndex.toString()] = () => (
        <DeviceCategoryList deviceTypes={deviceCategory.deviceProfiles} />
      );
    });

    return SceneMap(scenes);
  }, [deviceCategoriesQuery.data]);

  return (
    <MainLayout title={t(i18nKeys.device.add)} isGoBack>
      <View style={styles.container}>
        {deviceCategoriesQuery.isSuccess && (
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(_props) => (
              <TabBar
                {..._props}
                indicatorStyle={{
                  backgroundColor: 'transparent',
                  borderRadius: 1,
                }}
                style={{ backgroundColor: 'transparent' }}
                tabStyle={{
                  alignItems: 'center',
                }}
                scrollEnabled={true}
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
                android_ripple={{ color: 'transparent' }}
              />
            )}
          />
        )}
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.white,
  },
});

export default DeviceCategoriesScreen;
