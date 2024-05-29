import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import FindingDeviceSpin from '@src/assets/home-iot/common/finding-device-spin.svg';
import GradientButton from '@src/components/gradient-button';
import MainLayout from '@src/components/main.layout';
import { i18nKeys } from '@src/configs/i18n';
import { HomeRouteStackParamList } from '@src/configs/routes/home.route';
import { isMacAddressValid, stringToMacAddress } from '@src/utils/common.util';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Text } from 'react-native-paper';
import Animated, { // Easing,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const duration = 1500;
const easing = Easing.linear;

const AddSubDevice = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NavigationProp<HomeRouteStackParamList, 'AddSubDevice'>>();
  const route = useRoute<RouteProp<HomeRouteStackParamList, 'AddSubDevice'>>();
  const [macAddress, setMacAddress] = useState<string>();
  const sv = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  useEffect(() => {
    if (!route.params.isGateway) {
      sv.value = withRepeat(withTiming(1, { duration, easing }), -2, false);
    }
  }, [sv, route.params.isGateway]);

  return (
    <MainLayout title={t(i18nKeys.device.add)} isGoBack>
      <ImageBackground
        source={require('@src/assets/home-iot/background.jpeg')}
        style={styles.container}
      >
        <Animated.View className="mb-3 mt-16" style={[animatedStyle]}>
          <FindingDeviceSpin width={150} height={150} />
        </Animated.View>

        {route.params.isGateway ? (
          <GradientButton
            additionalStyles={{ marginTop: 10 }}
            title={t(i18nKeys.device.scanQR)}
            onPress={() => {
              navigation.navigate('DeviceQRScan', {
                deviceType: route.params.deviceType,
                areaId: route.params.areaId,
              });
            }}
          />
        ) : (
          <GradientButton
            additionalStyles={{ marginTop: 10 }}
            title={t(i18nKeys.device.scanFor)}
            onPress={() => {
              navigation.navigate('PairingDevice', {
                device: {
                  type: route.params.deviceType as string,
                  parentId: route.params.parentId,
                  areaId: route.params.areaId,
                },
              });
            }}
          />
        )}

        <View className="my-2 w-2/3 flex-row">
          <View className="flex-1 flex-row items-center self-center">
            <View className="h-[1px] flex-1 bg-[#D9D9D9]" />
            <View className="h-[8px] w-[8px] rounded-[8px] bg-[#D9D9D9]" />
          </View>
          <Text className="self-center px-2 text-[16px] text-[#696969]">
            {t(i18nKeys.common.or)}
          </Text>
          <View className="flex-1 flex-row items-center self-center">
            <View className="h-[8px] w-[8px] rounded-[8px] bg-[#D9D9D9]" />
            <View className="h-[1px] flex-1 bg-[#D9D9D9]" />
          </View>
        </View>

        <Text variant="titleMedium" className="text-[#696969]">
          MAC: {macAddress && stringToMacAddress(macAddress)}
        </Text>

        <View className="mt-4 w-full flex-row px-4">
          <TextInput
            className="h-[44px] w-[75%] self-center rounded-l-2xl border-[1px] border-r-0 border-[#AAAAAA] p-3"
            placeholderTextColor={'#AAAAAA'}
            value={macAddress}
            onChangeText={(text) => {
              setMacAddress(text);
            }}
            placeholder={t(i18nKeys.device.enterMac)}
            maxLength={23}
          />

          <TouchableOpacity
            className="flex-1"
            disabled={
              macAddress && isMacAddressValid(macAddress) ? false : true
            }
            onPress={() => {
              macAddress &&
                isMacAddressValid(macAddress) &&
                navigation.navigate('PairingDevice', {
                  device: {
                    type: route.params.deviceType as string,
                    macAddress: stringToMacAddress(macAddress),
                    parentId: route.params.parentId,
                    areaId: route.params.areaId,
                  },
                });
            }}
          >
            <LinearGradient
              colors={['#9CC76F', '#c5da8b']}
              className="h-[44px] w-full items-center justify-center rounded-r-2xl"
            >
              <Text className="mx-2 text-[16px] text-white">
                {t(i18nKeys.common.add)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
});

export default AddSubDevice;
