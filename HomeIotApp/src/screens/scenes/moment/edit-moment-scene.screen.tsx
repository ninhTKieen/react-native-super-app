import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import AddRoundIcon from '@src/assets/home-iot/common/add-round-thin.svg';
import ClockOutlineIcon from '@src/assets/home-iot/common/clock-outline.svg';
import ConfirmDialog from '@src/components/confirm-dialog';
import { DeviceIcons } from '@src/components/devices-icon';
import MainLayout from '@src/components/main.layout';
import globalStyles, { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { UpdateMomentStackParamList } from '@src/configs/routes/scene.route';
import { useAppStore } from '@src/features/app/app.store';
import { IDevice } from '@src/features/devices/device.model';
import { IUpdateMomentScene } from '@src/features/scenes/scene.model';
import sceneService from '@src/features/scenes/scene.service';
import { useDeviceName } from '@src/hooks/use-device-name.hook';
import { DeviceValueState } from '@src/utils/device.util';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ImageBackground } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Swipeable } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import SelectMomentActionModal from '../components/select-moment-action-modal';

const EditMomentSceneScreen = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const form = useFormContext<IUpdateMomentScene>();
  const { setLoading } = useAppStore();

  const navigation =
    useNavigation<NavigationProp<UpdateMomentStackParamList, 'UpdateMoment'>>();
  const route =
    useRoute<RouteProp<UpdateMomentStackParamList, 'UpdateMoment'>>();

  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);

  const { DeviceNames } = useDeviceName();

  useQuery({
    queryKey: ['scenes/moment/get-by-id', { id: route.params.sceneId }],
    queryFn: () => {
      const getMomentById = async () => {
        setLoading(true);
        try {
          const response = await sceneService.getMomentSceneById({
            estateId: route.params.estateId,
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
    enabled: !!route.params.sceneId && _.isEmpty(form.getValues()),
  });

  const deleteMomentMutation = useMutation({
    mutationFn: () =>
      sceneService.deleteMomentScene(
        route.params.estateId,
        route.params.sceneId,
      ),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [
          'scenes/moment/get-all',
          { estateId: route.params.estateId },
        ],
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

  const updateMomentMutation = useMutation({
    mutationFn: (data: IUpdateMomentScene) =>
      sceneService.updateMomentScene(
        route.params.estateId,
        route.params.sceneId,
        data,
      ),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [
          'scenes/moment/get-all',
          { estateId: route.params.estateId },
        ],
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

  const devices = queryClient.getQueryData<IDevice[]>([
    'devices/get-all',
    { homeId: route.params.estateId },
  ]);

  const renderHiddenItem = (data: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          const actions = form.watch('actions');

          form.setValue(
            'actions',
            actions?.filter((action) => action.id !== data.item.id),
          );
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
      </TouchableOpacity>
    );
  };

  const actions = form.watch('actions') || [];
  const sortedActions = [...actions].sort((a, b) => a.index - b.index);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (_e) => {
      form.reset();
    });

    return unsubscribe;
  }, [form, navigation]);

  return (
    <MainLayout
      isGoBack
      title={t(i18nKeys.scene.editMoment)}
      right={
        <TouchableOpacity
          onPress={() => {
            updateMomentMutation.mutate(form.getValues());
          }}
        >
          <Text style={{ color: colors.primary }}>
            {t(i18nKeys.common.save)}
          </Text>
        </TouchableOpacity>
      }
    >
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        style={{ flex: 1, height: '100%' }}
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
              data={sortedActions || []}
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
                      renderHiddenItem(getIndex() as number)
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
                        if (action.ep) {
                          navigation.navigate(
                            'UpdateMomentEditDeviceFunction',
                            {
                              action,
                              currentIndex: getIndex(),
                            },
                          );
                        } else {
                          navigation.navigate('UpdateMomentAction', {
                            type: action.delay ? 'DELAY' : 'SELECT_AUTO',
                            actionValues: sortedActions,
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

        <ConfirmDialog
          isVisible={isConfirmDialogVisible}
          setIsVisible={setIsConfirmDialogVisible}
          warningText={t(i18nKeys.scene.confirmDelete)}
          onConfirm={() => {
            deleteMomentMutation.mutate();
          }}
        />

        <SelectMomentActionModal
          isVisible={isActionModalVisible}
          setIsVisible={setIsActionModalVisible}
          actionValues={form.watch('actions')}
          mode="EDIT"
        />
      </ImageBackground>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
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

export default EditMomentSceneScreen;
