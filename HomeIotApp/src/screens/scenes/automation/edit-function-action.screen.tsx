import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import GradientButton from '@src/components/gradient-button';
import MainLayout from '@src/components/main.layout';
import { i18nKeys } from '@src/configs/i18n';
import { UpdateAutomationStackParamList } from '@src/configs/routes/scene.route';
import { useAppStore } from '@src/features/app/app.store';
import { EDeviceType } from '@src/features/devices/device.model';
import deviceService from '@src/features/devices/device.service';
import {
  ICreateAutomationScene,
  IUpdateAutomationScene,
} from '@src/features/scenes/scene.model';
import { getDeviceConditions } from '@src/utils/device.util';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImageBackground, StyleSheet, View } from 'react-native';

import ZigbeeCurtainSwitchesFunc from '../components/devices/switches/zigbee-curtain-switches-func';
import ZigbeeDimmersFunc from '../components/devices/switches/zigbee-dimmers-func';
import ZigbeeSwitchesFunc from '../components/devices/switches/zigbee-switches-func';

const EditFunctionActionScreen = () => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<
      NavigationProp<
        UpdateAutomationStackParamList,
        'UpdateEditDeviceActionFunc'
      >
    >();
  const route =
    useRoute<
      RouteProp<UpdateAutomationStackParamList, 'UpdateEditDeviceActionFunc'>
    >();

  const form = useFormContext<
    ICreateAutomationScene | IUpdateAutomationScene
  >();

  const { action, currentIndex } = route.params;

  const { setLoading } = useAppStore();

  const [deviceActions, setDeviceActions] = useState<
    {
      value: string;
      ep: string;
      attribute: string;
      deviceId: string;
    }[]
  >([
    {
      value: action.value as string,
      ep: action.ep as string,
      attribute: action.attribute as string,
      deviceId: action.deviceId as string,
    },
  ]);
  const [deviceScenes, setDeviceScenes] = useState<any>();

  const deviceDetailQuery = useQuery({
    queryKey: ['devices/get', { deviceId: action.deviceId as string }],
    queryFn: () => {
      const getDeviceDetailPromise = async () => {
        try {
          const response = await deviceService.get(action.deviceId as string);
          setDeviceScenes(getDeviceConditions(response) as any);
          return response;
        } catch (error) {
          throw Promise.reject();
        } finally {
          setLoading(false);
        }
      };

      return getDeviceDetailPromise();
    },
    enabled: !!action.deviceId,
  });

  return (
    <MainLayout isGoBack title={t(i18nKeys.scene.selectFunction)}>
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        style={styles.container}
      >
        <View
          className="m-3 rounded-2xl border-2 border-white bg-[#F7F7F7]"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          {deviceDetailQuery.data &&
            [
              EDeviceType.ZIGBEE_SWITCH_1G,
              EDeviceType.ZIGBEE_SWITCH_2G,
              EDeviceType.ZIGBEE_SWITCH_3G,
            ].includes(deviceDetailQuery.data?.type as EDeviceType) && (
              <ZigbeeSwitchesFunc
                device={deviceDetailQuery.data}
                deviceDetailQuery={deviceDetailQuery}
                deviceActions={deviceActions}
                setDeviceActions={setDeviceActions}
                deviceScenes={deviceScenes}
                condition={action}
              />
            )}

          {deviceDetailQuery.data &&
            [
              EDeviceType.ZIGBEE_DIMMERSWITCH_1G,
              EDeviceType.ZIGBEE_DIMMERSWITCH_2G,
            ].includes(deviceDetailQuery.data?.type as EDeviceType) && (
              <ZigbeeDimmersFunc
                device={deviceDetailQuery.data}
                deviceDetailQuery={deviceDetailQuery}
                deviceActions={deviceActions}
                setDeviceActions={setDeviceActions}
                deviceScenes={deviceScenes}
                condition={action}
              />
            )}

          {deviceDetailQuery.data &&
            [
              EDeviceType.ZIGBEE_CURTAIN_SWITCH_1G,
              EDeviceType.ZIGBEE_CURTAIN_SWITCH_2G,
            ].includes(deviceDetailQuery.data?.type as EDeviceType) && (
              <ZigbeeCurtainSwitchesFunc
                device={deviceDetailQuery.data}
                deviceDetailQuery={deviceDetailQuery}
                deviceActions={deviceActions}
                setDeviceActions={setDeviceActions}
                deviceScenes={deviceScenes}
                condition={action}
              />
            )}

          <GradientButton
            title={t(i18nKeys.common.save)}
            onPress={() => {
              const currentActions = form.watch('actions') || [];

              const newActions = currentActions?.map(
                (item: any, index: number) => {
                  if (index === currentIndex) {
                    return {
                      ...item,
                      value: String(deviceActions[0].value),
                      ep: deviceActions[0].ep,
                      attribute: deviceActions[0].attribute,
                      deviceId: deviceActions[0].deviceId,
                    };
                  }
                  return item;
                },
              );

              form.setValue('actions', newActions);

              navigation.goBack();
            }}
            additionalStyles={{
              width: '90%',
              alignSelf: 'center',
              marginBottom: 20,
              marginTop: 40,
            }}
          />
        </View>
      </ImageBackground>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
});

export default EditFunctionActionScreen;
