import ArrowRight from '@src/assets/arrow-right.svg';
import { storage } from '@src/common/mmkv.storage';
import { DeviceIcons } from '@src/components/devices-icon';
import { CURRENT_HOME_ID_KEY } from '@src/configs/constant/constant.config';
import { IDevice } from '@src/features/devices/device.model';
import deviceService from '@src/features/devices/device.service';
import { useDeviceName } from '@src/hooks/use-device-name.hook';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { View } from 'react-native';
import { FlatList, Pressable, Text } from 'react-native';

type TActionDeviceListProps = {
  onPressDeviceItem: (device: IDevice) => void;
  isForCondition?: boolean;
};

const ActionDeviceList = ({
  onPressDeviceItem,
  isForCondition,
}: TActionDeviceListProps) => {
  const queryClient = useQueryClient();

  const currentHomeId = storage.getNumber(CURRENT_HOME_ID_KEY);

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

  const switchTypes = useMemo(
    () =>
      deviceCategoriesQuery.data?.find(
        (switchCateg) => switchCateg.name === 'switch',
      ),
    [deviceCategoriesQuery.data],
  );

  const devices = queryClient.getQueryData<IDevice[]>([
    'devices/get-all',
    { homeId: currentHomeId },
  ]);

  const actionDevices = useMemo(
    () =>
      !isForCondition
        ? devices?.filter((device) =>
            switchTypes?.deviceProfiles?.some(
              (profile) => profile.type === device.type,
            ),
          )
        : devices?.filter(
            (device) =>
              !gatewayTypes?.deviceProfiles?.some(
                (profile) => profile.type === device.type,
              ),
          ),
    [
      devices,
      gatewayTypes?.deviceProfiles,
      isForCondition,
      switchTypes?.deviceProfiles,
    ],
  );

  const { DeviceNames } = useDeviceName();

  return (
    <FlatList
      data={actionDevices}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          className="mx-3 my-2"
          onPress={() => {
            onPressDeviceItem(item);
          }}
        >
          <View
            className="flex-row items-center rounded-lg border-2 border-white bg-[#f7f7f7] p-[10]"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
              zIndex: 50,
            }}
          >
            {DeviceIcons.get(item.type)?.(38, 38)}

            <View className="ml-3 flex-1 flex-row items-center justify-between">
              <View>
                <Text className="text-[#44A093]" numberOfLines={1}>
                  {DeviceNames[item.type as keyof typeof DeviceNames]}
                </Text>
                <Text className="text-[#696969]" numberOfLines={1}>
                  {item.modelName}
                </Text>
              </View>

              <ArrowRight />
            </View>
          </View>
        </Pressable>
      )}
    />
  );
};

export default ActionDeviceList;
