import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { storage } from '@src/common/mmkv.storage';
import CountdownTimer from '@src/components/countdown-text';
import MainLayout from '@src/components/main.layout';
import { CURRENT_HOME_ID_KEY } from '@src/configs/constant/constant.config';
import { i18nKeys } from '@src/configs/i18n';
import { HomeRouteStackParamList } from '@src/configs/routes/home.route';
import socketService from '@src/features/socket/socket.service';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import AddDeviceSuccessModal from './components/add-device-success-modal';
import AnimatedFindingDevice from './components/animated-finding-device';

const PairingDeviceScreen = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const navigation = useNavigation<NavigationProp<HomeRouteStackParamList>>();
  const route = useRoute<RouteProp<HomeRouteStackParamList, 'PairingDevice'>>();

  const device = route.params.device;
  const [isVisible, setIsVisible] = useState(false);
  const currentHomeId = storage.getNumber(CURRENT_HOME_ID_KEY);
  const [responseData, setResponseData] = useState<any>();

  const isSocketConnected = socketService.socket.connected;

  useEffect(() => {
    let timeOutId: string | number | NodeJS.Timeout | undefined;
    const initializeSocket = () => {
      try {
        if (isSocketConnected) {
          const sendData: any = {
            type: device.type,
            estateId: currentHomeId,
            time: new Date().getTime(),
          };
          device.macAddress && (sendData.mac = device.macAddress);
          device.parentId && (sendData.parentId = device.parentId);
          device.areaId && (sendData.areaId = device.areaId);

          console.log('sendData', sendData);
          socketService.send({
            data: sendData,
          });
        }

        socketService.received({
          callback(recvData) {
            queryClient.refetchQueries({
              queryKey: ['devices/get-all', { homeId: currentHomeId }],
            });
            setResponseData(recvData);
            setIsVisible(true);
            socketService.offConnect({});

            return () => {
              clearTimeout(
                setTimeout(() => {
                  navigation.navigate('MainHome');
                  socketService.offConnect({
                    callback: () => {},
                  });
                  Toast.show({
                    type: 'error',
                    text1: t(i18nKeys.device.addFail),
                    text2: t(i18nKeys.errors.common.tryAgain),
                  });
                }, 240000),
              );
            };
          },
        });

        timeOutId = setTimeout(() => {
          navigation.navigate('MainHome');
          socketService.offConnect({
            callback: () => {},
          });
          Toast.show({
            type: 'error',
            text1: t(i18nKeys.device.addFail),
            text2: t(i18nKeys.errors.common.tryAgain),
          });
        }, 240000);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: t(i18nKeys.common.error),
          text2: t(i18nKeys.errors.common.tryAgain),
        });
      }
    };

    initializeSocket();

    return () => clearTimeout(timeOutId);
  }, [
    currentHomeId,
    device.macAddress,
    device.parentId,
    device.type,
    device.areaId,
    isSocketConnected,
    navigation,
    queryClient,
    t,
  ]);

  return (
    <MainLayout isGoBack title={t(i18nKeys.device.add)}>
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <AnimatedFindingDevice />

        <Text className="text-base font-medium text-[#696969]">
          {t(i18nKeys.device.adding)}...
        </Text>

        <CountdownTimer
          milliseconds={240000}
          textStyle={{
            fontSize: 36,
            fontWeight: '500',
            color: '#696969',
          }}
        />

        <AddDeviceSuccessModal
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          data={responseData}
        />
      </ImageBackground>
    </MainLayout>
  );
};

export default PairingDeviceScreen;
