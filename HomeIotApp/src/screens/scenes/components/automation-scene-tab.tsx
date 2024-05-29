import { useDeviceOrientation } from '@react-native-community/hooks';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import PowerOffIcon from '@src/assets/home-iot/common/off-icon.svg';
import PowerOnIcon from '@src/assets/home-iot/common/on-icon.svg';
import { storage } from '@src/common/mmkv.storage';
import GradientButton from '@src/components/gradient-button';
import IconGeneral from '@src/components/icon-general';
import { CURRENT_HOME_ROLE_KEY } from '@src/configs/constant/constant.config';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { SceneRouteStackParamList } from '@src/configs/routes/scene.route';
import { useAppStore } from '@src/features/app/app.store';
import { EHomeRole } from '@src/features/home/home.model';
import sceneService from '@src/features/scenes/scene.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RefreshControl } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

type TAutomationSceneTabProps = {
  estateId: number;
};

const AutomationSceneTab = ({ estateId }: TAutomationSceneTabProps) => {
  const { t } = useTranslation();

  const currentHomeRole = storage.getString(CURRENT_HOME_ROLE_KEY);

  const { width, height } = useWindowDimensions();
  const orientation = useDeviceOrientation();

  const { setLoading } = useAppStore();

  const getAllSceneQuery = useQuery({
    queryKey: ['scenes/automations/get-all', { estateId }],
    queryFn: () => sceneService.getAllAutomationsScene(estateId),
    enabled: !!estateId,
  });

  const updateSceneStateMutation = useMutation({
    mutationFn: (data: { enabled: boolean; sceneId: number }) => {
      setLoading(true);
      return sceneService.updateAutomationSceneState(estateId, data.sceneId, {
        enabled: data.enabled,
      });
    },
    onSuccess: () => {
      setLoading(false);
      getAllSceneQuery.refetch();
      Toast.show({
        type: 'info',
        text1: t(i18nKeys.scene.executeMoment),
      });
    },
    onError: () => {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.errors.common.errorOccurred),
        text2: t(i18nKeys.errors.common.tryAgain),
      });
    },
  });

  const navigation = useNavigation<NavigationProp<SceneRouteStackParamList>>();

  return (
    <View style={styles.container}>
      <FlatList
        data={getAllSceneQuery.data || []}
        keyExtractor={(item: any) => item.id.toString()}
        key={orientation === 'portrait' ? 'V' : 'H'}
        numColumns={orientation === 'portrait' ? 2 : 4}
        refreshControl={
          <RefreshControl
            refreshing={getAllSceneQuery.isFetching}
            onRefresh={() => {
              getAllSceneQuery.refetch();
            }}
          />
        }
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('AutomationScene', {
                  screen: 'UpdateAutomationStack',
                  params: {
                    screen: 'UpdateAutomation',
                    params: { sceneId: item.id },
                  },
                });
              }}
              style={{
                borderRadius: 10,
                margin: 10,
                backgroundColor: colors.white,
                width:
                  orientation === 'portrait' ? width / 2 - 20 : width / 4 - 20,
                height: 150,
                overflow: 'hidden',
              }}
            >
              <FastImage
                source={require('@src/assets/home-iot/living-room.jpeg')}
                className="h-2/3 w-full"
              />

              <View className="h-1/3 w-full flex-row items-center justify-between p-1">
                <Text
                  numberOfLines={2}
                  className="w-5/6 text-sm font-medium text-[#696969]"
                >
                  {item.name}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    updateSceneStateMutation.mutate({
                      sceneId: item.id,
                      enabled: !item.enabled,
                    });
                  }}
                >
                  {item.enabled ? (
                    <PowerOnIcon width={30} height={30} />
                  ) : (
                    <PowerOffIcon width={30} height={30} />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View
            style={{
              minHeight: height * 0.3,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <IconGeneral
              type="Feather"
              name="inbox"
              size={56}
              color={'#ced4da'}
            />

            <Text style={{ fontSize: 16, fontWeight: '500', color: '#adb5bd' }}>
              {t(i18nKeys.scene.empty)}
            </Text>

            <GradientButton
              onPress={() => {
                navigation.navigate('AutomationScene', {
                  screen: 'CreateAutomationStack',
                  params: {
                    screen: 'CreateAutomation',
                  },
                });
              }}
              title={t(i18nKeys.scene.add)}
              additionalStyles={{
                marginTop: 10,
                display: currentHomeRole === EHomeRole.Member ? 'none' : 'flex',
              }}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },

  item: {
    borderRadius: 20,
    height: 110,
    overflow: 'hidden',
  },

  backgroundImage: {
    flex: 1,
    height: 110,
    padding: 10,
  },
});

export default AutomationSceneTab;
