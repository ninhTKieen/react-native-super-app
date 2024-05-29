import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import AddRoundIcon from '@src/assets/home-iot/common/add-round-thin.svg';
import ClockOutlineIcon from '@src/assets/home-iot/common/clock-outline.svg';
import { storage } from '@src/common/mmkv.storage';
import ConfirmDialog from '@src/components/confirm-dialog';
import { DeviceIcons } from '@src/components/devices-icon';
import IconGeneral from '@src/components/icon-general';
import MainLayout from '@src/components/main.layout';
import { CURRENT_HOME_ID_KEY } from '@src/configs/constant/constant.config';
import globalStyles, { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { UpdateAutomationStackParamList } from '@src/configs/routes/scene.route';
import { useAppStore } from '@src/features/app/app.store';
import { IDevice } from '@src/features/devices/device.model';
import {
  EAutomationSceneConditionsType,
  IUpdateAutomationScene,
} from '@src/features/scenes/scene.model';
import sceneService from '@src/features/scenes/scene.service';
import { useDeviceName } from '@src/hooks/use-device-name.hook';
import { cronStringToTimeAndDays } from '@src/utils/common.util';
import { formatTime } from '@src/utils/date.util';
import { DeviceValueState } from '@src/utils/device.util';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Swipeable } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import AutomationConditionModal from '../components/scene-automation-condition-modal';
import SelectAutomationActionModal from '../components/select-automation-action-modal';
import SelectConditionTypeModal from '../components/select-condition-type-modal';

const UpdateAutomationSceneScreen = () => {
  const queryClient = useQueryClient();
  const { setLoading } = useAppStore();
  const form = useFormContext<IUpdateAutomationScene>();

  const navigation =
    useNavigation<
      NavigationProp<UpdateAutomationStackParamList, 'UpdateAutomation'>
    >();
  const route =
    useRoute<RouteProp<UpdateAutomationStackParamList, 'UpdateAutomation'>>();

  const currentHomeId = storage.getNumber(CURRENT_HOME_ID_KEY);

  const [conditionTypeModal, setConditionTypeModal] = useState(false);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [isAutoCondModal, setIsAutoCondModal] = useState(false);

  const { DeviceNames } = useDeviceName();

  useQuery({
    queryKey: ['scenes/automation/get-by-id', { id: route.params.sceneId }],
    queryFn: () => {
      const getMomentById = async () => {
        setLoading(true);
        try {
          const response = await sceneService.getAutomationSceneById({
            estateId: currentHomeId as number,
            sceneId: route.params.sceneId,
          });
          _.isEmpty(form.getValues()) &&
            Object.keys(response).forEach((key: any) => {
              !!response[key as keyof typeof response] &&
                form.setValue(key, response[key as keyof typeof response], {
                  shouldValidate: true,
                  shouldDirty: true,
                });
            });

          return response;
        } catch (error) {
          Promise.reject(error);
        } finally {
          setLoading(false);
        }
      };

      return getMomentById();
    },
    retryOnMount: false,
  });

  const updateAutomationMutation = useMutation({
    mutationFn: (data: IUpdateAutomationScene) =>
      sceneService.updateAutomationScene(
        currentHomeId as number,
        route.params.sceneId,
        data,
      ),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['scenes/automations/get-all', { estateId: currentHomeId }],
      });
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.scene.updateMoment),
        text2: t(i18nKeys.scene.updateSuccess),
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.errors.common.errorOccurred),
        text2: t(i18nKeys.scene.updateFail),
      });
    },
  });

  const deleteAutomationMutation = useMutation({
    mutationFn: () =>
      sceneService.deleteAutomationScene(
        currentHomeId as number,
        route.params.sceneId,
      ),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['scenes/automations/get-all', { estateId: currentHomeId }],
      });
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.scene.deleteMoment),
        text2: t(i18nKeys.scene.deleteSuccess),
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.errors.common.errorOccurred),
        text2: t(i18nKeys.scene.deleteSuccess),
      });
    },
  });

  const { t } = useTranslation();

  const renderHiddenItem = (index: number, type: 'conditions' | 'actions') => {
    return (
      <Pressable
        onPress={() => {
          if (type === 'conditions') {
            const conditions = form.watch('conditions');

            form.setValue(
              'conditions',
              conditions?.filter((_condition, i) => i !== index) || [],
            );
          } else {
            const actions = sortedActions;

            form.setValue(
              'actions',
              actions?.filter((_action, i) => i !== index) || [],
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

  const devices = queryClient.getQueryData<IDevice[]>([
    'devices/get-all',
    { homeId: currentHomeId },
  ]);

  const actions = form.watch('actions') || [];
  const sortedActions = [...actions].sort((a, b) => a.index - b.index);

  return (
    <MainLayout
      isGoBack
      title={t(i18nKeys.scene.automation.edit)}
      right={
        <TouchableOpacity
          onPress={() => {
            updateAutomationMutation.mutate(form.getValues());
          }}
        >
          <Text style={{ color: colors.greenOfficial }}>
            {t(i18nKeys.common.save)}
          </Text>
        </TouchableOpacity>
      }
    >
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        className="h-full flex-1"
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
                          navigation.navigate('UpdateEditDeviceConditionFunc', {
                            condition,
                            currentIndex: getIndex(),
                          });
                        } else {
                          navigation.navigate('UpdateAddCondition', {
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
                          navigation.navigate('UpdateAutomationAction', {
                            type: 'DELAY',
                            actionValues: form.watch('actions'),
                            mode: 'EDIT',
                            currentIndex: getIndex(),
                          });
                        } else if (action.ep) {
                          navigation.navigate('UpdateEditDeviceActionFunc', {
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

        <TouchableOpacity
          className="mb-3 mt-auto w-11/12 items-center self-center rounded-full bg-red-500 p-3"
          onPress={() => setIsConfirmDialogVisible(true)}
        >
          <Text className="font-medium text-white">
            {t(i18nKeys.scene.deleteMoment)}
          </Text>
        </TouchableOpacity>

        <SelectAutomationActionModal
          isVisible={isActionModalVisible}
          setIsVisible={setIsActionModalVisible}
          actionValues={sortedActions}
          mode="EDIT"
        />

        <SelectConditionTypeModal
          isVisible={conditionTypeModal}
          setIsVisible={setConditionTypeModal}
        />

        <AutomationConditionModal
          isVisible={isAutoCondModal}
          setIsVisible={setIsAutoCondModal}
          mode="EDIT"
        />

        <ConfirmDialog
          isVisible={isConfirmDialogVisible}
          setIsVisible={setIsConfirmDialogVisible}
          warningText={t(i18nKeys.scene.confirmDelete)}
          onConfirm={() => {
            deleteAutomationMutation.mutate();
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

  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  rowFront: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginVertical: 5,
    marginHorizontal: 2,
    borderRadius: 10,
    backgroundColor: colors.white,
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

export default UpdateAutomationSceneScreen;
