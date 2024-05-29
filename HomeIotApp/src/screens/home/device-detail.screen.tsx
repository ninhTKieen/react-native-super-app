import Slider from '@react-native-community/slider';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { storage } from '@src/common/mmkv.storage';
import ConfirmDialog from '@src/components/confirm-dialog';
import { DeviceSubIcon } from '@src/components/devices-icon';
import IconGeneral from '@src/components/icon-general';
import MainLayout from '@src/components/main.layout';
import { CURRENT_HOME_ROLE_KEY } from '@src/configs/constant/constant.config';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { HomeRouteStackParamList } from '@src/configs/routes/home.route';
import { useAppStore } from '@src/features/app/app.store';
import { EDeviceType } from '@src/features/devices/device.model';
import deviceService from '@src/features/devices/device.service';
import { EHomeRole } from '@src/features/home/home.model';
import homeService from '@src/features/home/home.service';
import socketService from '@src/features/socket/socket.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Menu, Surface, Text } from 'react-native-paper';
import { RadialSlider } from 'react-native-radial-slider';
import Toast from 'react-native-toast-message';

import DeviceInformation from './components/device-information';
import SelectRoomModal from './components/select-room-modal';

const { width } = Dimensions.get('screen');

const DeviceDetailScreen = () => {
  const queryClient = useQueryClient();

  const navigation =
    useNavigation<NavigationProp<HomeRouteStackParamList, 'DeviceDetail'>>();
  const route = useRoute<RouteProp<HomeRouteStackParamList, 'DeviceDetail'>>();

  const currentHomeRole = storage.getString(CURRENT_HOME_ROLE_KEY);

  const { setLoading } = useAppStore();

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [isRoomModalVisible, setIsRoomModalVisible] = useState(false);
  const [metaData, setMetaData] = useState<any>();
  const [speed, setSpeed] = useState(0);

  const estateId = route.params.device.estateId;

  const deviceDetailQuery = useQuery({
    queryKey: ['devices/get', { deviceId: route.params.device.id }],
    queryFn: () => {
      setLoading(true);
      const getDeviceDetailPromise = async () => {
        try {
          const device = await deviceService.get(route.params.device.id);
          setMetaData(device.metaData);
          return device;
        } catch (error) {
          throw Promise.reject();
        } finally {
          setLoading(false);
        }
      };

      return getDeviceDetailPromise();
    },
    enabled: !!route.params.device.id,
  });

  const deleteDeviceMutation = useMutation({
    mutationFn: () => {
      setIsConfirmDialogVisible(false);
      setLoading(true);
      return deviceService.delete(route.params.device.id);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['devices/get-all', { homeId: route.params.device.estateId }],
      });
      navigation.goBack();
      Toast.show({
        type: 'success',
        text1: t(i18nKeys.common.success),
        text2: t(i18nKeys.device.deleteSuccess),
      });
      setLoading(false);
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: t(i18nKeys.common.error),
        text2: t(i18nKeys.device.deleteFail),
      });
      setLoading(false);
    },
  });

  const getRoomsQuery = useQuery({
    queryKey: ['home/get-all-rooms', { homeId: estateId }],
    queryFn: () => homeService.getRoomFromHome(estateId),
  });

  const { t } = useTranslation();

  useEffect(() => {
    socketService.received({
      channel: `/devices/${route.params.device.id}/data`,
      callback: (data) => {
        console.log('Received data: ', JSON.stringify(data));
        setMetaData(data);
      },
    });
  }, [route.params.device.id]);

  // check if swipe back or go back to remove listener
  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      socketService.socket.removeAllListeners(
        `/devices/${route.params.device.id}/data`,
      );
    });
  }, [navigation, route.params.device.id]);

  return (
    <MainLayout
      title={route.params.deviceName}
      isGoBack
      right={
        <Menu
          visible={isMenuVisible}
          onDismiss={() => setIsMenuVisible(false)}
          contentStyle={{
            minWidth: width * 0.5,
            backgroundColor: colors.white,
            borderRadius: 10,
          }}
          anchor={
            <IconGeneral
              type="Feather"
              name="more-horizontal"
              onPress={() => {
                setIsMenuVisible(true);
              }}
              size={20}
              style={{ paddingHorizontal: 5 }}
            />
          }
        >
          <Menu.Item
            contentStyle={{ backgroundColor: colors.white }}
            leadingIcon={() => (
              <IconGeneral
                type="MaterialCommunityIcons"
                name="delete"
                size={25}
                color="red"
              />
            )}
            onPress={() => {
              setIsMenuVisible(false);
              setIsConfirmDialogVisible(true);
            }}
            disabled={currentHomeRole === EHomeRole.Member}
            title={t(i18nKeys.device.delete)}
            titleStyle={{ color: 'red' }}
            style={{
              opacity: currentHomeRole === EHomeRole.Member ? 0.5 : 1,
            }}
          />
        </Menu>
      }
    >
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        style={styles.container}
      >
        <TouchableOpacity
          style={[styles.directionRow]}
          className="mt-3 bg-transparent px-[10px]"
          disabled={currentHomeRole === EHomeRole.Member}
        >
          <Text style={{ flex: 1.5 }}>{t(i18nKeys.device.name)}</Text>
          <Text variant="titleMedium" style={{ flex: 3.5 }}>
            {route.params.device.modelName
              ? route.params.device.modelName
              : Object.values(EDeviceType).includes(route.params.device.type)
              ? t(i18nKeys.common.noName)
              : deviceDetailQuery.data?.name}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.directionRow]}
          className="mt-3 bg-transparent px-[10px]"
          onPress={() => setIsRoomModalVisible(true)}
          disabled={currentHomeRole === EHomeRole.Member}
        >
          <Text style={{ flex: 1.5 }}>
            {t(i18nKeys.home.settings.rooms.name)}
          </Text>
          <Text variant="titleMedium" style={{ flex: 3.5 }}>
            {deviceDetailQuery.data?.areaId ? (
              getRoomsQuery.data?.items.find(
                (item) => item.id === deviceDetailQuery.data?.areaId,
              )?.name
            ) : (
              <Text variant="titleMedium" style={{ color: 'red' }}>
                {t(i18nKeys.common.noName)}
              </Text>
            )}
          </Text>
        </TouchableOpacity>

        {deviceDetailQuery.data && (
          <DeviceInformation
            metaData={metaData}
            deviceType={deviceDetailQuery.data?.type}
            deviceId={route.params.device.id}
          />
        )}

        {route.params.device.type === EDeviceType.WIFI_IR_REMOTE && (
          <Surface
            style={{
              height: '60%',
              margin: 10,
              padding: 15,
              borderRadius: 10,
              backgroundColor: 'white',
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <RadialSlider
                value={speed}
                min={16}
                max={32}
                onChange={setSpeed}
                unit="˚C"
                subTitle=""
                linearGradient={[
                  { offset: '0%', color: colors.greenOfficial },
                  { offset: '100%', color: colors.primary },
                ]}
                stroke={colors.primary}
                thumbColor={colors.primary}
                unitStyle={{ color: colors.primary, fontWeight: 'bold' }}
                valueStyle={{ color: colors.primary, fontWeight: 'bold' }}
              />
            </View>

            <View
              style={{
                backgroundColor: colors.grey1,
                flexDirection: 'row',
                borderRadius: 10,
                justifyContent: 'space-between',
                width: '80%',
                alignSelf: 'center',
              }}
            >
              <TouchableOpacity style={{ flex: 1 }}>
                <DeviceSubIcon.ac_cool
                  width={40}
                  height={40}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1 }}>
                <DeviceSubIcon.ac_wind
                  width={40}
                  height={40}
                  color={colors.primary}
                  style={{ flex: 1 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ flex: 1 }}>
                <DeviceSubIcon.ac_dry
                  width={40}
                  height={40}
                  color={colors.primary}
                  style={{ flex: 1 }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                marginTop: 60,
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'center',
              }}
            >
              <DeviceSubIcon.fan
                width={30}
                height={30}
                color={colors.primary}
              />
              <View style={{ width: '80%', marginLeft: 10 }}>
                <Slider
                  style={{
                    width: '100%',
                  }}
                  minimumValue={0}
                  maximumValue={4}
                  minimumTrackTintColor={colors.primary}
                  maximumTrackTintColor="#E5E5E5"
                  step={1}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 12,
                  }}
                >
                  {[0, 1, 2, 3, 4].map((item) => {
                    return (
                      <View
                        key={item.toString()}
                        style={{
                          height: 6,
                          borderColor: colors.grey2,
                          borderWidth: 1,
                        }}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
          </Surface>
        )}
      </ImageBackground>

      <ConfirmDialog
        onConfirm={() => {
          deleteDeviceMutation.mutate();
        }}
        onCancel={() => setIsConfirmDialogVisible(false)}
        isVisible={isConfirmDialogVisible}
        setIsVisible={setIsConfirmDialogVisible}
      />

      <SelectRoomModal
        isVisible={isRoomModalVisible}
        setIsVisible={setIsRoomModalVisible}
        homeId={estateId}
        areaId={deviceDetailQuery.data?.areaId}
        deviceId={route.params.device.id}
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },

  directionRow: {
    flexDirection: 'row',
  },
});

export default DeviceDetailScreen;
