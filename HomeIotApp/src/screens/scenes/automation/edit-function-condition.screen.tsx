import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import MainLayout from '@src/components/main.layout';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { CreateAutomationStackParamList } from '@src/configs/routes/scene.route';
import { useAppStore } from '@src/features/app/app.store';
import { EDeviceType } from '@src/features/devices/device.model';
import deviceService from '@src/features/devices/device.service';
import {
  ESceneConditionCompare,
  ICreateAutomationScene,
  IUpdateAutomationScene,
} from '@src/features/scenes/scene.model';
import { getDeviceConditions } from '@src/utils/device.util';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import ZigbeeDoorSensorFunc from '../components/devices/sensors/zigbee-door-sensor-func';
import ZigbeeCurtainSwitchesFunc from '../components/devices/switches/zigbee-curtain-switches-func';
import ZigbeeDimmersFunc from '../components/devices/switches/zigbee-dimmers-func';
import ZigbeeSwitchesFunc from '../components/devices/switches/zigbee-switches-func';
import SelectMomentOptionModal from '../components/select-moment-option-modal';

const EditFunctionConditionScreen = () => {
  const { t } = useTranslation();

  const navigation = useNavigation();
  const route =
    useRoute<
      RouteProp<CreateAutomationStackParamList, 'CreateEditDeviceConditionFunc'>
    >();

  const form = useFormContext<
    ICreateAutomationScene | IUpdateAutomationScene
  >();

  const { condition, currentIndex } = route.params;

  const { setLoading } = useAppStore();

  const [deviceActions, setDeviceActions] = useState<
    {
      compare?: ESceneConditionCompare;
      value: string;
      ep: string;
      attribute: string;
      deviceId: string;
    }[]
  >([
    {
      compare: condition.compare,
      value: condition.value as string,
      ep: condition.ep as string,
      attribute: condition.attribute as string,
      deviceId: condition.deviceId as string,
    },
  ]);
  const [deviceConditions, setDeviceConditions] = useState<any>();
  const [curDevice, setCurDevice] = useState<{
    curDevice: {
      ep: string;
      attribute: string;
      deviceId: string;
    };
    options: {
      label: string;
      value: string;
    }[];
  }>();
  const [isVisible, setIsVisible] = useState(false);

  const deviceDetailQuery = useQuery({
    queryKey: ['devices/get', { deviceId: condition.deviceId as string }],
    queryFn: () => {
      const getDeviceDetailPromise = async () => {
        try {
          const response = await deviceService.get(
            condition.deviceId as string,
          );
          setDeviceConditions(getDeviceConditions(response) as any);
          return response;
        } catch (error) {
          throw Promise.reject();
        } finally {
          setLoading(false);
        }
      };

      return getDeviceDetailPromise();
    },
    enabled: !!condition.deviceId,
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
                deviceScenes={deviceConditions}
                isRemoveToggle
                condition={condition}
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
                deviceScenes={deviceConditions}
                isRemoveToggle
                condition={condition}
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
                deviceScenes={deviceConditions}
                isRemoveToggle
              />
            )}

          {deviceDetailQuery.data &&
            [EDeviceType.ZIGBEE_SENSOR_DOOR].includes(
              deviceDetailQuery.data?.type as EDeviceType,
            ) && (
              <ZigbeeDoorSensorFunc
                device={deviceDetailQuery.data}
                deviceDetailQuery={deviceDetailQuery}
                deviceActions={deviceActions}
                deviceScenes={deviceConditions}
                setCurDevice={setCurDevice}
                setIsVisible={setIsVisible}
              />
            )}

          <Button
            buttonColor={colors.primary}
            style={{
              margin: 20,
            }}
            mode="contained"
            onPress={() => {
              const currentConditions = form.watch('conditions') || [];

              console.log('deviceActions', deviceActions);

              const newConditions = currentConditions?.map(
                (item: any, index: number) => {
                  if (index === currentIndex) {
                    return {
                      ...item,
                      compare: deviceActions[0].compare,
                      value: String(deviceActions[0].value),
                      ep: deviceActions[0].ep,
                      attribute: deviceActions[0].attribute,
                      deviceId: deviceActions[0].deviceId,
                    };
                  }
                  return item;
                },
              );

              form.setValue('conditions', newConditions);

              navigation.goBack();
            }}
          >
            {t(i18nKeys.common.save)}
          </Button>
        </View>

        <SelectMomentOptionModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          options={curDevice?.options as any}
          deviceType={deviceDetailQuery.data?.type as string}
          onOptionPress={(option) => {
            setIsVisible(false);
            setDeviceActions((prev) => {
              const index = prev.findIndex(
                (item) =>
                  item.ep === curDevice?.curDevice.ep &&
                  item.attribute === curDevice?.curDevice.attribute,
              );

              if (index !== -1) {
                prev.splice(index, 1);
                return [
                  ...prev,
                  {
                    value: option,
                    ep: curDevice?.curDevice.ep as string,
                    attribute: curDevice?.curDevice.attribute as string,
                    deviceId: curDevice?.curDevice.deviceId as string,
                  },
                ];
              } else {
                return [
                  ...prev,
                  {
                    value: option,
                    ep: curDevice?.curDevice.ep as string,
                    attribute: curDevice?.curDevice.attribute as string,
                    deviceId: curDevice?.curDevice.deviceId as string,
                  },
                ];
              }
            });
          }}
        />
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

export default EditFunctionConditionScreen;
