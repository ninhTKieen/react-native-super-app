import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import GradientButton from '@src/components/gradient-button';
import MainLayout from '@src/components/main.layout';
import { i18nKeys } from '@src/configs/i18n';
import { CreateMomentStackParamList } from '@src/configs/routes/scene.route';
import { useAppStore } from '@src/features/app/app.store';
import { EDeviceType } from '@src/features/devices/device.model';
import deviceService from '@src/features/devices/device.service';
import { getDeviceConditions } from '@src/utils/device.util';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImageBackground, StyleSheet, View } from 'react-native';

import ZigbeeCurtainSwitchesFunc from '../components/devices/switches/zigbee-curtain-switches-func';
import ZigbeeDimmersFunc from '../components/devices/switches/zigbee-dimmers-func';
import ZigbeeSwitchesFunc from '../components/devices/switches/zigbee-switches-func';

const SelectDeviceFunctionScreen = () => {
  const { setLoading } = useAppStore();

  const { t } = useTranslation();

  const [deviceActions, setDeviceActions] = useState<
    {
      value: string;
      ep: string;
      attribute: string;
      deviceId: string;
    }[]
  >([]);

  const [deviceScenes, setDeviceScenes] = useState<any>();

  const navigation = useNavigation();
  const route =
    useRoute<
      RouteProp<CreateMomentStackParamList, 'CreateMomentSelectDeviceFunction'>
    >();

  const device = route.params.device;

  const form = useFormContext();

  const deviceDetailQuery = useQuery({
    queryKey: ['devices/get', { deviceId: route.params.device.id }],
    queryFn: () => {
      const getDeviceDetailPromise = async () => {
        try {
          const response = await deviceService.get(device.id);
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
    enabled: !!device.id,
  });

  return (
    <MainLayout title={t(i18nKeys.scene.selectFunction)} isGoBack>
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
                device={device}
                deviceDetailQuery={deviceDetailQuery}
                deviceActions={deviceActions}
                setDeviceActions={setDeviceActions}
                deviceScenes={deviceScenes}
              />
            )}

          {deviceDetailQuery.data &&
            [
              EDeviceType.ZIGBEE_DIMMERSWITCH_1G,
              EDeviceType.ZIGBEE_DIMMERSWITCH_2G,
            ].includes(deviceDetailQuery.data?.type as EDeviceType) && (
              <ZigbeeDimmersFunc
                device={device}
                deviceDetailQuery={deviceDetailQuery}
                deviceActions={deviceActions}
                setDeviceActions={setDeviceActions}
                deviceScenes={deviceScenes}
              />
            )}

          {deviceDetailQuery.data &&
            [
              EDeviceType.ZIGBEE_CURTAIN_SWITCH_1G,
              EDeviceType.ZIGBEE_CURTAIN_SWITCH_2G,
            ].includes(deviceDetailQuery.data?.type as EDeviceType) && (
              <ZigbeeCurtainSwitchesFunc
                device={device}
                deviceDetailQuery={deviceDetailQuery}
                deviceActions={deviceActions}
                setDeviceActions={setDeviceActions}
                deviceScenes={deviceScenes}
              />
            )}

          <GradientButton
            title={t(i18nKeys.common.save)}
            onPress={() => {
              const currentLength = form.watch('actions')?.length || 0;
              const currentActions = form.watch('actions') || [];

              const addedDeviceActions = deviceActions?.map(
                (deviceAction, index) => ({
                  index: currentLength + index + 1,
                  deviceId: device.id,
                  ep: deviceAction.ep,
                  attribute: deviceAction.attribute,
                  value: String(deviceAction.value),
                }),
              );

              form.setValue(
                'actions',
                [...currentActions, ...addedDeviceActions].map(
                  (action, index) => ({
                    ...action,
                    index: index + 1,
                  }),
                ),
              );

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
  container: { flex: 1, height: '100%' },

  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SelectDeviceFunctionScreen;
