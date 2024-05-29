import { useDeviceOrientation } from '@react-native-community/hooks';
import { storage } from '@src/common/mmkv.storage';
import { CURRENT_HOME_ID_KEY } from '@src/configs/constant/constant.config';
import { IGetRoomFromHome } from '@src/features/home/home.model';
import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import {
  FlatList,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { RefreshControl } from 'react-native-gesture-handler';

type TDeviceListProps = {
  areaList?: IGetRoomFromHome[];
  areaId?: number;
};

const AreaList = (props: TDeviceListProps) => {
  const { width, height } = useWindowDimensions();

  const orientation = useDeviceOrientation();

  const queryClient = useQueryClient();
  const currentHomeId = storage.getNumber(CURRENT_HOME_ID_KEY);

  const isFetchingDevices = useIsFetching({
    queryKey: ['home/get-all-rooms', { homeId: currentHomeId }],
  });

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <FlatList
        data={props.areaList || []}
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
          return (
            <Pressable onPress={() => {}}>
              <View
                style={[
                  {
                    width:
                      orientation === 'portrait'
                        ? width / 2 - 20
                        : width / 4 - 26,
                    height:
                      orientation === 'portrait'
                        ? height * 0.22
                        : height * 0.24,
                  },
                ]}
                className="m-[10px] rounded-2xl border-2 border-solid border-[#F7F7F7] bg-[#EEEEEE] p-2"
              >
                <View className="h-full justify-between overflow-hidden rounded-2xl bg-white">
                  <FastImage
                    source={require('@src/assets/home-iot/living-room.jpeg')}
                    className="h-4/5 w-full object-contain"
                  />

                  <View className="mt-2 h-1/5 w-full">
                    <Text className="text-center text-[14px] font-medium text-[#515151]">
                      {item.name}
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default AreaList;
