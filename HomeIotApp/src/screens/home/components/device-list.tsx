import { useDeviceOrientation } from '@react-native-community/hooks';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import AddRoundIcon from '@src/assets/home-iot/common/add-round.svg';
import { storage } from '@src/common/mmkv.storage';
import { DeviceIcons } from '@src/components/devices-icon';
import { CURRENT_HOME_ID_KEY } from '@src/configs/constant/constant.config';
import { colors } from '@src/configs/constant/global-styles';
import { i18nKeys } from '@src/configs/i18n';
import { HomeRouteStackParamList } from '@src/configs/routes/home.route';
import { IDevice } from '@src/features/devices/device.model';
import { useDeviceName } from '@src/hooks/use-device-name.hook';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RefreshControl } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

type TDeviceListProps = {
  deviceList?: IDevice[];
  areaId?: number;
};

const DeviceList = (props: TDeviceListProps) => {
  const { width, height } = useWindowDimensions();

  const orientation = useDeviceOrientation();

  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NavigationProp<HomeRouteStackParamList, 'MainHome'>>();
  const currentHomeId = storage.getNumber(CURRENT_HOME_ID_KEY);

  const isFetchingDevices = useIsFetching({
    queryKey: ['devices/get-all', { homeId: currentHomeId }],
  });

  const filterDevices = useMemo(
    () =>
      props.areaId
        ? props.deviceList?.filter((device) => device.areaId === props.areaId)
        : props.deviceList,
    [props.deviceList, props.areaId],
  );

  const { DeviceNames } = useDeviceName();

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <FlatList
        data={filterDevices || []}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={orientation === 'portrait' ? 2 : 4}
        key={orientation === 'portrait' ? 'V' : 'H'}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetchingDevices > 0}
            onRefresh={() => {
              queryClient.refetchQueries({
                queryKey: ['devices/get-all', { homeId: currentHomeId }],
              });
            }}
          />
        }
        renderItem={({ item }) => {
          const deviceIcon = DeviceIcons.get(item.type);
          const DvIconComponent = deviceIcon ? deviceIcon(38, 38) : <></>;

          return (
            <Pressable
              onPress={() => {
                navigation.navigate('DeviceDetail', {
                  deviceName:
                    DeviceNames[item.type as keyof typeof DeviceNames],
                  device: item,
                });
              }}
            >
              <View
                className="m-[10px] justify-between rounded-2xl border-2 border-solid border-[#F7F7F7] bg-white p-4"
                style={[
                  {
                    width:
                      orientation === 'portrait'
                        ? width / 2 - 20
                        : width / 4 - 20,
                    height: orientation === 'portrait' ? 120 : 150,
                  },
                ]}
              >
                <View
                  style={{
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {DvIconComponent}
                  <Text
                    numberOfLines={1}
                    style={{ color: colors.greenOfficial }}
                    className={`w-1/2 text-right font-semibold`}
                  >
                    {item.modelName}
                  </Text>
                </View>
                <Text className="text-[#696969]" numberOfLines={2}>
                  {DeviceNames[item.type as keyof typeof DeviceNames] || ''}
                </Text>
              </View>
            </Pressable>
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
            <FastImage
              source={require('@src/assets/home-iot/empty-device.png')}
              className="h-[200px] w-1/2"
            />
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#AAAAAA' }}>
              {t(i18nKeys.device.empty)}
            </Text>

            <TouchableOpacity
              className="w-1/2"
              onPress={() => {
                navigation.navigate('DeviceCategories', {
                  areaId: props.areaId,
                });
              }}
            >
              <LinearGradient
                colors={['#9CC76F', '#c5da8b']}
                className="mx-auto mt-4 flex w-full flex-row items-center justify-center rounded-2xl p-[12px]"
              >
                <AddRoundIcon />
                <Text className="mx-2 text-[16px] text-white">
                  {t(i18nKeys.device.add)}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default DeviceList;
