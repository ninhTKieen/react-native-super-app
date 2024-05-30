import { NavigationProp, useNavigation } from '@react-navigation/native';
import AddRoundIcon from '@src/assets/home-iot/common/add-round-thin.svg';
import ClockOutlineIcon from '@src/assets/home-iot/common/clock-outline.svg';
import { storage } from '@src/common/mmkv.storage';
import { DeviceIcons } from '@src/components/devices-icon';
import GradientButton from '@src/components/gradient-button';
import IconGeneral from '@src/components/icon-general';
import MainLayout from '@src/components/main.layout';
import { CURRENT_HOME_ID_KEY } from '@src/configs/constant/constant.config';
import globalStyles from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { CreateAutomationStackParamList } from '@src/configs/routes/scene.route';
import { IDevice } from '@src/features/devices/device.model';
import {
  EAutomationSceneConditionsType,
  ICreateAutomationScene,
} from '@src/features/scenes/scene.model';
import sceneService from '@src/features/scenes/scene.service';
import { useDeviceName } from '@src/hooks/use-device-name.hook';
import { cronStringToTimeAndDays } from '@src/utils/common.util';
import { formatTime } from '@src/utils/date.util';
import { DeviceValueState } from '@src/utils/device.util';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Swipeable } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import AutomationConditionModal from '../components/scene-automation-condition-modal';
import SelectAutomationActionModal from '../components/select-automation-action-modal';
import SelectConditionTypeModal from '../components/select-condition-type-modal';

