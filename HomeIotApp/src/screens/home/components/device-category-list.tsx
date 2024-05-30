import { useDeviceOrientation } from '@react-native-community/hooks';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { storage } from '@src/common/mmkv.storage';
import { DeviceImages } from '@src/components/devices-icon';
import { CURRENT_HOME_ID_KEY } from '@src/configs/constant/constant.config';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { HomeRouteStackParamList } from '@src/configs/routes/home.route';
import {
  IDevice,
  IDeviceProfileInCateg,
} from '@src/features/devices/device.model';
import deviceService from '@src/features/devices/device.service';
import { useDeviceName } from '@src/hooks/use-device-name.hook';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Modal from 'react-native-modal';

import NoGatewayModal from './no-gateway-modal';

type TDeviceCategoryListProps = {
  deviceTypes: IDeviceProfileInCateg[];
};

const DeviceCategoryList = ({ deviceTypes }: TDeviceCategoryListProps) => {
  const queryClient = useQueryClient();
  const orientation = useDeviceOrientation();

  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<HomeRouteStackParamList>>();
  const route =
    useRoute<RouteProp<HomeRouteStackParamList, 'DeviceCategories'>>();

  const currentHomeId = storage.getNumber(CURRENT_HOME_ID_KEY);
  const deviceList = queryClient.getQueryData<IDevice[]>([
    'devices/get-all',
    { homeId: currentHomeId },
  ]);

  const deviceCategoriesQuery = useQuery({
    queryKey: ['device-categories/get-all'],
    queryFn: () => deviceService.getAllDeviceCategories(),
  });
  const gatewayTypes = useMemo(
    () =>
      deviceCategoriesQuery.data?.find(
        (gatewayCateg) => gatewayCateg.name === 'gateway',
      ),
    [deviceCategoriesQuery.data],
  );

  const [isVisible, setIsVisible] = useState(false);
  const [noGwModalVisible, setNoGwModalVisible] = useState(false);
  const [subDeviceType, setSubDeviceType] = useState('');

  const { width, height } = useWindowDimensions();

  const gatewayDevices = useMemo(
    () =>
      deviceList?.filter((device) => {
        return gatewayTypes?.deviceProfiles?.some(
          (profile) => profile.type === device.type,
        );
      }),
    [deviceList, gatewayTypes?.deviceProfiles],
  );

  const { DeviceNames } = useDeviceName();

  return (
    <View style={styles.container}>
      <FlatList
        data={deviceTypes}
        keyExtractor={(_item, index) => index.toString()}
        key={orientation === 'portrait' ? 'V' : 'H'}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                if (
                  gatewayTypes?.deviceProfiles.some(
                    (profile) => profile.type === item.type,
                  )
                ) {
                  navigation.navigate('AddSubDevice', {
                    isGateway: true,
                    deviceName: item.type,
                    deviceType: item.type,
                    areaId: route.params.areaId,
                  });
                } else {
                  if (gatewayDevices && gatewayDevices?.length > 0) {
                    setIsVisible(true);
                    setSubDeviceType(item.type);
                  } else {
                    setNoGwModalVisible(true);
                  }
                }
              }}
            >
              <View
                style={{
                  width:
                    orientation === 'portrait'
                      ? width / 3 - 20
                      : width / 4 - 20,
                  height:
                    orientation === 'portrait' ? height * 0.16 : height * 0.18,
                }}
                className="m-[10px] items-center rounded-2xl bg-white p-[10px]"
              >
                <View className="mb-2 h-[85px] w-[85px] items-center justify-center rounded-2xl border-2 border-[#F7F7F7] p-2">
                  {DeviceImages?.get(item.type)?.()}
                </View>
                <Text
                  numberOfLines={2}
                  className="text-[14px] font-normal text-[#696969]"
                >
                  {DeviceNames[item.type as keyof typeof DeviceNames]}
                </Text>
              </View>
            </Pressable>
          );
        }}
        numColumns={orientation === 'portrait' ? 3 : 4}
      />

      <NoGatewayModal
        isVisible={noGwModalVisible}
        setIsVisible={setNoGwModalVisible}
      />

      <Modal
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        onDismiss={() => setIsVisible(false)}
        backdropTransitionOutTiming={100}
        animationOutTiming={100}
        style={styles.modal}
      >
        <View className="rounded-xl bg-white">
          <View className="mb-4 p-2">
            <Text className="text-center text-base font-medium text-[#696969]">
              {t(i18nKeys.device.selectHub)}
            </Text>
          </View>

          <FlatList
            contentContainerStyle={{
              maxHeight: 100,
            }}
            data={gatewayDevices}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(false);
                    navigation.navigate('AddSubDevice', {
                      parentId: item.id,
                      deviceType: subDeviceType,
                      areaId: route.params.areaId,
                    });
                  }}
                  // style={[styles.itemRowModal, { marginVertical: 10 }]}
                  className="my-4 items-center bg-transparent"
                >
                  <Text>{item.modelName || item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />

          <View className="h-2 w-full bg-gray-200" />

          <TouchableOpacity
            className="mb-2 h-fit w-full p-4"
            onPress={() => setIsVisible(false)}
          >
            <Text className="text-center text-base text-red-600">
              {t(i18nKeys.common.cancel)}
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  item: {
    height: 100,
    borderRadius: 20,
    margin: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: colors.white,
  },

  modal: {
    height: '50%',
    margin: 0,
    justifyContent: 'flex-end',
  },

  itemRowModal: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeviceCategoryList;
