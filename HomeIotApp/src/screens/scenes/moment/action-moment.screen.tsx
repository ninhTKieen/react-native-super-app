import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import GradientButton from '@src/components/gradient-button';
import MainLayout from '@src/components/main.layout';
import { i18nKeys } from '@src/configs/i18n';
import {
  CreateMomentStackParamList,
  UpdateMomentStackParamList,
} from '@src/configs/routes/scene.route';
import { EDeviceType } from '@src/features/devices/device.model';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ImageBackground, View } from 'react-native';
import { TimerPicker } from 'react-native-timer-picker';

import ActionDeviceList from '../components/action-device-list';

type CreateOrUpdateNavigationProp =
  | StackNavigationProp<CreateMomentStackParamList, 'CreateMomentAction'>
  | StackNavigationProp<UpdateMomentStackParamList, 'UpdateMomentAction'>;

const ActionMomentSceneScreen = () => {
  const navigation = useNavigation<CreateOrUpdateNavigationProp>();
  const route =
    useRoute<RouteProp<CreateMomentStackParamList, 'CreateMomentAction'>>();
  const { type, currentIndex, actionValues, mode } = route.params;

  const form = useFormContext();

  const { t } = useTranslation();

  const millisecondsToHMS = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return { hours, minutes, seconds: remainingSeconds };
  };

  const [time, setTime] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
  }>(
    actionValues
      ? millisecondsToHMS(actionValues[currentIndex || 0].delay || 0)
      : { hours: 0, minutes: 0, seconds: 0 },
  );

  return (
    <MainLayout
      isGoBack
      title={
        type === 'DELAY'
          ? t(i18nKeys.scene.delay)
          : type === 'RUN_DEVICE'
          ? t(i18nKeys.scene.runDevice)
          : t(i18nKeys.scene.selectAuto)
      }
    >
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        style={{ flex: 1, height: '100%' }}
      >
        {type === 'DELAY' && (
          <View style={{ alignItems: 'center' }}>
            <TimerPicker
              padWithNItems={2}
              hourLabel=":"
              minuteLabel=":"
              secondLabel=""
              initialHours={time?.hours || 0}
              initialMinutes={time?.minutes || 0}
              initialSeconds={time?.seconds || 0}
              onDurationChange={(duration) => {
                setTime(duration);
              }}
              styles={{
                backgroundColor: 'transparent',
              }}
            />
          </View>
        )}

        {type === 'RUN_DEVICE' && (
          <ActionDeviceList
            onPressDeviceItem={(device) => {
              if (
                ![
                  EDeviceType.ZIGBEE_FREELOCALTE_SWITCH_2G,
                  EDeviceType.ZIGBEE_FREELOCALTE_SWITCH_4G,
                ].includes(device.type)
              ) {
                if (mode === 'CREATE') {
                  (
                    navigation as StackNavigationProp<CreateMomentStackParamList>
                  ).replace('CreateMomentSelectDeviceFunction', {
                    device,
                  });
                } else if (mode === 'UPDATE') {
                  (
                    navigation as StackNavigationProp<UpdateMomentStackParamList>
                  ).replace('UpdateMomentSelectDeviceFunction', {
                    device,
                  });
                }
              }
            }}
          />
        )}

        <View className="my-2 items-center">
          <GradientButton
            additionalStyles={{ width: '90%' }}
            title={t(i18nKeys.common.save)}
            onPress={() => {
              const newAction = {
                index: currentIndex
                  ? currentIndex
                  : actionValues?.length + 1 || 0,
                delay: time
                  ? (time?.hours * 3600 + time?.minutes * 60 + time?.seconds) *
                    1000
                  : null,
              };
              if (type === 'DELAY') {
                if (time) {
                  const curActions = form.watch('actions');
                  if (mode === 'EDIT') {
                    form.setValue(
                      'actions',
                      curActions?.map((action: any, index: number) => {
                        if (index === currentIndex) {
                          return newAction;
                        }
                        return action;
                      }),
                    );
                  } else {
                    form.setValue(
                      'actions',
                      [...(curActions || []), ...[newAction]].map(
                        (action, index) => ({
                          ...action,
                          index: index + 1,
                        }),
                      ),
                      {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      },
                    );
                  }
                }
              }
              navigation.goBack();
            }}
          />
        </View>
      </ImageBackground>
    </MainLayout>
  );
};

export default ActionMomentSceneScreen;