const CreateAutomationSceneScreen = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const form = useFormContext<ICreateAutomationScene>();

  const navigation =
    useNavigation<NavigationProp<CreateAutomationStackParamList>>();

  const [isAutoCondModal, setIsAutoCondModal] = useState(false);
  const [conditionTypeModal, setConditionTypeModal] = useState(false);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);

  const currentHomeId = storage.getNumber(CURRENT_HOME_ID_KEY);

  const devices = queryClient.getQueryData<IDevice[]>([
    'devices/get-all',
    { homeId: currentHomeId },
  ]);

  const createAutomationMutation = useMutation({
    mutationFn: () =>
      sceneService.createAutomationScene(
        currentHomeId as number,
        form.getValues(),
      ),
    onSuccess: () => {
      navigation.goBack();
      queryClient.refetchQueries({
        queryKey: ['scenes/automations/get-all', { estateId: currentHomeId }],
      });
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.scene.createSuccess),
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.errors.common.errorOccurred),
        text2: t(i18nKeys.errors.common.tryAgain),
      });
    },
  });

  const { DeviceNames } = useDeviceName();

  const renderHiddenItem = (index: number, type: 'conditions' | 'actions') => {
    return (
      <Pressable
        onPress={() => {
          if (type === 'conditions') {
            const conditions = form.watch('conditions');

            form.setValue(
              'conditions',
              conditions?.filter((_, i) => i !== index) || [],
            );
          } else {
            const actions = form.watch('actions');

            form.setValue(
              'actions',
              actions?.filter((_, i) => i !== index) || [],
            );
          }
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: '100%',
        }}
      >
        <Text
          style={{
            paddingHorizontal: 30,
            paddingVertical: 20,
            color: 'red',
          }}
        >
          {t(i18nKeys.common.delete)}
        </Text>
      </Pressable>
    );
  };

  return (
    <MainLayout isGoBack title={t(i18nKeys.scene.automation.create)}>
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        style={styles.container}
      >
        <View className="relative mx-3 mt-5 h-[60] flex-row items-center rounded-xl border-2 border-white bg-[#F7F7F799]">
          <Text className="absolute -top-2 left-4 z-50 bg-[#F7F7F799] font-semibold text-[#89B05F]">
            {t(i18nKeys.scene.editName)}
          </Text>
          <TextInput
            value={form.watch('name')}
            onChangeText={(text) => form.setValue('name', text)}
            placeholder={t(i18nKeys.scene.editName)}
            className="w-full p-3 text-[#484C63]"
          />
        </View>

        <View
          className="m-[10] rounded-2xl border-2 border-white bg-[#F7F7F7] p-[10]"
          style={styles.shadowContainer}
        >
          <View className="flex-row items-center justify-between">
            <Pressable
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => setConditionTypeModal(true)}
            >
              <Text className="font-semibold text-[#89B05F]">
                {form.watch('conditionsType') ===
                EAutomationSceneConditionsType.ALL
                  ? t(i18nKeys.scene.automation.allConditionsMet)
                  : t(i18nKeys.scene.automation.anyConditionMet)}
              </Text>

              <IconGeneral
                type="MaterialCommunityIcons"
                name="menu-down"
                size={20}
                style={{ marginLeft: 5, color: '#89B05F' }}
              />
            </Pressable>

            <Pressable
              onPress={() => {
                setIsAutoCondModal(true);
              }}
              className="flex-row items-center rounded-2xl border border-[#696969] px-[10] py-1"
            >
              <Text className="mx-1 text-sm text-[#696969]">
                {t(i18nKeys.common.add)}
              </Text>

              <AddRoundIcon className="mr-1" />
            </Pressable>
          </View>

          <View style={{ maxHeight: '80%', marginTop: 10 }}>
            <DraggableFlatList
              showsVerticalScrollIndicator={false}
              data={form.watch('conditions') || []}
              keyExtractor={(_item, index) => index.toString()}
              onDragEnd={({ data }) => {
                form.setValue('conditions', data);
              }}
              renderItem={({ item: condition, drag, getIndex }) => {
                const timeCronJob = cronStringToTimeAndDays(
                  condition.schedule as string,
                );

                const curDevice = devices?.find(
                  (device) => device.id === condition.deviceId,
                );
                const deviceType = curDevice?.type;
                const deviceIndex = curDevice?.metaData?.eps?.findIndex(
                  (ep) => ep === condition.ep,
                );

                return (
                  <Swipeable
                    renderRightActions={() =>
                      renderHiddenItem(getIndex() as number, 'conditions')
                    }
                    leftThreshold={Infinity}
                    onSwipeableOpen={(direction) => {
                      if (direction === 'right') {
                        // Swiped from right
                      } else if (direction === 'left') {
                        // Swiped from left
                      }
                    }}
                  >
                    <Pressable
                      onLongPress={drag}
                      onPress={() => {
                        if (condition.ep) {
                          navigation.navigate('CreateEditDeviceConditionFunc', {
                            condition,
                            currentIndex: getIndex(),
                          });
                        } else {
                          navigation.navigate('CreateAddCondition', {
                            type: condition.schedule
                              ? 'SCHEDULE'
                              : condition.ep
                              ? 'DEVICE_CHANGES'
                              : 'WEATHER_CHANGES',
                            currentIndex: getIndex(),
                            mode: 'EDIT',
                          });
                        }
                      }}
                    >
                      <View
                        className="mx-[2px] my-[5px] items-center justify-center rounded-xl border-2 border-white px-[5px]"
                        style={styles.shadowRowFont}
                      >
                        {condition.schedule && (
                          <View className="my-[10px] flex-row items-center justify-between">
                            <ClockOutlineIcon width={30} height={30} />
                            <View className="mx-[10] flex-1 flex-row justify-between">
                              <View>
                                <Text className="text-base font-semibold text-[#44A093]">
                                  {t(i18nKeys.scene.automation.timetable)}
                                </Text>
                                <Text className="text-xs text-[#696969]">
                                  {formatTime({
                                    hours: Number(timeCronJob?.hour),
                                    minutes: Number(timeCronJob?.minute),
                                  })}
                                </Text>
                              </View>

                              <View>
                                <Text className="text-right text-base font-semibold text-[#89B05F]">
                                  {t(i18nKeys.scene.automation.repeat)}
                                </Text>

                                <Text className="text-xs text-[#696969]">
                                  {timeCronJob?.daysText}
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                        {condition.ep && (
                          <View className="my-[10px] flex-row items-center justify-start">
                            {DeviceIcons.get(deviceType as any)?.(30, 30)}
                            <View className="mx-[10] flex-1 flex-row items-start justify-between">
                              <View>
                                <Text
                                  numberOfLines={1}
                                  className="text-base font-semibold text-[#44A093]"
                                >
                                  {
                                    DeviceNames[
                                      deviceType as keyof typeof DeviceNames
                                    ]
                                  }{' '}
                                  (
                                  {deviceIndex !== -1
                                    ? `${(deviceIndex as number) + 1}`
                                    : ''}
                                  )
                                </Text>

                                <Text className="text-xs font-medium text-[#696969]">
                                  {curDevice?.modelName}
                                </Text>
                              </View>

                              <View>
                                <Text className="text-right text-base font-semibold text-[#89B05F]">
                                  {t(i18nKeys.scene.automation.status)}
                                </Text>
                                <Text className="text-right text-xs text-[#696969]">
                                  {DeviceValueState(
                                    condition.value,
                                    deviceType as any,
                                    condition.attribute,
                                    condition.compare,
                                  )}
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    </Pressable>
                  </Swipeable>
                );
              }}
            />
          </View>
        </View>

        <View
          className="m-[10] rounded-2xl border-2 border-white bg-[#F7F7F7] p-[10]"
          style={styles.shadowContainer}
        >
          <View className="flex-row items-center justify-between">
            <Text className="z-50 font-semibold text-[#89B05F]">
              {t(i18nKeys.scene.action)}
            </Text>

            <Pressable
              onPress={() => setIsActionModalVisible(true)}
              className="flex-row items-center rounded-2xl border border-[#696969] px-[10] py-1"
            >
              <Text className="mx-1 text-sm text-[#696969]">
                {t(i18nKeys.common.add)}
              </Text>

              <AddRoundIcon className="mr-1" />
            </Pressable>
          </View>

          <View style={{ maxHeight: '80%', marginTop: 10 }}>
            <DraggableFlatList
              showsVerticalScrollIndicator={false}
              data={form.watch('actions') || []}
              keyExtractor={(_item, index) => index.toString()}
              onDragEnd={({ data }) => {
                const sortedData = data.map((item, index) => ({
                  ...item,
                  index: index + 1,
                }));
                form.setValue('actions', sortedData);
              }}
              renderItem={({ item: action, drag, getIndex }) => {
                const curDevice = devices?.find(
                  (device) => device.id === action.deviceId,
                );
                const deviceType = curDevice?.type;
                const deviceIndex = curDevice?.metaData?.eps?.findIndex(
                  (ep) => ep === action.ep,
                );

                return (
                  <Swipeable
                    renderRightActions={() =>
                      renderHiddenItem(getIndex() as number, 'actions')
                    }
                    leftThreshold={Infinity}
                    onSwipeableOpen={(direction) => {
                      if (direction === 'right') {
                        // Swiped from right
                      } else if (direction === 'left') {
                        // Swiped from left
                      }
                    }}
                  >
                    <Pressable
                      onLongPress={drag}
                      onPress={() => {
                        if (action.delay) {
                          navigation.navigate('CreateAutomationAction', {
                            type: 'DELAY',
                            actionValues: form.watch('actions'),
                            mode: 'EDIT',
                            currentIndex: getIndex(),
                          });
                        } else if (action.ep) {
                          navigation.navigate('CreateEditDeviceActionFunc', {
                            action,
                            currentIndex: getIndex(),
                          });
                        }
                      }}
                    >
                      <View
                        className="mx-[2px] my-[5px] items-center justify-center rounded-xl border-2 border-white px-[5px]"
                        style={styles.shadowRowFont}
                      >
                        {action.delay && (
                          <View className="my-[10px] flex-row items-center justify-between">
                            <ClockOutlineIcon width={30} height={30} />
                            <View className="mx-[10] flex-1 flex-row justify-between">
                              <View>
                                <Text className="text-base font-semibold text-[#44A093]">
                                  {t(i18nKeys.scene.delay)}
                                </Text>
                              </View>

                              <View>
                                <Text className="text-right text-base font-semibold text-[#89B05F]">
                                  {action.delay / 1000}s
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}

                        {action.ep && (
                          <View className="my-[10px] flex-row items-center justify-start">
                            {DeviceIcons.get(deviceType as any)?.(30, 30)}
                            <View className="mx-[10] flex-1 flex-row items-start justify-between">
                              <View>
                                <Text
                                  numberOfLines={1}
                                  className="text-base font-semibold text-[#44A093]"
                                >
                                  {
                                    DeviceNames[
                                      deviceType as keyof typeof DeviceNames
                                    ]
                                  }{' '}
                                  (
                                  {deviceIndex !== -1
                                    ? `${(deviceIndex as number) + 1}`
                                    : ''}
                                  )
                                </Text>

                                <Text className="text-xs font-medium text-[#696969]">
                                  {curDevice?.modelName}
                                </Text>
                              </View>

                              <View>
                                <Text className="text-right text-base font-semibold text-[#89B05F]">
                                  {t(i18nKeys.scene.automation.status)}
                                </Text>
                                <Text className="text-right text-xs text-[#696969]">
                                  {DeviceValueState(
                                    action.value,
                                    deviceType as any,
                                    action.attribute,
                                  )}
                                </Text>
                              </View>
                            </View>
                          </View>
                        )}
                      </View>
                    </Pressable>
                  </Swipeable>
                );
              }}
            />
          </View>
        </View>

        <GradientButton
          title={t(i18nKeys.common.save)}
          additionalStyles={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 20,
          }}
          onPress={() => {
            createAutomationMutation.mutate();
          }}
        />
      </ImageBackground>

      <SelectConditionTypeModal
        isVisible={conditionTypeModal}
        setIsVisible={setConditionTypeModal}
      />

      <SelectAutomationActionModal
        isVisible={isActionModalVisible}
        setIsVisible={setIsActionModalVisible}
        actionValues={form.watch('actions')}
        mode="CREATE"
      />

      <AutomationConditionModal
        isVisible={isAutoCondModal}
        setIsVisible={setIsAutoCondModal}
        mode="CREATE"
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },

  shadowContainer: {
    maxHeight: '35%',
    ...globalStyles.commonShadowContainer,
    shadowOpacity: 1,
    shadowRadius: 10,
  },

  shadowRowFont: {
    backgroundColor: '#F7F7F7',
    ...globalStyles.commonShadowContainer,
    shadowOpacity: 1,
  },
});

export default CreateAutomationSceneScreen;
